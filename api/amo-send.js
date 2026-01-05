// pages/api/amo-send.js
import { promises as fs } from 'fs';
import path from 'path';

const AMO_SUBDOMAIN = 'stepanovdanya2006'; 
const CLIENT_ID = 'b31503d9-48d6-497f-bd46-5bb61081ce38';
const CLIENT_SECRET = 'jrcfKONp1Uxu16yQjMYIuMUUc2W357yuBLTSRDCo9fxRw2KiTirMXMeeTS5J1WK3';
const REDIRECT_URI = 'https://prodoma.vercel.app/api/amo-send';

const TOKEN_FILE = path.join(process.cwd(), 'tokens.json');


async function getTokens() {
  try {
    const data = await fs.readFile(TOKEN_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    throw new Error('Токены не найдены. Выполните авторизацию.');
  }
}

// Обновление access_token, если он истёк
async function refreshAccessToken(refreshToken) {
  const res = await fetch(`https://${AMO_SUBDOMAIN}.amocrm.ru/oauth2/access_token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      redirect_uri: REDIRECT_URI,
    }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(`OAuth error: ${res.status} ${JSON.stringify(error)}`);
  }

  const tokens = await res.json();
  tokens.expires_at = Date.now() + tokens.expires_in * 1000;
  await fs.writeFile(TOKEN_FILE, JSON.stringify(tokens, null, 2));
  return tokens;
}

// Отправка лида в AmoCRM
async function sendLeadToAmo(leadData, accessToken) {
  const res = await fetch(`https://${AMO_SUBDOMAIN}.amocrm.ru/api/v4/leads/complex`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify([{
      name: `Заявка от ${leadData.name}`,
      price: 0,
      _embedded: {
        contacts: [{
          first_name: leadData.name,
          custom_fields_values: [
            {
              field_code: 'PHONE',
              values: [{ value: leadData.phone }]
            },
            {
              field_code: 'EMAIL',
              values: [{ value: '' }] // можно оставить пустым
            }
          ]
        }]
      }
    }])
  });

  return res;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  try {
    const { name, phone, description } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Имя и телефон обязательны' });
    }

    // Получаем токены
    const tokens = await getTokens();

    // Обновляем токен, если нужно
    let accessToken = tokens.access_token;
    if (Date.now() >= tokens.expires_at - 60000) {
      const newTokens = await refreshAccessToken(tokens.refresh_token);
      accessToken = newTokens.access_token;
    }

    // Отправляем лид
    const leadData = { name, phone, description };
    const apiRes = await sendLeadToAmo(leadData, accessToken);

    if (apiRes.ok) {
      return res.status(200).json({ success: true });
    } else {
      const error = await apiRes.json().catch(() => ({}));
      console.error('AmoCRM API error:', error);
      return res.status(apiRes.status).json({ error: 'Ошибка AmoCRM' });
    }

  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ error: 'Внутренняя ошибка сервера' });
  }
}