Integration Guide: AI Demo Assistant for Login & Landing Pages
Production Base URL: https://api.optima.altaiweb.online
Authentication for Demo API: Public / None required (CORS enabled)
Default Demo Tenant: Connected automatically to altai_optima (ALTAI Optima)
──────
### 1. Architectural Rules for the Chat Interface

1. User Sends the First Message: Do not pre-populate the chat dialogue with an automatic assistant message bubble. Start with a clean starter card, placeholder, or clickable question chips. The first message rendered in the chat stream must be the visitor's prompt.
2. Session Persistence (Multi-Turn): The backend maintains full dialogue history across turns. Store the returned session_id in browser storage (localStorage or sessionStorage) and pass it in every subsequent turn.
3. Queue Throttling Handling: When traffic is high, requests wait in a server-side Redis queue to protect OpenRouter tokens. Always display a visual loading/typing indicator while awaiting the response.
4. Rate Limit Handling: If a client exceeds 20 req/min, the server returns 429 Too Many Requests. Display a friendly toast ("Сервер временно перегружен, пожалуйста, подождите минуту").
──────
### 2. Endpoints Reference

#### A. Get Widget Configuration & Suggested Prompts

• Endpoint: GET https://api.optima.altaiweb.online/api/v1/demo/config?tenant_id=altai_optima
• When to call: On page load to retrieve company name and suggested prompt chips.
• Response (200 OK):

{
  "tenant_id": "altai_optima",
  "business_name": "ALTAI Optima",
  "welcome_message": "Здравствуйте! Я ваш персональный AI-менеджер компании «ALTAI Optima». Готов рассчитать спецификацию, подсказать цены со склада и условия доставки. Чем могу помочь?",
  "suggested_questions": [
    "Какой газобетон D500 есть в наличии и по какой цене?",
    "Сколько стоит доставка 40 кубов блоков в Истру манипулятором?",
    "Какие скидки предусмотрены при заказе от 50 кубов?",
    "Можно ли зафиксировать цену на 14 дней перед началом стройки?"
  ],
  "max_message_length": 4000
}

#### B. Send Message Turn

• Endpoint: POST https://api.optima.altaiweb.online/api/v1/demo/chat
• Headers: Content-Type: application/json
• Request Payload:

{
  "message": "Нужно 40 кубов газобетона D500 с доставкой в Истру. Сколько выйдет?",
  "session_id": "demo_911b62e2eb9d", // null on first turn, pass returned ID on next turns
  "tenant_id": "altai_optima"
}

• Response (200 OK):

{
  "ok": true,
  "session_id": "demo_911b62e2eb9d",
  "tenant_id": "altai_optima",
"assistant_response": "Для объема 40 м³ стоимость составит 190 000 ₽ с учетом оптовой скидки. Доставка манипулятором в Истру — 8 000 ₽. Зафиксировать за вами эту партию на 14
дней?",
"latency_ms": 2840,
"waited_seconds": 0.0,
"status": "success",
"error": null
}

#### C. Live Server Status (Optional Health/Load Indicator)

• Endpoint: GET https://api.optima.altaiweb.online/api/v1/demo/status
• Response (200 OK):

{
"active_concurrency": 0,
"max_concurrency": 2,
"requests_last_minute": 1,
"burst_threshold": 15,
"is_throttled": false
}
──────
### 3. Authentication Reference (If Implementing the Login Form)

If the page also contains the user sign-in form:

• Endpoint: POST https://api.optima.altaiweb.online/api/v1/auth/login (or POST /login)
• Headers: Content-Type: application/json
• Payload: {"username": "admin", "password": "...", "next": "/aitest"}
• Credentials: Sets the HTTP-only cookie altai_session.
• Pre-configured Test Accounts:
• Admin: admin / admin123
• Tester: tester1 / tester123

──────
### 4. Drop-in Frontend Client (TypeScript / Modern JS)

export interface DemoConfig {
tenant_id: string;
business_name: string;
welcome_message: string;
suggested_questions: string[];
}

export interface DemoResponse {
ok: boolean;
session_id: string;
assistant_response: string;
latency_ms: number;
waited_seconds: number;
}

class DemoChatClient {
private baseUrl = "https://api.optima.altaiweb.online";
private tenantId = "altai_optima";
private storageKey = "altai_demo_session_id_altai_optima";

getSessionId(): string | null {
return localStorage.getItem(this.storageKey);
}

resetSession(): void {
localStorage.removeItem(this.storageKey);
}

async getConfig(): Promise<DemoConfig> {
const res = await fetch(`${this.baseUrl}/api/v1/demo/config?tenant_id=${encodeURIComponent(this.tenantId)}`);
if (!res.ok) throw new Error(`Config failed: HTTP ${res.status}`);
return res.json();
}

async sendMessage(messageText: string): Promise<DemoResponse> {
const payload = {
  message: messageText.trim(),
  session_id: this.getSessionId(),
  tenant_id: this.tenantId,
};

const res = await fetch(`${this.baseUrl}/api/v1/demo/chat`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

if (res.status === 429) {
  throw new Error("Слишком много запросов. Подождите минуту.");
}

if (!res.ok) {
  throw new Error(`Ошибка сервера (${res.status})`);
}

const data: DemoResponse = await res.json();
if (data.session_id) {
  localStorage.setItem(this.storageKey, data.session_id);
}
return data;
}
}

export const demoChatClient = new DemoChatClient();
```***
