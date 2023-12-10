const { Router } = require('express');
const { getAllTalkers, getTalkerById } = require('../middlewares/talkerMidds');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const talker = await getAllTalkers();
  res.status(200).send(talker);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).send(talker);
});

module.exports = talkerRouter;