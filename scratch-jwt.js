const crypto = require('crypto');

const jwtSecret = 'nexus_secure_secret_hash_key_1012';

// Sign logic from crypto.service.ts
function toBase64Url(str) {
  return Buffer.from(str).toString('base64url');
}

function signJwt(payload) {
  const header = { alg: 'HS256', typ: 'JWT' };
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + 3600;
  const jwtPayload = { ...payload, iat, exp };
  
  const base64UrlHeader = toBase64Url(JSON.stringify(header));
  const base64UrlPayload = toBase64Url(JSON.stringify(jwtPayload));
  const signatureInput = `${base64UrlHeader}.${base64UrlPayload}`;
  
  const signature = crypto
    .createHmac('sha256', jwtSecret)
    .update(signatureInput)
    .digest('base64url');
    
  return `${signatureInput}.${signature}`;
}

function verifyJwt(token) {
  const parts = token.split('.');
  console.log("Token parts length:", parts.length);
  const [header, payload, signature] = parts;
  const signatureInput = `${header}.${payload}`;
  
  const expectedSignature = crypto
    .createHmac('sha256', jwtSecret)
    .update(signatureInput)
    .digest('base64url');

  console.log("Signature in token:", signature);
  console.log("Expected signature: ", expectedSignature);
  console.log("Match:", signature === expectedSignature);
}

const token = signJwt({ id: 'user-1' });
verifyJwt(token);
