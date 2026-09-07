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
        account =>
            account.id === transaction.accountId
    );

    const isDeposit =
        transaction.type === "in";

    // 이체확인증 저장 버튼 클릭
    const handleReceiptSave = () => {
        setShowReceiptToast(true);

        // 2초 후 팝업 자동 제거
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

                {/* 이체확인증 저장 버튼 + 팝업 */}
                <div className="receipt-area">

                    <button
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