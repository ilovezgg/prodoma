// api/amo-send.js
export default async function handler(request, response) {
  // Тело запроса уже парсится автоматически в новых версиях Vercel!
  const body = await request.json();

  if (request.method !== 'POST') {
    return response.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, phone, description } = body;

  if (!name || !phone) {
    return response.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const AMO_SUBDOMAIN = process.env.AMO_SUBDOMAIN || 'bottlecvv';
  const ACCESS_TOKEN = process.env.AMO_ACCESS_TOKEN;

  if (!ACCESS_TOKEN) {
    console.error('❌ AMO_ACCESS_TOKEN не задан');
    return response.status(500).json({ error: 'Ошибка сервера' });
  }

  // Нормализация телефона
  const cleanPhone = phone.replace(/\D/g, '');
  let formattedPhone = cleanPhone;
  if (cleanPhone.startsWith('8')) {
    formattedPhone = '7' + cleanPhone.slice(1);
  } else if (!cleanPhone.startsWith('7')) {
    formattedPhone = '7' + cleanPhone;
  }
  formattedPhone = '+' + formattedPhone;

  try {
    const res = await fetch(`https://${AMO_SUBDOMAIN}.amocrm.ru/api/v4/leads`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        {
          name: `Заявка с сайта: ${name}`,
          pipeline_id: 10396294,
          price: 0,
          _embedded: {
            contacts: [
              {
                first_name: name,
                custom_fields_values: [
                  {
                    field_id: 123456, // ← ЛУЧШЕ использовать field_id вместо field_code
                    values: [{ value: formattedPhone, enum_id: 12345 }] // ← или enum_code
                  }
                ]
              }
            ]
          }
        }
      ])
    });

    if (!res.ok) {
      const text = await res.text();
      console.error('AmoCRM error:', res.status, text);
      return response.status(500).json({ error: 'Не удалось отправить заявку' });
    }

    response.status(200).json({ success: true });

  } catch (error) {
    console.error('Ошибка:', error);
    response.status(500).json({ error: 'Ошибка сервера' });
  }
}