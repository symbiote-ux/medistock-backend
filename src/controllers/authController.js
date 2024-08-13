const signup = async (req, res) => {
  return res.send({ msg: 'signUp' });
};

const login = async (req, res) => {
  return res.send({ msg: 'login' });
};

module.exports = { signup, login };
