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
    const upsertedPurchase = await prisma.purchase.upsert({
      where: {
        customerId_medicineId: {
          customerId: parseInt(customerId),
          medicineId: parseInt(medicineId),
        },
      },
      update: {
        quantity: {
          increment: parseInt(quantity),
        },
      },
      create: {
        customerId: parseInt(customerId),
        medicineId: parseInt(medicineId),
        quantity: parseInt(quantity),
      },
    });

    return res
      .status(200)
      .json({ message: 'Purchase upserted', purchase: upsertedPurchase });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Failed to upsert purchase' });
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
  deletePurchase,
};
