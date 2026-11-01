<?php
/**
 * Серверный обработчик заявок на тест-драйв для PHP хостинга
 * Маршрут: /api/lead.php (или /api/lead при включенном mod_rewrite / nginx)
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Метод не поддерживается. Ожидается POST.']);
    exit;
}

$rawInput = file_get_contents('php://input');
$data = json_decode($rawInput, true);

if (!$data) {
    $data = $_POST;
}

$name = trim($data['name'] ?? '');
$site = trim($data['site'] ?? '');
$channel = trim($data['channel'] ?? 'Telegram');
$contact = trim($data['contact'] ?? '');

if (empty($name) || empty($site) || empty($contact)) {
    http_response_code(400);
    echo json_encode(['success' => false, 'error' => 'Заполните обязательные поля (имя, сайт, контакт).']);
    exit;
}

// Попытка прочесть переменные окружения или локальный .env файл
$token = getenv('TELEGRAM_BOT_TOKEN');
$chatId = getenv('TELEGRAM_CHAT_ID');

if (!$token || !$chatId) {
    $envPath = __DIR__ . '/../.env';
    if (file_exists($envPath)) {
        $lines = file($envPath, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
        foreach ($lines as $line) {
            if (strpos(trim($line), '#') === 0) continue;
            if (strpos($line, '=') !== false) {
                list($key, $val) = explode('=', $line, 2);
                $key = trim($key);
                $val = trim($val, " \t\n\r\0\x0B\"'");
                if ($key === 'TELEGRAM_BOT_TOKEN') $token = $val;
                if ($key === 'TELEGRAM_CHAT_ID') $chatId = $val;
            }
        }
    }
}

// Если токены не настроены — возвращаем предупреждение, но не валим UX
if (!$token || !$chatId) {
    error_log("TELEGRAM_BOT_TOKEN или TELEGRAM_CHAT_ID не настроены.");
    echo json_encode([
        'success' => true,
        'warning' => 'Telegram-токены не настроены на сервере.'
    ]);
    exit;
}

$text = "🔥 <b>Новая заявка на тест-драйв Веры!</b>\n\n"
      . "👤 <b>Имя:</b> " . htmlspecialchars($name, ENT_QUOTES, 'UTF-8') . "\n"
      . "🌐 <b>Сайт / ссылка:</b> " . htmlspecialchars($site, ENT_QUOTES, 'UTF-8') . "\n"
      . "💬 <b>Способ связи:</b> " . htmlspecialchars($channel, ENT_QUOTES, 'UTF-8') . "\n"
      . "📱 <b>Контакт:</b> <code>" . htmlspecialchars($contact, ENT_QUOTES, 'UTF-8') . "</code>\n\n"
      . "⏱ <i>" . date('d.m.Y H:i') . " (МСК)</i>";

$url = "https://api.telegram.org/bot{$token}/sendMessage";
$payload = json_encode([
    'chat_id' => $chatId,
    'text' => $text,
    'parse_mode' => 'HTML'
]);

$ch = curl_init($url);
curl_setopt($ch, CURLOPT_POST, 1);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt($ch, CURLOPT_TIMEOUT, 10);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($httpCode >= 200 && $httpCode < 300) {
    echo json_encode(['success' => true]);
} else {
    error_log("Telegram API error ($httpCode): $response");
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Ошибка отправки в Telegram']);
}
