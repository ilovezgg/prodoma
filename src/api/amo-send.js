// pages/api/amo-send.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Метод не разрешён' });
  }

  const { name, phone, description } = req.body;

  if (!name || !phone) {
    return res.status(400).json({ error: 'Имя и телефон обязательны' });
  }

  const AMO_SUBDOMAIN = process.env.AMO_SUBDOMAIN;
  const ACCESS_TOKEN = process.env.AMO_ACCESS_TOKEN;

  if (!AMO_SUBDOMAIN || !ACCESS_TOKEN) {
    console.error('❌ Не заданы AMO_SUBDOMAIN или AMO_ACCESS_TOKEN');
    return res.status(500).json({ error: 'Ошибка конфигурации' });
  }

  // Нормализуем телефон: оставляем только цифры и добавляем +7
  const cleanPhone = phone.replace(/\D/g, '');
  const formattedPhone = cleanPhone.startsWith('7') || cleanPhone.startsWith('8')
    ? `+7${cleanPhone.slice(1)}`
    : `+${cleanPhone || '70000000000'}`;

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
      console.error('❌ AmoCRM ошибка:', response.status, errorText);
      return res.status(500).json({ error: 'Не удалось отправить в AmoCRM' });
    }

    // Успешно
    res.status(200).json({ success: true });

  } catch (error) {
    console.error('💥 Ошибка при отправке:', error);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}