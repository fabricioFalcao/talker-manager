const { Router } = require('express');
const tokenGenerator = require('../utils/tokenGenerator');

const loginRouter = Router();

loginRouter.post('/', (_req, res) => {
  // const { email, password } = req.body;
  const token = tokenGenerator();
  res.status(200).json({ token });
});

module.exports = loginRouter;