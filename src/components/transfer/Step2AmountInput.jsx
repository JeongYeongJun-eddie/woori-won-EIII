import React from 'react';

const Step2AmountInput = ({ formData, onChange, selectedAccount }) => {
    // 1. 기준 잔액 및 현재 입력된 금액 계산
    // 부모로부터 넘겨받은 선택 계좌 객체에서 잔액을 추출 (없을 시 기본값 0)
    const maxBalance = selectedAccount?.balance || 0;

    // 문자열 형태로 관리되는 입력값을 수치 비교 및 연산을 위해 숫자로 변환
    const currentAmount = Number(formData.amount) || 0;


    // 2. 빠른 금액 추가 핸들러 (+1만, +5만, +10만)
    // 현재 입력된 금액에 클릭한 금액(addValue)을 합산하여 부모 formData에 문자열로 반영
    const handleAddAmount = (addValue) => {
        onChange('amount', String(currentAmount + addValue));
    };

    // 3. 잔액 전액 입력 핸들러
    // 현재 계좌의 최대 잔액(maxBalance)으로 금액을 한 번에 채움
    const handleSetMaxAmount = () => {
        onChange('amount', String(maxBalance));
    };

    return (
        <div className="transferStep2">
            <h2>얼마를 보낼까요?</h2>
            <p>
                {selectedAccount?.nickname || '출금 계좌'} 잔액 {maxBalance.toLocaleString()}원 중에서 보냅니다
            </p>

            <div>
                <input
                    type="number"
                    placeholder="보낼 금액 입력"
                    value={formData.amount}
                    onChange={(e) => onChange('amount', e.target.value)}
                />

                <div>
                    {currentAmount > maxBalance && (
                        <div style={{ color: 'red' }}>
                            잔액({maxBalance.toLocaleString()}원)을 초과했습니다.
                        </div>
                    )}
                    {currentAmount > 0 && currentAmount < 1000 && (
                        <div style={{ color: 'red' }}>최소 이체 금액은 1,000원입니다.</div>
                    )}
                    {currentAmount >= 1000 && currentAmount <= maxBalance && (
                        <div>{currentAmount.toLocaleString()}원 이체 가능합니다.</div>
                    )}
                </div>

                <div>
                    <button type="button" onClick={() => handleAddAmount(10000)}>+1만</button>
                    <button type="button" onClick={() => handleAddAmount(50000)}>+5만</button>
                    <button type="button" onClick={() => handleAddAmount(100000)}>+10만</button>
                    <button type="button" onClick={handleSetMaxAmount}>전액</button>
                </div>
            </div>
        </div>
    );
};

export default Step2AmountInput;