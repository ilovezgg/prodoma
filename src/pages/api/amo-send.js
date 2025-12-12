// api/amo-send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, phone, description } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const AMO_SUBDOMAIN = process.env.AMO_SUBDOMAIN || 'bottlecvv';
  const ACCESS_TOKEN = process.env.AMO_ACCESS_TOKEN;

  if (!ACCESS_TOKEN) {
    console.error('❌ AMO_ACCESS_TOKEN не задан');
    return res.status(500).json({ error: 'Ошибка сервера' });
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
    const response = await fetch(`https://${AMO_SUBDOMAIN}.amocrm.ru/api/v4/leads`, {
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
                    field_code: 'PHONE',
                    values: [{ value: formattedPhone, enum_code: 'WORK' }]
                  }
                ]
              }
            ]
          }
        }
      ])
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AmoCRM error:', response.status, errorText);
      return res.status(500).json({ error: 'Не удалось отправить заявку' });
    }

    res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}