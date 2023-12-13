const { Router } = require('express');
const {
  getAllTalkers,
  getTalkerById,
  postTalker,
  putTalker,
  deleteTalker,
  getTalkerByName,
  getTalkerByRate,
  getTalkerByDate,
  patchRate,
} = require('../middlewares/talkerMidds');

const {
  talkerValidation,
  tokenValidation,
  rateValidation,
  dateValidation,
  ratePatchValidation,
} = require('../middlewares/talkerValidation');

const getAllFromDB = require('../db/dbMidds');

const dbDataFormat = require('../utils/dbDataFormat');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const talkers = await getAllTalkers();
  res.status(200).send(talkers);
});

talkerRouter.get('/db', async (_req, res) => {
  const [data] = await getAllFromDB();
  const talkers = dbDataFormat(data);
  res.status(200).json(talkers);
});

talkerRouter.get('/search', tokenValidation, rateValidation, dateValidation, async (req, res) => {
  const { q, rate, date } = req.query;
  const qResult = await getTalkerByName(q);
  const rResult = getTalkerByRate(qResult, rate);
  const result = getTalkerByDate(rResult, date);
  res.status(200).json(result);
});

talkerRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const talker = await getTalkerById(id);
  if (!talker) return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
  res.status(200).send(talker);
});

talkerRouter.post('/', talkerValidation, async (req, res) => {
  const newTalker = req.body;
  const newTalkerData = await postTalker(newTalker);
  if (!newTalkerData) return res.status(500).json({ message: 'Unable to add new talker' });
  res.status(201).json(newTalkerData);
});

talkerRouter.put('/:id', talkerValidation, async (req, res) => {
  const { id } = req.params;
  const editedData = req.body;
  const editedTalker = await putTalker(id, editedData);
  if (editedTalker) return res.status(200).json(editedTalker);
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.delete('/:id', tokenValidation, async (req, res) => {
  const { id } = req.params;
  const response = await deleteTalker(id);
  if (response) return res.status(204).end();
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

talkerRouter.patch('/rate/:id', tokenValidation, ratePatchValidation, async (req, res) => {
  const { id } = req.params;
  const { rate } = req.body;
  const editedRate = await patchRate(id, rate);
  if (editedRate) return res.status(204).end();
  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

module.exports = talkerRouter;