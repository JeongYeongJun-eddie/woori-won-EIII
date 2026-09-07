const TransactionModal = ({
  transactionId,
  transactions,
  accounts,
  onClose,
}) => {

  const transaction = transactions.find(
    tx => tx.id === transactionId
  );

  if (!transaction) {
    return null;
  }

  const account = accounts.find(
    account =>
      account.id === transaction.accountId
  );

  const isDeposit =
    transaction.type === "in";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >

      <div
        className="transaction-modal"
        onClick={event =>
          event.stopPropagation()
        }
      >

        <div className="modal-handle" />

        <h2 className="modal-title">
          {transaction.title}
        </h2>

        <div
          className={
            isDeposit
              ? "modal-amount deposit"
              : "modal-amount withdraw"
          }
        >
          {isDeposit ? "+" : "-"}
          {Math.abs(
            transaction.amount
          ).toLocaleString()}원
        </div>

        <div className="modal-details">

          <div className="modal-row">
            <span>거래일시</span>

            <strong>
              {transaction.date}{" "}
              {transaction.time}
            </strong>
          </div>

          <div className="modal-row">
            <span>거래계좌</span>

            <strong>
              {account?.nickname}
              {account?.accountNumber &&
                ` (${account.accountNumber})`}
            </strong>
          </div>

          <div className="modal-row">
            <span>거래 후 잔액</span>

            <strong>
              {transaction.balance !== undefined
                ? `${transaction.balance.toLocaleString()}원`
                : "-"}
            </strong>
          </div>

          <div className="modal-row">
            <span>상태</span>

            <strong>
              {transaction.status === "processing"
                ? "처리중"
                : "완료"}
            </strong>
          </div>

        </div>

        <button className="receipt-btn">
          이체확인증 저장
        </button>

        <button
          className="modal-close-btn"
          onClick={onClose}
        >
          닫기
        </button>

      </div>

    </div>
  );
};

export default TransactionModal;