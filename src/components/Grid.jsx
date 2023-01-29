import Cell from './Cell';

const Grid = ({ grid, onClick }) => {
  return (
    <div className="grid">
      {grid.map((value, ind) => (
        <Cell
          value={value}
          onClick={() => value === '' && onClick(ind)}
          key={ind}
        />
      ))}
    </div>
  );
};

export default Grid;
