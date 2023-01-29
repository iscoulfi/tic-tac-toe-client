const random = () => {
  return Array.from(Array(4), () =>
    Math.floor(Math.random() * 36).toString(36)
  ).join('');
};

export default random;
