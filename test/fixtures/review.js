const getRecord = (overrides = {}, qty = 1) => {
  const records = _.times(qty, () => {
    const {
      text = chance.sentence(),
      rating = chance.natural({ min: 1, max: 5 }),
      product = chance.natural(),
      id = chance.guid(),
    } = overrides;

    return {
      text,
      rating,
      product,
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
