const createDbRecord = async (thisModel, newRecord) => {
  if (newRecord instanceof Array) {
    return await sails.models[thisModel].createEach(newRecord).fetch();
  }

  return await sails.models[thisModel].create(newRecord).fetch();
};

const clearDb = (models) => async () => {
  await Promise.all(models.map((model) => sails.models[model].destroy({})));
};

module.exports = {
  createDbRecord,
  clearDb,
};
