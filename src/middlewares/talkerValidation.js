const validToken = (token, res) => {
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  if (token.length !== 16) return res.status(401).json({ message: 'Token inválido' });
};

const validName = (name, res) => {
  if (!name) return res.status(400).json({ message: 'O campo "name" é obrigatório' });
  if (name.length < 3) {
    return res.status(400).json({
      message: 'O "name" deve ter pelo menos 3 caracteres',
    });
  }
};

const validAge = (age, res) => {
  if (!age) return res.status(400).json({ message: 'O campo "age" é obrigatório' });
  if (!(Number.isInteger(age) && age >= 18)) {
    return res.status(400).json({
      message: 'O campo "age" deve ser um número inteiro igual ou maior que 18',
    });
  }
};

const validWatchedAt = (watchedAt, res) => {
  const regexDate = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;

  if (!watchedAt) return res.status(400).json({ message: 'O campo "watchedAt" é obrigatório' });
  if (!regexDate.test(watchedAt)) {
    return res.status(400).json({
      message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"',
    });
  }
};

const hasRate = (rate, res) => {
  if (rate === undefined) return res.status(400).json({ message: 'O campo "rate" é obrigatório' });
};

const validRate = (rate, res) => {
  if (!(Number.isInteger(rate) && rate >= 1 && rate <= 5)) {
    return res.status(400).json({
      message: 'O campo "rate" deve ser um número inteiro entre 1 e 5',
    });
  }
};

const validTalk = (talk, res) => {
  if (!talk) return res.status(400).json({ message: 'O campo "talk" é obrigatório' });
  return validWatchedAt(talk.watchedAt, res)
    || hasRate(talk.rate, res)
    || validRate(talk.rate, res);
};

const talkerValidation = (req, res, next) => {
  const { authorization: token } = req.headers;
  const { name, age, talk } = req.body;

  return validToken(token, res)
    || validName(name, res)
    || validAge(age, res)
    || validTalk(talk, res)
    || next();
};

const tokenValidation = (req, res, next) => {
  const { authorization: token } = req.headers;

  return validToken(token, res) || next();
};

const rateValidation = (req, res, next) => {
  const { rate } = req.query;

  if (!rate) return next();

  return validRate(+rate, res) || next();
};

module.exports = {
  talkerValidation,
  tokenValidation,
  rateValidation,
};