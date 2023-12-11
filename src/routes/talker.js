const { Router } = require('express');
const { getAllTalkers, getTalkerById, postTalker } = require('../middlewares/talkerMidds');
const postValidation = require('../middlewares/postValidation');

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

talkerRouter.post('/', postValidation, async (req, res) => {
  const newTalker = req.body;
  const newTalkerData = await postTalker(newTalker);
  if (!newTalkerData) return res.status(500).json({ message: 'Unable to add new talker' });
  res.status(201).json(newTalkerData);
});

module.exports = talkerRouter;