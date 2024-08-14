const prisma = require('../lib/prismaClient');

const getAllMedicines = async (req, res) => {
  try {
    const medicines = await prisma.medicine.findMany();
    res.status(200).json(medicines);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicines' });
  }
};

const getMedicineById = async (req, res) => {
  const { id } = req.params;
  try {
    const medicine = await prisma.medicine.findUnique({
      where: { id: parseInt(id) },
    });
    if (medicine) {
      res.status(200).json(medicine);
    } else {
      res.status(404).json({ error: 'Medicine not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch medicine' });
  }
};

const addMedicine = async (req, res) => {
  const {
    name,
    brand,
    description,
    price,
    quantityInStock,
    expiryDate,
    manufacturedDate,
    batchNumber,
  } = req.body;
  try {
    const newMedicine = await prisma.medicine.create({
      data: {
        name,
        brand,
        description,
        price,
        quantityInStock,
        expiryDate: expiryDate ? new Date(expiryDate) : null,
        manufacturedDate: manufacturedDate ? new Date(manufacturedDate) : null,
        batchNumber,
      },
    });
    res.status(201).json(newMedicine);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add medicine' });
  }
};

const updateMedicine = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    brand,
    description,
    price,
    quantityInStock,
    expiryDate,
    manufacturedDate,
    batchNumber,
  } = req.body;
  try {
    const updatedMedicine = await prisma.medicine.update({
      where: { id: parseInt(id) },
      data: {
        name,
        brand,
        description,
        price,
        quantityInStock,
        expiryDate: expiryDate ? new Date(expiryDate) : undefined,
        manufacturedDate: manufacturedDate
          ? new Date(manufacturedDate)
          : undefined,
        batchNumber,
      },
    });
    res.status(200).json(updatedMedicine);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update medicine' });
  }
};

const deleteMedicine = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.medicine.delete({ where: { id: parseInt(id) } });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete medicine' });
  }
};

module.exports = {
  getAllMedicines,
  getMedicineById,
  addMedicine,
  updateMedicine,
  deleteMedicine,
};
