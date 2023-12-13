const dbDataFormat = (data) => data
  .map(({ name, age, id, talk_watched_at: watchedAt, talk_rate: rate }) => ({
    name,
    age,
    id,
    talk: { watchedAt, rate },
  }));

module.exports = dbDataFormat;
