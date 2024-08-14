const prisma = require('../lib/prismaClient');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(500).json({ error: 'Missing or Invalid fields' });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = jwt.sign({ username }, process.env.SECRET_KEY);

    return res.status(201).json({ message: `Welcome ${username}`, token });
  } catch (error) {
    if (
      error.code === 'P2002' &&
      error.meta &&
      error.meta.target.includes('username')
    ) {
      return res.status(409).json({ error: 'Username already exists' });
    }

    return res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({ where: { username } });
  if (!user)
    return res.status(400).json({ error: 'Incorrect username/password' });

  const match = await bcrypt.compare(password, user.password);
  if (!match)
    return res.status(400).json({ error: 'Incorrect username/password' });

  const token = jwt.sign({ username }, process.env.SECRET_KEY);
  res.status(201).json({ token });
};

module.exports = { signup, login };
