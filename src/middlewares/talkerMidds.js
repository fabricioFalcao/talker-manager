const { readFile, writeFile } = require('../utils/handleFile');

const getAllTalkers = async () => readFile();

const getTalkerById = async (id) => {
  const talkersList = await readFile();
  const talker = talkersList.find((element) => element.id === +id);
  return talker;
};

const getTalkerByName = async (term) => {
  const talkersList = await readFile();

  if (!term) return talkersList;

  return talkersList.filter(({ name }) => name.toLowerCase().includes(term.toLowerCase()));
};

const getTalkerByRate = async (qResult, rate) => {
  if (!rate) return qResult;

  return qResult.filter(({ talk }) => talk.rate === +rate)
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

const putTalker = async (id, editedData) => {
  const talkersList = await readFile();
  const talker = talkersList.find((element) => element.id === +id);

  if (!talker) return false;

  talker.name = editedData.name;
  talker.age = editedData.age;
  talker.talk.watchedAt = editedData.talk.watchedAt;
  talker.talk.rate = editedData.talk.rate;

  writeFile(talkersList);
  return talker;
};

const deleteTalker = async (id) => {
  const talkersList = await readFile();
  const validId = talkersList.some((element) => element.id === +id);

  if (!validId) return false;

  const updatedList = talkersList.filter((element) => element.id !== +id);
  await writeFile(updatedList);
  return true;
};

module.exports = {
  getAllTalkers,
  getTalkerById,
  postTalker,
  putTalker,
  deleteTalker,
  getTalkerByName,
  getTalkerByRate,
};