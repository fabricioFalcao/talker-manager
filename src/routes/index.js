const { Router } = require('express');

const router = Router();

const loginRouter = require('./login');
const talkerRouter = require('./talker');

router.use('/login', loginRouter);
router.use('/talker', talkerRouter);

module.exports = router;