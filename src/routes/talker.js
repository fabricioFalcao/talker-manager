const { Router } = require('express');
const { getAllTalkers } = require('../middlewares/talkerMidds');

const talkerRouter = Router();

talkerRouter.get('/', async (_req, res) => {
  const talker = await getAllTalkers();
  res.status(200).send(talker);
});

module.exports = talkerRouter;