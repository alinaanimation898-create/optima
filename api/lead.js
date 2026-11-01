/**
 * Серверный обработчик заявок на тест-драйв для Node.js / Vercel Serverless
 * Маршрут: /api/lead
 */

export default async function handler(req, res) {
  // Разрешаем CORS при необходимости
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, error: 'Метод не поддерживается. Ожидается POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, site, channel, contact } = body || {};

    if (!name || !site || !contact) {
      return res.status(400).json({
        success: false,
        error: 'Пожалуйста, заполните все обязательные поля (имя, сайт, контакт).'
      });
    }

    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
      console.error('Ошибка: TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены в переменных окружения.');
      // Возвращаем 200 клиенту, чтобы не ломать UX пользователя, но логируем на сервере
      return res.status(200).json({
        success: true,
        warning: 'Telegram-токены не настроены на сервере.'
      });
    }

    const selectedChannel = channel || 'Telegram';
    const message = [
      '🔥 *Новая заявка на тест-драйв Веры!*',
      '',
      `👤 *Имя:* ${escapeMarkdown(name)}`,
      `🌐 *Сайт / ссылка:* ${escapeMarkdown(site)}`,
      `💬 *Способ связи:* ${escapeMarkdown(selectedChannel)}`,
      `📱 *Контакт:* \`${escapeMarkdown(contact)}\``,
      '',
      `⏱ _Время заявки:_ ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })} (МСК)`
    ].join('\n');

    const tgResponse = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });

    const data = await tgResponse.json();

    if (!data.ok) {
      console.error('Telegram API error:', data);
      return res.status(500).json({ success: false, error: 'Ошибка отправки в Telegram.' });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Lead handler exception:', err);
    return res.status(500).json({ success: false, error: 'Внутренняя ошибка сервера.' });
  }
}

function escapeMarkdown(text) {
  if (!text) return '';
  return String(text).replace(/([_*\[\]()~`>#+=|{}.!-])/g, '\\$1');
}
