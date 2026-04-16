AGENT.md — Kryptex Security Contract

Read this file completely before writing a single line of code. This is not optional guidance. Every rule here is a hard requirement. Kryptex stores users' most sensitive secrets. A single security mistake can compromise every password, recovery key, and passphrase a user owns. There is no acceptable margin for error.


What This Project Is?
Kryptex is a zero-knowledge, end-to-end encrypted password and recovery key manager.

Built with: Next.js 14 (App Router), Clerk (auth), Supabase (PostgreSQL database)
The server never sees plaintext passwords, passphrases, recovery keys, or vault item content
All encryption and decryption happens exclusively in the browser
Even a complete database breach must expose nothing usable to an attacker

This is a security-critical application. Every decision you make — architecture, naming, data flow, error handling — must be evaluated through a security lens first.


Non-Negotiable Security Rules
1. Zero-Knowledge is Absolute
The server must never receive, process, store, or log any of the following in plaintext:

Master passwords
Derived vault keys
Decrypted vault item content (passwords, passphrases, usernames, URLs, notes, card numbers)
Recovery keys (raw)
Any intermediate crypto material

If you find yourself writing code that sends decrypted data to an API route, stop and redesign.

The only data that ever leaves the browser regarding vault content is:

cipher_text (opaque encrypted bytes)
iv (12-byte initialisation vector)
aad (additional authenticated data — binds ciphertext to owner)
item_type (plaintext label: "password", "note", etc.)
schema_version (integer for crypto migration support)
2. Vault Key Lives in Memory Only
The decrypted vault key must be stored only in React state (in-memory). It must never be written to:

localStorage
sessionStorage
Cookies (including HttpOnly cookies)
IndexedDB
Any browser persistence API
URL parameters
The DOM

When the user locks the vault or the inactivity timeout fires, the key must be removed from state and the component holding it must unmount and re-render. Garbage collection of the key material must be immediate.
3. Cryptography Standards — Do Not Deviate
Operation
Required Algorithm
Notes
Vault item encryption
AES-256-GCM
Via Web Crypto API only
Master password key derivation
Argon2id
Via argon2-browser. time=3, memory=65536, parallelism=4
Fallback KDF (if Argon2id unavailable)
PBKDF2-SHA256
Min 600,000 iterations
IV generation
crypto.getRandomValues(new Uint8Array(12))
Fresh per item per write — NEVER reused
Recovery key generation
crypto.getRandomValues(new Uint8Array(32))
Display once, never store
Recovery key storage
Argon2id hash only
The hash goes to DB, the raw key does not
Vault key wrapping
AES-256-GCM with derived key
Envelope encryption pattern


Never use:

Math.random() for any cryptographic purpose
MD5, SHA-1, or bcrypt for key derivation
ECB mode for anything
DES or 3DES
RSA below 2048 bits
Custom or hand-rolled crypto algorithms
4. AAD (Additional Authenticated Data) is Mandatory
Every AES-256-GCM encryption of a vault item must include AAD that binds the ciphertext to its owner. The AAD must include at minimum: user_id + item_id + item_type. This prevents an attacker with database access from transplanting one user's ciphertext into another user's vault.

Verify AAD on every decryption. If verification fails, throw an error and do not attempt to use the decrypted output.
5. API Routes — Trust Nothing from the Client
Every API route must:

Verify the Clerk session server-side using auth() from @clerk/nextjs/server. Never trust a userId sent in the request body or query string.
Validate all inputs with Zod before touching the database. Reject malformed requests with a 400.
Apply rate limiting via Upstash Redis before any business logic.
Return only generic error messages to the client. Never return raw database errors, stack traces, or internal identifiers.
Derive user identity from the session token — never from a client-supplied parameter.

Example of what is forbidden:

// NEVER DO THIS

const { userId } = req.body  // ← attacker controls this

await supabase.from('vault_items').select('*').eq('user_id', userId)

Example of what is required:

// ALWAYS DO THIS

const { userId } = auth()  // ← from verified Clerk session

if (!userId) return new Response('Unauthorized', { status: 401 })
6. Row Level Security is the Last Line of Defence
Supabase RLS policies must be enabled and tested on every table. RLS is not optional and is not a fallback — it is a hard security boundary that protects users even if application code has a bug.

