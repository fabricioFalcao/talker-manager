const fs = require('fs').promises;
const { resolve } = require('path');

const filePath = resolve(__dirname, '../talker.json');

const readFile = async () => {
  try {
    const data = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const writeFile = async (list) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(list, null, 2));
  } catch (error) {
    console.error('Erro ao salvar o arquivo', error.message);
    return null;
  }
};

module.exports = {
  readFile,
  writeFile,
};