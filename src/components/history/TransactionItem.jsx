const TransactionItem = ({
  transaction,
  account,
  onClick,
}) => {
  const isDeposit = transaction.type === "in";

  const statusText =
    transaction.status === "done"
      ? "완료"
      : "처리중";

  return (
    <div
      onClick={onClick}
      className="transaction-item"
    >
      <div>
        <strong>
          {transaction.desc}
        </strong>

        <p>
          {transaction.time}
          {" · "}
          {account?.nickname}
          {" · "}
          {statusText}
        </p>
      </div>

      <div>
        <strong>
          {isDeposit ? "+" : "-"}
          {transaction.amount.toLocaleString()}원
        </strong>

        <p>
          잔액 {transaction.balanceAfter.toLocaleString()}원
        </p>
      </div>
    </div>
  );
};

export default TransactionItem;