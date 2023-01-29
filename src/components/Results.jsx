import { useSelector } from 'react-redux';

const Results = () => {
  const { resultX, resultO, myTurn, xo } = useSelector(state => state.home);

  return (
    <div className="results">
      <span
        className={`result-x ${!myTurn && xo === 'X' ? 'inactive' : ''}${
          myTurn && xo === 'O' ? 'inactive' : ''
        }`}
      >
        X : {resultX}
      </span>
      <span
        className={`result-o ${myTurn && xo === 'X' ? 'inactive' : ''}${
          !myTurn && xo === 'O' ? 'inactive' : ''
        }`}
      >
        O : {resultO}
      </span>
    </div>
  );
};

export default Results;
