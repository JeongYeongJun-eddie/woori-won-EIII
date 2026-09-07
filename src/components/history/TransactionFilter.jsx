const TransactionFilter = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div>
      <button
        onClick={() => onSelectType("")}
      >
        전체
      </button>

      <button
        onClick={() => onSelectType("in")}
      >
        입금
      </button>

      <button
        onClick={() => onSelectType("out")}
      >
        출금
      </button>
    </div>
  );
};

export default TransactionFilter;