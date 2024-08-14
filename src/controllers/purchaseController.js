const prisma = require('../lib/prismaClient');

const getAllPurchases = async (req, res) => {
  try {
    const purchases = await prisma.purchase.findMany({
      include: {
        customer: true,
        medicine: true,
      },
    });
    res.status(200).json(purchases);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchases' });
  }
};

const getPurchaseById = async (req, res) => {
  const { id } = req.params;
  try {
    const purchase = await prisma.purchase.findUnique({
      where: { id: parseInt(id) },
      include: {
        customer: true,
        medicine: true,
      },
    });
    if (purchase) {
      res.status(200).json(purchase);
    } else {
      res.status(404).json({ error: 'Purchase not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch purchase' });
  }
};

const addPurchase = async (req, res) => {
  const { customerId, medicineId, quantity } = req.body;
  try {
    const newPurchase = await prisma.purchase.create({
      data: {
        customerId: parseInt(customerId),
        medicineId: parseInt(medicineId),
        quantity,
      },
    });
    res.status(201).json(newPurchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add purchase' });
  }
};

const updatePurchase = async (req, res) => {
  const { id } = req.params;
  const { customerId, medicineId, quantity } = req.body;
  try {
    const updatedPurchase = await prisma.purchase.update({
      where: { id: parseInt(id) },
      data: {
        customerId: parseInt(customerId),
        medicineId: parseInt(medicineId),
        quantity,
      },
    });
    res.status(200).json(updatedPurchase);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update purchase' });
  }
};

const deletePurchase = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.purchase.delete({ where: { id: parseInt(id) } });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete purchase' });
  }
};

module.exports = {
  getAllPurchases,
  getPurchaseById,
  addPurchase,
  updatePurchase,
  deletePurchase,
};
