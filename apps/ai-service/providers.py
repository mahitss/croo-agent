import os
import json
import time
import urllib.request
import urllib.error
import logging
from abc import ABC, abstractmethod
from typing import Optional, Dict, Any, List

logger = logging.getLogger("nexus-ai.providers")

class LLMResult:
    def __init__(
        self,
        content: str,
        provider: str,
        model: str,
        prompt_tokens: int = 0,
        completion_tokens: int = 0,
        latency_ms: int = 0,
        cost: float = 0.0,
        success: bool = True,
        error_message: Optional[str] = None
    ):
        self.content = content
        self.provider = provider
        self.model = model
        self.prompt_tokens = prompt_tokens
        self.completion_tokens = completion_tokens
        self.latency_ms = latency_ms
        self.cost = cost
        self.success = success
        self.error_message = error_message

    def to_dict(self) -> Dict[str, Any]:
        return {
            "content": self.content,
            "provider": self.provider,
            "model": self.model,
            "prompt_tokens": self.prompt_tokens,
            "completion_tokens": self.completion_tokens,
            "latency_ms": self.latency_ms,
            "cost": self.cost,
            "success": self.success,
            "error_message": self.error_message
        }

class BaseLLMProvider(ABC):
    @abstractmethod
    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        json_mode: bool = False,
        timeout: int = 15,
        model: Optional[str] = None
    ) -> LLMResult:
        pass

class OpenAIProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.model_name = "gpt-4o-mini"
        self.url = "https://api.openai.com/v1/chat/completions"

    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        json_mode: bool = False,
        timeout: int = 15,
        model: Optional[str] = None
    ) -> LLMResult:
        start_time = time.time()
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}"
        }
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        target_model = model or self.model_name
        data: Dict[str, Any] = {
            "model": target_model,
            "messages": messages,
            "temperature": float(os.environ.get("MODEL_TEMPERATURE", "0.2")),
            "max_tokens": int(os.environ.get("MAX_TOKENS", "8192"))
        }
        if json_mode:
            data["response_format"] = {"type": "json_object"}

        try:
            req = urllib.request.Request(
                self.url,
                data=json.dumps(data).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=timeout) as response:
                latency_ms = int((time.time() - start_time) * 1000)
                res_data = json.loads(response.read().decode("utf-8"))
                
                content = res_data["choices"][0]["message"]["content"]
                usage = res_data.get("usage", {})
                prompt_tokens = usage.get("prompt_tokens", 0)
                completion_tokens = usage.get("completion_tokens", 0)
                
                # Pricing: Input $0.15 / 1M, Output $0.60 / 1M tokens
                cost = (prompt_tokens * 0.00000015) + (completion_tokens * 0.00000060)

                return LLMResult(
                    content=content,
                    provider="openai",
                    model=target_model,
                    prompt_tokens=prompt_tokens,
                    completion_tokens=completion_tokens,
                    latency_ms=latency_ms,
                    cost=round(cost, 6),
                    success=True
                )
        except Exception as e:
            latency_ms = int((time.time() - start_time) * 1000)
            logger.error(f"OpenAI provider call failed: {e}")
            return LLMResult(
                content="",
                provider="openai",
                model=target_model,
                latency_ms=latency_ms,
                success=False,
                error_message=str(e)
            )

class AnthropicProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.model_name = "claude-3-5-sonnet-20241022"
        self.url = "https://api.anthropic.com/v1/messages"

    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        json_mode: bool = False,
        timeout: int = 15,
        model: Optional[str] = None
    ) -> LLMResult:
        start_time = time.time()
        headers = {
            "Content-Type": "application/json",
            "x-api-key": self.api_key,
            "anthropic-version": "2023-06-01"
        }
        
        # Claude expects prompt + system separately
        target_model = model or self.model_name
        data: Dict[str, Any] = {
            "model": target_model,
            "max_tokens": int(os.environ.get("MAX_TOKENS", "8192")),
            "messages": [{"role": "user", "content": prompt}],
            "temperature": float(os.environ.get("MODEL_TEMPERATURE", "0.2"))
        }
        if system_prompt:
            data["system"] = system_prompt
        
        # Claude instructions for JSON
        if json_mode:
            data["messages"][0]["content"] += "\nIMPORTANT: You must return output as a strict valid JSON object. Do not include markdown code block formatting or notes outside the JSON structure."

        try:
            req = urllib.request.Request(
                self.url,
                data=json.dumps(data).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=timeout) as response:
                latency_ms = int((time.time() - start_time) * 1000)
                res_data = json.loads(response.read().decode("utf-8"))
                
                content = res_data["content"][0]["text"]
                usage = res_data.get("usage", {})
                prompt_tokens = usage.get("input_tokens", 0)
                completion_tokens = usage.get("output_tokens", 0)
                
                # Pricing: Input $3.00 / 1M, Output $15.00 / 1M tokens
                cost = (prompt_tokens * 0.0000030) + (completion_tokens * 0.0000150)

                return LLMResult(
                    content=content,
                    provider="anthropic",
                    model=target_model,
                    prompt_tokens=prompt_tokens,
                    completion_tokens=completion_tokens,
                    latency_ms=latency_ms,
                    cost=round(cost, 6),
                    success=True
                )
        except Exception as e:
            latency_ms = int((time.time() - start_time) * 1000)
            logger.error(f"Anthropic provider call failed: {e}")
            return LLMResult(
                content="",
                provider="anthropic",
                model=target_model,
                latency_ms=latency_ms,
                success=False,
                error_message=str(e)
            )

class GeminiProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.model_name = "gemini-1.5-flash"
        self.url = f"https://generativelanguage.googleapis.com/v1beta/models/{self.model_name}:generateContent?key={api_key}"

    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        json_mode: bool = False,
        timeout: int = 15,
        model: Optional[str] = None
    ) -> LLMResult:
        start_time = time.time()
        headers = {"Content-Type": "application/json"}
        
        # Combine system prompt with prompt for Gemini if system_prompt is present
        full_prompt = prompt
        if system_prompt:
            full_prompt = f"{system_prompt}\n\nUser Query: {prompt}"

        target_model = model or self.model_name
        # Build URL dynamically if model parameter changes
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{target_model}:generateContent?key={self.api_key}"
        
        data: Dict[str, Any] = {
            "contents": [{"parts": [{"text": full_prompt}]}]
        }
        
        generation_config: Dict[str, Any] = {
            "temperature": float(os.environ.get("MODEL_TEMPERATURE", "0.2")),
            "maxOutputTokens": int(os.environ.get("MAX_TOKENS", "8192"))
        }
        if json_mode:
            generation_config["responseMimeType"] = "application/json"
        data["generationConfig"] = generation_config

        try:
            req = urllib.request.Request(
                url,
                data=json.dumps(data).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=timeout) as response:
                latency_ms = int((time.time() - start_time) * 1000)
                res_data = json.loads(response.read().decode("utf-8"))
                
                content = res_data["candidates"][0]["content"]["parts"][0]["text"]
                usage = res_data.get("usageMetadata", {})
                prompt_tokens = usage.get("promptTokenCount", 0)
                completion_tokens = usage.get("candidatesTokenCount", 0)
                
                # Pricing: Input $0.075 / 1M, Output $0.30 / 1M tokens
                cost = (prompt_tokens * 0.000000075) + (completion_tokens * 0.00000030)

                return LLMResult(
                    content=content,
                    provider="gemini",
                    model=target_model,
                    prompt_tokens=prompt_tokens,
                    completion_tokens=completion_tokens,
                    latency_ms=latency_ms,
                    cost=round(cost, 6),
                    success=True
                )
        except Exception as e:
            latency_ms = int((time.time() - start_time) * 1000)
            logger.error(f"Gemini provider call failed: {e}")
            return LLMResult(
                content="",
                provider="gemini",
                model=target_model,
                latency_ms=latency_ms,
                success=False,
                error_message=str(e)
            )

class OpenRouterProvider(BaseLLMProvider):
    def __init__(self, api_key: str):
        self.api_key = api_key
        self.model_name = os.environ.get("FALLBACK_MODEL", "google/gemini-flash-1.5")
        self.url = "https://openrouter.ai/api/v1/chat/completions"

    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        json_mode: bool = False,
        timeout: int = 15,
        model: Optional[str] = None
    ) -> LLMResult:
        start_time = time.time()
        headers = {
            "Content-Type": "application/json",
            "Authorization": f"Bearer {self.api_key}",
            "HTTP-Referer": "https://github.com/mahitss/croo-agent",
            "X-Title": "Orbit AI"
        }
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.append({"role": "user", "content": prompt})

        target_model = model or self.model_name
        data: Dict[str, Any] = {
            "model": target_model,
            "messages": messages,
            "temperature": float(os.environ.get("MODEL_TEMPERATURE", "0.2")),
            "max_tokens": int(os.environ.get("MAX_TOKENS", "8192"))
        }
        if json_mode:
            data["response_format"] = {"type": "json_object"}

        try:
            req = urllib.request.Request(
                self.url,
                data=json.dumps(data).encode("utf-8"),
                headers=headers,
                method="POST"
            )
            with urllib.request.urlopen(req, timeout=timeout) as response:
                latency_ms = int((time.time() - start_time) * 1000)
                res_data = json.loads(response.read().decode("utf-8"))
                
                content = res_data["choices"][0]["message"]["content"]
                usage = res_data.get("usage", {})
                prompt_tokens = usage.get("prompt_tokens", 0)
                completion_tokens = usage.get("completion_tokens", 0)
                
                cost = (prompt_tokens * 0.000000075) + (completion_tokens * 0.00000030)

                return LLMResult(
                    content=content,
                    provider="openrouter",
                    model=target_model,
                    prompt_tokens=prompt_tokens,
                    completion_tokens=completion_tokens,
                    latency_ms=latency_ms,
                    cost=round(cost, 6),
                    success=True
                )
        except Exception as e:
            latency_ms = int((time.time() - start_time) * 1000)
            logger.error(f"OpenRouter provider call failed: {e}")
            return LLMResult(
                content="",
                provider="openrouter",
                model=target_model,
                latency_ms=latency_ms,
                success=False,
                error_message=str(e)
            )

