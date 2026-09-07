import React from 'react';

// 계좌번호 마스킹 유틸 함수 (예: 1002-***-123456)
function maskAccountNo(accountNo = '') {
    const clean = accountNo.replace(/[^0-9]/g, '');
    if (clean.length < 8) return accountNo;
    const start = clean.slice(0, 4);
    const end = clean.slice(-6);
    return `${start}-***-${end}`;
}

const Step3Confirm = ({ formData, selectedAccount }) => {
    const transferAmount = Number(formData.amount) || 0;
    const maskedAcc = selectedAccount?.accountNo
        ? maskAccountNo(selectedAccount.accountNo)
        : '';

    return (
        <div className="step3-container">
            {/* 1. 상단 타이틀 */}
            <header className="transfer-header">
                <h2>이체 내용을 확인해주세요</h2>
            </header>

            {/* 2. 확인 영수증 카드 */}
            <div className="confirm-summary-card">
                <div className="confirm-row">
                    <span className="confirm-label">받는 분</span>
                    <span className="confirm-value">{formData.toBank}</span>
                </div>

                <div className="confirm-row">
                    <span className="confirm-label">계좌번호</span>
                    <span className="confirm-value font-mono">{formData.toAccount}</span>
                </div>

                <div className="confirm-row">
                    <span className="confirm-label">예금주</span>
                    <span className="confirm-value">{formData.toName}</span>
                </div>

                <div className="confirm-row">
                    <span className="confirm-label">출금 계좌</span>
                    <span className="confirm-value">
                        {selectedAccount?.nickname || selectedAccount?.name} ({maskedAcc})
                    </span>
                </div>

                {/* 중간 점선 구분선 */}
                <div className="confirm-divider" />

                {/* 최종 이체 금액 */}
                <div className="confirm-row total">
                    <span className="confirm-label">이체 금액</span>
                    <span className="confirm-value amount">
                        {transferAmount.toLocaleString()}원
                    </span>
                </div>
            </div>
        </div>
    );
};

export default Step3Confirm;