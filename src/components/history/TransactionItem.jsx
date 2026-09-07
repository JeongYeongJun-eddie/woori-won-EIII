const TransactionItem = ({
  transaction,
  account,
  onClick,
}) => {

  const isDeposit = transaction.type === "in";

  return (
    <div
      className="transaction-item"
      onClick={onClick}
    >

      <div
        className={
          isDeposit
            ? "transaction-icon deposit"
            : "transaction-icon withdraw"
        }
      >
        {isDeposit ? "⬇️" : "⬆️"}
      </div>

      <div className="transaction-info">

        <div className="transaction-title">
          {transaction.desc}
        </div>

        <div className="transaction-sub">

          <span>
            {transaction.time}
            {account?.nickname &&
              ` · ${account.nickname}`}
          </span>

          <span
            className={
              transaction.status === "processing"
                ? "transaction-status processing"
                : "transaction-status"
            }
          >
            {transaction.status === "processing"
              ? "처리중"
              : "완료"}
          </span>

        </div>

      </div>

      <div className="transaction-money">

        <strong
          className={
            isDeposit
              ? "amount deposit"
              : "amount withdraw"
          }
        >
          {isDeposit ? "+" : "-"}
          {Math.abs(transaction.amount).toLocaleString()}원
        </strong>

         <span className="balance">
          잔액{" "}
          {transaction.balanceAfter !== undefined
            ? transaction.balanceAfter.toLocaleString()
            : "0"}
          원
        </span>


      </div>

    </div>
  );
};

export default TransactionItem;