import { useEffect, useState } from "react";

const API_URL = "http://localhost:4000/api";

const TransactionModal = ({
  transactionId,
  accounts,
  onClose,
}) => {
  const [transaction, setTransaction] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("모달 렌더링 transactionId:", transactionId);

    fetch(`${API_URL}/transactions/${transactionId}`)
      .then(response => {
        console.log("상세 API 응답 상태:", response.status);

        if (!response.ok) {
          throw new Error("거래 상세 조회 실패");
        }

        return response.json();
      })
      .then(data => {
        console.log("상세 데이터:", data);
        setTransaction(data);
      })
      .catch(error => {
        console.error("상세 API 에러:", error);
        setError(error.message);
      });

  }, [transactionId]);

  const account = transaction
    ? accounts.find(
        account => account.id === transaction.accountId
      )
    : null;

  const isDeposit =
    transaction?.type === "in";

  const statusText =
    transaction?.status === "done"
      ? "완료"
      : "처리중";

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
    >
      <div
        className="modal-content"
        onClick={event => event.stopPropagation()}
      >
        {!transaction && !error && (
          <p>거래 상세 조회 중...</p>
        )}

        {error && (
          <p>{error}</p>
        )}

        {transaction && (
          <>
            <h2>{transaction.desc}</h2>

            <h1>
              {isDeposit ? "+" : "-"}
              {transaction.amount.toLocaleString()}원
            </h1>

            <div>
              <span>거래일시</span>
              <strong>
                {transaction.date} {transaction.time}
              </strong>
            </div>

            <div>
              <span>거래계좌</span>
              <strong>
                {account?.nickname}
                {" "}
                ({account?.accountNo})
              </strong>
            </div>

            <div>
              <span>거래 후 잔액</span>
              <strong>
                {transaction.balanceAfter.toLocaleString()}원
              </strong>
            </div>

            <div>
              <span>상태</span>
              <strong>{statusText}</strong>
            </div>

            <button>
              이체확인증 저장
            </button>

            <button onClick={onClose}>
              닫기
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default TransactionModal;