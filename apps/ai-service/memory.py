import sqlite3
import os
import json
import time
import re
import math
from typing import List, Dict, Any, Optional

DB_PATH = os.path.join(os.path.dirname(__file__), "nexus_memory.db")

STOP_WORDS = {
    "the", "a", "and", "or", "in", "of", "to", "is", "that", "it", "for", "on", 
    "with", "as", "by", "an", "at", "by", "from", "how", "all", "any", "both", 
    "each", "few", "more", "most", "other", "some", "such", "than", "too", "very",
    "s", "t", "can", "will", "just", "should", "now"
}

def tokenize(text: str) -> List[str]:
    text = text.lower().strip()
    # Replace non-alphanumeric characters with spaces
    text = re.sub(r'[^a-z0-9\s]', ' ', text)
    words = text.split()
    return [w for w in words if w not in STOP_WORDS and len(w) > 1]

class PersistentMemoryStore:
    def __init__(self):
        self.conn = sqlite3.connect(DB_PATH, check_same_thread=False)
        self.create_tables()

    def create_tables(self):
        cursor = self.conn.cursor()
        
        # Memories table (Knowledge base, Agent memory, Long-term memory)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS memories (
                id TEXT PRIMARY KEY,
                user_id TEXT NOT NULL,
                memory_type TEXT NOT NULL, -- 'knowledge', 'agent', 'long-term', 'workflow'
                content TEXT NOT NULL,
                metadata_json TEXT DEFAULT '{}',
                created_at REAL NOT NULL
            )
        """)

        # User Preferences table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS preferences (
                user_id TEXT NOT NULL,
                pref_key TEXT NOT NULL,
                pref_value TEXT NOT NULL,
                updated_at REAL NOT NULL,
                PRIMARY KEY (user_id, pref_key)
            )
        """)

        # Conversation History table (Short-term memory)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS conversations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                session_id TEXT NOT NULL,
                user_id TEXT NOT NULL,
                role TEXT NOT NULL, -- 'user', 'assistant', 'system'
                content TEXT NOT NULL,
                created_at REAL NOT NULL
            )
        """)

        self.conn.commit()

    # --- Store & Query Preferences ---
    def set_preference(self, user_id: str, key: str, value: str):
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO preferences (user_id, pref_key, pref_value, updated_at)
            VALUES (?, ?, ?, ?)
            ON CONFLICT(user_id, pref_key) DO UPDATE SET
                pref_value=excluded.pref_value,
                updated_at=excluded.updated_at
        """, (user_id, key, value, time.time()))
        self.conn.commit()

    def get_preferences(self, user_id: str) -> Dict[str, str]:
        cursor = self.conn.cursor()
        cursor.execute("SELECT pref_key, pref_value FROM preferences WHERE user_id = ?", (user_id,))
        rows = cursor.fetchall()
        return {r[0]: r[1] for r in rows}

    # --- Store & Retrieve Memories ---
    def store_memory(self, memory_id: str, user_id: str, memory_type: str, content: str, metadata: dict = None):
        cursor = self.conn.cursor()
        meta_str = json.dumps(metadata or {})
        cursor.execute("""
            INSERT INTO memories (id, user_id, memory_type, content, metadata_json, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            ON CONFLICT(id) DO UPDATE SET
                content=excluded.content,
                metadata_json=excluded.metadata_json,
                created_at=excluded.created_at
        """, (memory_id, user_id, memory_type, content, meta_str, time.time()))
        self.conn.commit()

    def get_memories_by_type(self, user_id: str, memory_type: str) -> List[Dict[str, Any]]:
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT id, content, metadata_json, created_at 
            FROM memories 
            WHERE user_id = ? AND memory_type = ?
            ORDER BY created_at DESC
        """, (user_id, memory_type))
        rows = cursor.fetchall()
        return [
            {
                "id": r[0],
                "content": r[1],
                "metadata": json.loads(r[2]),
                "created_at": r[3]
            }
            for r in rows
        ]

    # --- Conversation History & Short-term/Long-term compression ---
    def add_conversation_message(self, session_id: str, user_id: str, role: str, content: str):
        cursor = self.conn.cursor()
        cursor.execute("""
            INSERT INTO conversations (session_id, user_id, role, content, created_at)
            VALUES (?, ?, ?, ?, ?)
        """, (session_id, user_id, role, content, time.time()))
        self.conn.commit()

    def get_conversation_history(self, session_id: str, limit: int = 20) -> List[Dict[str, Any]]:
        cursor = self.conn.cursor()
        cursor.execute("""
            SELECT role, content, created_at 
            FROM conversations 
            WHERE session_id = ? 
            ORDER BY id ASC
            LIMIT ?
        """, (session_id, limit))
        rows = cursor.fetchall()
        return [{"role": r[0], "content": r[1], "created_at": r[2]} for r in rows]

    def compress_conversation(self, session_id: str, user_id: str, provider_manager_instance) -> str:
        # Fetch current history
        history = self.get_conversation_history(session_id, limit=50)
        if len(history) < 5:
            return "History too short for compression"

        formatted = "\n".join([f"{m['role']}: {m['content']}" for m in history])
        prompt = (
            f"You are the Nexus Long-term Memory Compressor. Summarize the key facts, user intents, and agent decisions "
            f"from the following conversation history into a highly dense semantic paragraph for context optimization:\n\n"
            f"{formatted}\n\n"
            f"Output only the dense summary paragraph. Do not include any prefix or explanations."
        )

        res = provider_manager_instance.execute_with_retry_and_fallback(
            prompt=prompt,
            json_mode=False
        )

        if res.success and res.content.strip():
            summary = res.content.strip()
            # Store in long term memories
            memory_id = f"summary-{session_id}-{int(time.time())}"
            self.store_memory(
                memory_id=memory_id,
                user_id=user_id,
                memory_type="long-term",
                content=summary,
                metadata={"session_id": session_id, "compressed_at": time.time()}
            )
            
            # Prune old conversation entries
            cursor = self.conn.cursor()
            cursor.execute("DELETE FROM conversations WHERE session_id = ?", (session_id,))
            self.conn.commit()
            
            # Insert the compressed summary as the starting system message
            self.add_conversation_message(session_id, user_id, "system", f"Compressed History Summary: {summary}")
            return summary
        
        return "Compression failed"

    # --- Vector Space VSM / TF-IDF Semantic Search Retrieval ---
    def semantic_retrieve(self, user_id: str, query: str, limit: int = 3, threshold: float = 0.05) -> List[Dict[str, Any]]:
        # Fetch all memories for the user
        cursor = self.conn.cursor()
        cursor.execute("SELECT id, content, memory_type, metadata_json, created_at FROM memories WHERE user_id = ?", (user_id,))
        all_memories = cursor.fetchall()
        
        if not all_memories or not query.strip():
            return []

        # Tokenize query
        query_tokens = tokenize(query)
        if not query_tokens:
            return []

        # 1. Compute Document term counts and vocabulary
        doc_tokens_list = []
        doc_ids = []
        doc_contents = []
        doc_types = []
        doc_metadata = []
        
        for r in all_memories:
            tokens = tokenize(r[1])
            doc_tokens_list.append(tokens)
            doc_ids.append(r[0])
            doc_contents.append(r[1])
            doc_types.append(r[2])
            doc_metadata.append(json.loads(r[3]))

        # Vocab of all terms
        vocab = set(query_tokens)
        for tokens in doc_tokens_list:
            vocab.update(tokens)
        vocab = list(vocab)
        vocab_index = {word: idx for idx, word in enumerate(vocab)}

        # 2. Compute IDF for each term in vocab
        N = len(doc_tokens_list)
        df = {word: 0 for word in vocab}
        for tokens in doc_tokens_list:
            unique_words = set(tokens)
            for w in unique_words:
                if w in df:
                    df[w] += 1
        
        # Include query words in term frequency counts to prevent log(0)
        idf = {}
        for word in vocab:
            count = df.get(word, 0)
            idf[word] = math.log((N + 1) / (count + 1)) + 1.0

        # 3. Vectorize query
        q_vector = [0.0] * len(vocab)
        for term in query_tokens:
            if term in vocab_index:
                q_vector[vocab_index[term]] += 1.0
        # TF-IDF query
        for term in query_tokens:
            if term in vocab_index:
                idx = vocab_index[term]
                q_vector[idx] = q_vector[idx] * idf[term]

        # Query magnitude
        q_mag = math.sqrt(sum(v*v for v in q_vector))

        # 4. Vectorize docs & calculate Cosine Similarity
        results = []
        for d_idx, doc_tokens in enumerate(doc_tokens_list):
            if not doc_tokens:
                continue
            
            d_vector = [0.0] * len(vocab)
            # count frequencies
            freq = {}
            for t in doc_tokens:
                freq[t] = freq.get(t, 0.0) + 1.0
            
            # calculate tf-idf
            for term, tf in freq.items():
                if term in vocab_index:
                    idx = vocab_index[term]
                    d_vector[idx] = tf * idf[term]
            
            # Dot Product
            dot_product = sum(q_vector[idx] * d_vector[idx] for idx in range(len(vocab)))
            d_mag = math.sqrt(sum(v*v for v in d_vector))

            similarity = 0.0
            if q_mag > 0.0 and d_mag > 0.0:
                similarity = dot_product / (q_mag * d_mag)

            if similarity >= threshold:
                results.append({
                    "id": doc_ids[d_idx],
                    "content": doc_contents[d_idx],
                    "memory_type": doc_types[d_idx],
                    "metadata": doc_metadata[d_idx],
                    "similarity": round(similarity, 4)
                })

        # Sort by similarity desc
        results.sort(key=lambda x: x["similarity"], reverse=True)
        return results[:limit]
