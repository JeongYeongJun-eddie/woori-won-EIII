const TransactionFilter = ({
  selectedType,
  onSelectType,
}) => {
  return (
    <div className="transaction-filter">

      <button
        className={
          selectedType === ""
            ? "filter-btn active"
            : "filter-btn"
        }
        onClick={() => onSelectType("")}
      >
        전체
      </button>

      <button
        className={
          selectedType === "in"
            ? "filter-btn active"
            : "filter-btn"
        }
        onClick={() => onSelectType("in")}
      >
        입금
      </button>

      <button
        className={
          selectedType === "out"
            ? "filter-btn active"
            : "filter-btn"
        }
        onClick={() => onSelectType("out")}
      >
        출금
      </button>

    </div>
  );
};

export default TransactionFilter;