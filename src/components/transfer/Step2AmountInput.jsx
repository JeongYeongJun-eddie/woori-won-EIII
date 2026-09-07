import React, { useRef } from 'react';

const Step2AmountInput = ({ formData, onChange, selectedAccount }) => {
    const inputRef = useRef(null);
    const maxBalance = selectedAccount?.balance || 0;
    const currentAmount = Number(formData.amount) || 0;

    // 빠른 금액 추가
    const handleAddAmount = (addValue) => {
        onChange('amount', String(currentAmount + addValue));
    };

    // '직접입력' 클릭 시 인풋 포커스 (또는 초기화 후 포커스)
    const handleDirectInput = () => {
        inputRef.current?.focus();
    };

    return (
        <div className="step2-container">
            {/* 1. 헤더 안내 문구 */}
            <header className="transfer-header">
                <h2>얼마를 보낼까요?</h2>
                <p>
                    {selectedAccount?.nickname || '출금 계좌'} 잔액 {maxBalance.toLocaleString()}원 중에서 보냅니다
                </p>
            </header>

            {/* 2. 우측 정렬 대형 금액 입력창 */}
            <div className="amount-input-box">
                <input
                    ref={inputRef}
                    type="number"
                    className="amount-number-input"
                    placeholder="0"
                    value={formData.amount}
                    onChange={(e) => onChange('amount', e.target.value)}
                />
            </div>

            {/* 실시간 유효성 피드백 영역 */}
            <div className="feedback-box">
                {currentAmount > maxBalance && (
                    <span className="feedback-msg error">
                        잔액({maxBalance.toLocaleString()}원)을 초과했습니다.
                    </span>
                )}
                {currentAmount > 0 && currentAmount < 1000 && (
                    <span className="feedback-msg error">
                        최소 이체 금액은 1,000원입니다.
                    </span>
                )}
                {currentAmount >= 1000 && currentAmount <= maxBalance && (
                    <span className="feedback-msg success">
                        {currentAmount.toLocaleString()}원 이체 가능합니다
                    </span>
                )}
            </div>

            {/* 3. 금액 퀵 버튼 리스트 (+1만, +5만, +10만, 직접입력) */}
            <div className="amount-chip-group">
                <button type="button" onClick={() => handleAddAmount(10000)}>+1만</button>
                <button type="button" onClick={() => handleAddAmount(50000)}>+5만</button>
                <button type="button" onClick={() => handleAddAmount(100000)}>+10만</button>
                <button type="button" onClick={handleDirectInput}>직접입력</button>
            </div>
        </div>
    );
};

export default Step2AmountInput;