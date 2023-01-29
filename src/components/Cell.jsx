const Cell = ({ value, onClick }) => {
  return (
    <button
      className={value === 'X' ? 'x' : value === 'O' ? 'o' : 'cell'}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Cell;
