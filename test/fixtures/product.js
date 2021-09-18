const getRecord = (overrides = {}, qty = 1) => {
  const records = _.times(qty, () => {
    const {
      name = chance.word(),
      slug = chance.guid(),
      id = chance.guid(),
    } = overrides;

    return {
      name,
      slug,
      id,
    };
  });

  if (qty === 1) {
    return records[0];
  }
  return records;
};

module.exports = {
  getRecord
};
