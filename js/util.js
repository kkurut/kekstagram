const getRandom = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateUniqueId = (usedIds, min, max) => {
  let id;
  do {
    id = getRandom(min, max);
  } while (usedIds.has(id));
  usedIds.add(id);
  return id;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { getRandom, isEscapeKey, generateUniqueId };
