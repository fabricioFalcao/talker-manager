const { Router } = require('express');
const { readFile } = require('../middlewares/handleFile');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const talker = await readFile();
  res.status(200).send(talker);
});

module.exports = talkerRouter;