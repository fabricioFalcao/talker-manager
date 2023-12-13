const connection = require('./connection');

const getAllFromDB = async () => {
  const talkersList = await connection.execute('SELECT * FROM talkers');
  return talkersList;
};

module.exports = getAllFromDB;