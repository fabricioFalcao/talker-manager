const isNotEmpty = (value, res, field) => {
  if (!value) return res.status(400).json({ message: `O campo "${field}" é obrigatório` });
};

const validEmail = (email, res) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailPattern.test(email)) {
    return res.status(400).json({
      message: 'O "email" deve ter o formato "email@email.com"',
    });
  }
};

const validPassword = (password, res) => {
  if (password.length < 6) {
    return res.status(400).json({
      message: 'O "password" deve ter pelo menos 6 caracteres',
    });
  }
};

module.exports = (req, res, next) => {
  const { email, password } = req.body;

  return isNotEmpty(email, res, 'email')
    || isNotEmpty(password, res, 'password')
    || validEmail(email, res)
    || validPassword(password, res)
    || next();
};