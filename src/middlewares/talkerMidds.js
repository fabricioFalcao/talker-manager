const { readFile, writeFile } = require('../utils/handleFile');

const getAllTalkers = async () => readFile();

const getTalkerById = async (id) => {
  const talkersList = await readFile();
  const talker = talkersList.find((element) => element.id === +id);
  return talker;
};

const postTalker = async (newTalker) => {
  const talkersList = await readFile();

  if (!talkersList) return false;

  const id = talkersList[talkersList.length - 1].id + 1;
  const newTalkerData = { id, ...newTalker };
  talkersList.push(newTalkerData);
  writeFile(talkersList);
  return newTalkerData;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  postTalker,
};