Required RLS on vault_items, recovery_keys, audit_logs:

-- Users can only access their own rows

CREATE POLICY "owner_only" ON vault_items

  FOR ALL USING (auth.uid()::text = (

    SELECT clerk_user_id FROM users WHERE id = user_id

  ));

Before any feature is marked done, verify RLS manually: authenticate as User A and confirm you cannot read, write, or delete User B's rows — even with a crafted request.
7. Audit Logs Are Append-Only
The audit_logs table must never be modified or deleted. RLS enforces this:

CREATE POLICY "insert_only" ON audit_logs FOR INSERT WITH CHECK (true);

CREATE POLICY "no_update"   ON audit_logs FOR UPDATE USING (false);

CREATE POLICY "no_delete"   ON audit_logs FOR DELETE USING (false);

Log every action: vault unlock attempts (success and failure), item create/read/update/delete, recovery key attempts, session events, settings changes.

Store IP addresses as SHA-256(ip) — not raw. Same for user-agent strings.
8. Rate Limiting is Mandatory on These Endpoints
Endpoint
Limit
POST /api/auth/* (any auth action)
10 requests / 15 min per IP
POST /api/vault/unlock
5 requests / 15 min per IP + user
POST /api/recovery/verify
3 requests / 15 min per IP + user
POST /api/vault (create)
60 requests / 1 min per user
GET /api/vault (list)
120 requests / 1 min per user


After exceeding limits: return 429 Too Many Requests with a Retry-After header. Do not reveal which limit was hit.
9. Security HTTP Headers — All Required
Set these in next.config.js headers config. All are mandatory:

{

  key: 'Strict-Transport-Security',

  value: 'max-age=31536000; includeSubDomains; preload'

},

{

  key: 'Content-Security-Policy',

  value: "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'self' https://*.supabase.co https://*.clerk.com; frame-ancestors 'none'"

},

{

  key: 'X-Frame-Options',

  value: 'DENY'

},

{

  key: 'X-Content-Type-Options',

  value: 'nosniff'

},

{

  key: 'Referrer-Policy',

  value: 'no-referrer'

},

{

  key: 'Permissions-Policy',

  value: 'camera=(), microphone=(), geolocation=(), payment=()'

}

Do not loosen the CSP without a documented reason. unsafe-eval and unsafe-inline for scripts are never acceptable.
10. Environment Variables — Hard Rules
NEXT_PUBLIC_SUPABASE_URL        ← safe, anon access only

NEXT_PUBLIC_SUPABASE_ANON_KEY   ← safe, RLS protects all data

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ← safe

CLERK_SECRET_KEY                ← server only, NEVER NEXT_PUBLIC_

SUPABASE_SERVICE_ROLE_KEY       ← server only, NEVER NEXT_PUBLIC_ — bypasses RLS

UPSTASH_REDIS_REST_URL          ← server only

UPSTASH_REDIS_REST_TOKEN        ← server only

SUPABASE_SERVICE_ROLE_KEY bypasses Row Level Security completely. It must only ever be used in server-side code for trusted administrative operations (e.g. writing audit logs). It must never appear in any file that is imported by client components.

Never hardcode secrets in source code. Never commit .env.local to git. Verify .gitignore includes all env files before the first commit.


Forbidden Patterns
The following patterns are security violations. Do not write them under any circumstances:

// ❌ Storing vault key outside React memory

localStorage.setItem('vaultKey', key)

sessionStorage.setItem('vaultKey', key)

document.cookie = `vaultKey=${key}`

// ❌ Trusting client-supplied identity

const userId = req.body.userId

const userId = req.query.userId

// ❌ Logging sensitive data

console.log('vault key:', vaultKey)

console.log('decrypted item:', item)

// ❌ Using Math.random for crypto

const iv = Array.from({length: 12}, () => Math.floor(Math.random() * 256))

// ❌ Reusing an IV

const iv = Buffer.from('000000000000', 'hex')  // static IV

// ❌ Sending decrypted data to server

fetch('/api/vault', { body: JSON.stringify({ password: plaintextPassword }) })

// ❌ Exposing service role key to client

const supabase = createClient(url, process.env.SUPABASE_SERVICE_ROLE_KEY)  // in a client component

// ❌ Returning raw DB errors

return Response.json({ error: error.message })  // leaks internal schema

// ❌ No Zod validation

app.post('/api/vault', async (req) => {

  const { cipher_text } = req.body  // never validated

})

// ❌ No rate limiting on sensitive endpoints

export async function POST(req) {

  // no rate limit check before vault unlock

}


Required Pattern for Every API Route
import { auth } from '@clerk/nextjs/server'

import { z } from 'zod'

import { ratelimit } from '@/lib/rate-limit'

const schema = z.object({

  cipher_text: z.string().min(1),

  iv: z.string().length(24),           // base64 of 18 bytes

  item_type: z.enum(['password', 'passphrase', 'recovery_key', 'note', 'card']),

})

export async function POST(req: Request) {

  // 1. Auth check first

  const { userId } = auth()

  if (!userId) return new Response('Unauthorized', { status: 401 })

  // 2. Rate limit

  const { success } = await ratelimit.limit(userId)

  if (!success) return new Response('Too Many Requests', {

    status: 429,

    headers: { 'Retry-After': '60' }

  })

  // 3. Validate input

  const body = await req.json()

  const result = schema.safeParse(body)

  if (!result.success) return new Response('Bad Request', { status: 400 })

  // 4. Business logic using validated data and server-verified userId

  // ...

  // 5. Write audit log

  // ...

  // 6. Generic response — no internal details

  return new Response('Created', { status: 201 })

}


Vault State Management Rules
The vault state machine must enforce these transitions:

LOCKED → (correct master password) → UNLOCKED

UNLOCKED → (inactivity timeout 5 min) → LOCKED

UNLOCKED → (user manually locks) → LOCKED

UNLOCKED → (browser tab closed / page unload) → LOCKED (key is gone from memory)

LOCKED → (correct recovery key) → RECOVERY_UNLOCK

RECOVERY_UNLOCK → (new master password set) → UNLOCKED

On any transition to LOCKED:

Clear vault key from React state immediately
Clear all decrypted item data from React state
Wipe any password values held in component state
Trigger a re-render that unmounts the vault content


Clerk Configuration Requirements
In the Clerk dashboard, enforce these settings before launch:

Email verification: required
MFA (TOTP): required for all users
Session duration: 8 hours maximum
Re-authentication required before: changing master password, viewing recovery key, exporting vault
Allowed origins: production domain only (no wildcards)
Bot protection: enabled


Supabase Configuration Requirements
Enable RLS on every table — verify with SELECT tablename, rowsecurity FROM pg_tables WHERE schemaname = 'public'
Enable Supabase Vault for storing env secrets
Point-in-time recovery: enabled (for disaster recovery, not security bypass)
Database password: 32+ character random string
Network restrictions: allow only Vercel IP ranges + your IP in development
Disable direct database access in production — API access through Supabase client only


Code Review Checklist
Before marking any PR as ready for review, verify all of the following:

No plaintext secrets sent to or stored by the server
Vault key is in React state only — not persisted anywhere
All crypto uses Web Crypto API or argon2-browser
Every IV is freshly generated with crypto.getRandomValues
AAD is included and verified on every encrypt/decrypt call
API route has: auth check → rate limit → Zod validation → business logic → audit log
User identity comes from Clerk session, not request body/query
No raw database errors returned to client
RLS tested: cross-user access attempt returns empty or 403
No console.log of sensitive data
No new NEXT_PUBLIC_ variable contains a secret
Security headers are present and untouched
Audit log entry written for the action


If You Are Unsure
If you are unsure whether something is secure enough, the answer is no — it is not secure enough.

Ask yourself:

If the database were fully leaked right now, would any user's secrets be exposed? → If yes, redesign.
If an attacker can forge a request, can they access another user's data? → If yes, redesign.
Does the server ever see decrypted vault content? → If yes, redesign.
Is the vault key stored outside of React in-memory state? → If yes, redesign.

When in doubt, choose the more restrictive, more isolated, more explicit implementation. Kryptex users trust this application with their most sensitive data. That trust must be earned and protected on every line of code.
