import { useState } from "react";

const TransactionModal = ({
  transactionId,
  transactions,
  accounts,
  onClose,
}) => {
  const [showReceiptToast, setShowReceiptToast] = useState(false);

  const transaction = transactions.find(
    tx => tx.id === transactionId
  );

  if (!transaction) {
    return null;
  }

  const account = accounts.find(
    account => account.id === transaction.accountId
  );

  const isDeposit = transaction.type === "in";

  // title / desc 둘 중 존재하는 값 사용
  const transactionTitle =
    transaction.title ?? transaction.desc;

  // accountNumber / accountNo 둘 중 존재하는 값 사용
  const accountNumber =
    account?.accountNumber ?? account?.accountNo;

  // 이체확인증 저장 버튼 클릭
  const handleReceiptSave = () => {
    setShowReceiptToast(true);

    setTimeout(() => {
      setShowReceiptToast(false);
    }, 2000);
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="transaction-modal"
        onClick={(event) => event.stopPropagation()}
      >
        {/* 상단 손잡이 */}
        <div className="modal-handle" />

        {/* 거래명 */}
        <h2 className="modal-title">
          {transactionTitle}
        </h2>

        {/* 거래 금액 */}
        <div
          className={
            isDeposit
              ? "modal-amount deposit"
              : "modal-amount withdraw"
          }
        >
          {isDeposit ? "+" : "-"}
          {Math.abs(transaction.amount).toLocaleString()}원
        </div>

        {/* 거래 상세정보 */}
        <div className="modal-details">

          <div className="modal-row">
            <span>거래일시</span>

            <strong>
              {transaction.date} {transaction.time}
            </strong>
          </div>

          <div className="modal-row">
            <span>거래계좌</span>

            <strong>
              {account?.nickname}
              {accountNumber &&
                ` (${accountNumber})`}
            </strong>
          </div>

          <div className="modal-row">
            <span>거래 후 잔액</span>

            <strong>
              {transaction.balanceAfter !== undefined
                ? `${transaction.balanceAfter.toLocaleString()}원`
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

        {/* 이체확인증 저장 */}
        <div className="receipt-area">

          <button
            type="button"
            className="receipt-btn"
            onClick={handleReceiptSave}
          >
            이체확인증 저장
          </button>

          {showReceiptToast && (
            <div className="receipt-toast">
              이체확인증 저장이 시작됩니다 (더미 동작)
            </div>
          )}

        </div>

        {/* 닫기 */}
        <button
          type="button"
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