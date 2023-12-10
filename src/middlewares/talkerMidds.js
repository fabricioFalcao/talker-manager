const { readFile } = require('../utils/handleFile');

const getAllTalkers = async () => readFile();

const getTalkerById = async (id) => {
  const talkersList = await readFile();
  const talker = talkersList.find((element) => element.id === +id);
  return talker;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
};