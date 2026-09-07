import React from 'react';

const Step4Result = ({ formData, selectedAccount }) => {
    const amount = Number(formData.amount) || 0;
    const fromName = selectedAccount?.nickname || selectedAccount?.name || '출금 계좌';

    return (
        <div className="step4-container">
            {/* 초록색 원형 체크 아이콘 */}
            <div className="result-check-circle">
                <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#14875a"
                    strokeWidth="2.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="20 6 9 17 4 12" />
                </svg>
            </div>

            {/* 완료 메시지 타이틀 */}
            <h2 className="result-title">이체가 완료되었습니다</h2>

            {/* 안내 서브 텍스트 */}
            <p className="result-desc">
                {fromName}에서 {formData.toName}님께 {amount.toLocaleString()}원을 보냈습니다
            </p>
        </div>
    );
};

export default Step4Result;