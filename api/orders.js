const prisma = require('../lib/prisma');

function parseOrderData(body) {
  return {
    date: body.date ? new Date(body.date) : new Date(),
    customer_name: body.customer_name || '',
    items_count: parseInt(body.items_count, 10) || 1,
    item_prices: body.item_prices || '',
    total_price: parseInt(body.total_price, 10) || 0,
    dp_amount: parseInt(body.dp_amount, 10) || 0,
    dp_method: body.dp_method || '-',
    modal: parseInt(body.modal, 10) || 0,
    status: body.status || 'Pending',
    note: body.note || '',
    checkout_date: body.checkout_date ? new Date(body.checkout_date) : null,
    checkout_amount: body.checkout_amount != null ? parseInt(body.checkout_amount, 10) : null
  };
}

module.exports = async (req, res) => {
  const dbUrl = process.env.PRISMA_DATABASE_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;
  if (!dbUrl) {
    return res.status(500).json({ error: 'Server is not configured. Set PRISMA_DATABASE_URL, DATABASE_URL, or POSTGRES_URL.' });
  }

  try {
    if (req.method === 'GET') {
      const orders = await prisma.order.findMany({ orderBy: { createdAt: 'desc' } });
      return res.status(200).json(orders);
    }

    if (req.method === 'POST') {
      const data = parseOrderData(req.body);
      const order = await prisma.order.create({ data });
      return res.status(201).json(order);
    }

    const id = req.query.id;
    if (!id) {
      return res.status(400).json({ error: 'Missing id parameter' });
    }

    if (req.method === 'PUT') {
      const data = parseOrderData(req.body);
      const order = await prisma.order.update({ where: { id }, data });
      return res.status(200).json(order);
    }

    if (req.method === 'DELETE') {
      await prisma.order.delete({ where: { id } });
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).json({ error: `Method ${req.method} not allowed` });
  } catch (error) {
    console.error('API /api/orders error:', error);
    const message = error?.message || 'Internal server error';
    return res.status(500).json({ error: message });
  }
};
