const prisma = require('../lib/prismaClient');

const getAllCustomers = async (req, res) => {
  try {
    const customers = await prisma.customer.findMany();
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customers' });
  }
};

const getCustomerById = async (req, res) => {
  const { id } = req.params;
  try {
    const customer = await prisma.customer.findUniqueOrThrow({
      where: { id: parseInt(id) },
    });

    if (customer) {
      res.status(200).json(customer);
    } else {
      res.status(404).json({ error: 'Customer not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch customer' });
  }
};

const addCustomer = async (req, res) => {
  const { firstName, lastName, email, phoneNumber, address, dateOfBirth } =
    req.body;
  try {
    const newCustomer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth: new Date(dateOfBirth),
      },
    });
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add customer' });
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email, phoneNumber, address, dateOfBirth } =
    req.body;
  try {
    const updatedCustomer = await prisma.customer.update({
      where: { id: parseInt(id) },
      data: {
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        dateOfBirth: dateOfBirth && new Date(dateOfBirth),
      },
    });
    res.status(200).json(updatedCustomer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update customer' });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;
  try {
    await prisma.customer.delete({ where: { id: parseInt(id) } });
    res.status(204).json();
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete customer' });
  }
};

module.exports = {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
};