class LLMProviderManager:
    def __init__(self):
        self.providers: Dict[str, BaseLLMProvider] = {}
        self.metrics = {
            "openai": {"calls": 0, "failures": 0, "total_latency": 0, "total_tokens": 0, "total_cost": 0.0},
            "anthropic": {"calls": 0, "failures": 0, "total_latency": 0, "total_tokens": 0, "total_cost": 0.0},
            "gemini": {"calls": 0, "failures": 0, "total_latency": 0, "total_tokens": 0, "total_cost": 0.0},
            "openrouter": {"calls": 0, "failures": 0, "total_latency": 0, "total_tokens": 0, "total_cost": 0.0}
        }
        self.initialize_providers()

    def initialize_providers(self):
        openai_key = os.environ.get("OPENAI_API_KEY")
        anthropic_key = os.environ.get("ANTHROPIC_API_KEY")
        gemini_key = os.environ.get("GEMINI_API_KEY")
        openrouter_key = os.environ.get("OPENROUTER_API_KEY")

        if openai_key:
            self.providers["openai"] = OpenAIProvider(openai_key)
            logger.info("OpenAI LLM provider loaded.")
        if anthropic_key:
            self.providers["anthropic"] = AnthropicProvider(anthropic_key)
            logger.info("Anthropic LLM provider loaded.")
        if gemini_key:
            self.providers["gemini"] = GeminiProvider(gemini_key)
            logger.info("Gemini LLM provider loaded.")
        if openrouter_key:
            self.providers["openrouter"] = OpenRouterProvider(openrouter_key)
            logger.info("OpenRouter LLM provider loaded.")

    def get_active_providers(self) -> List[str]:
        return list(self.providers.keys())

    def get_metrics(self) -> Dict[str, Any]:
        return self.metrics

    def execute_with_retry_and_fallback(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        json_mode: bool = False,
        primary_provider: Optional[str] = None,
        max_retries: int = 3,
        timeout: int = 15,
        model: Optional[str] = None
    ) -> LLMResult:
        # Determine execution chain
        env_default = os.environ.get("DEFAULT_LLM_PROVIDER", "openai").lower()
        preferred = primary_provider or env_default
        
        # Calculate request timeout
        env_timeout_ms = os.environ.get("REQUEST_TIMEOUT")
        if env_timeout_ms:
            timeout_sec = max(1, int(int(env_timeout_ms) / 1000))
        else:
            timeout_sec = timeout

        
        # Build fallback list beginning with preferred provider
        active_list = self.get_active_providers()
        
        if not active_list:
            logger.warning("No active LLM providers configured (missing API keys). Falling back to mock response.")
            return LLMResult(
                content="",
                provider="mock",
                model="mock-fallback",
                success=False,
                error_message="No configured LLM providers (missing API keys)"
            )
            
        execution_chain = []
        if preferred in active_list:
            execution_chain.append(preferred)
        for provider in active_list:
            if provider not in execution_chain:
                execution_chain.append(provider)

        last_error = None
        for provider_name in execution_chain:
            provider = self.providers[provider_name]
            
            # Exponential Backoff Retries within provider
            for attempt in range(max_retries):
                # Switch to fallback model on retry attempts if using openrouter
                current_model = model
                if provider_name == "openrouter" and attempt > 0:
                    fallback = os.environ.get("FALLBACK_MODEL", "openrouter/auto")
                    logger.info(f"Primary model failed. Falling back to model: {fallback}")
                    current_model = fallback

                logger.info(f"Invoking {provider_name} with model {current_model or 'default'} (Attempt {attempt + 1}/{max_retries})...")
                self.metrics[provider_name]["calls"] += 1
                
                result = provider.generate(
                    prompt=prompt,
                    system_prompt=system_prompt,
                    json_mode=json_mode,
                    timeout=timeout_sec,
                    model=current_model
                )

                
                if result.success:
                    # Update metrics
                    self.metrics[provider_name]["total_latency"] += result.latency_ms
                    self.metrics[provider_name]["total_tokens"] += (result.prompt_tokens + result.completion_tokens)
                    self.metrics[provider_name]["total_cost"] += result.cost
                    return result
                else:
                    self.metrics[provider_name]["failures"] += 1
                    last_error = result.error_message
                    # Exponential Backoff sleep: 1s, 2s, 4s...
                    time.sleep(2 ** attempt)
            
            logger.warning(f"Provider {provider_name} failed after {max_retries} attempts. Trying next fallback...")

        return LLMResult(
            content="",
            provider="failed",
            model="failed-all",
            success=False,
            error_message=f"All configured LLM providers failed. Last error: {last_error}"
        )
