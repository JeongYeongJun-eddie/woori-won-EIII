import React from 'react';

const Step2AmountInput = ({ formData, onChange }) => {
  // 계좌 잔액 (실제 API 연동 전 임시 기준 금액)
  const maxBalance = 2324560;
  const currentAmount = Number(formData.amount) || 0;

  // 빠른 금액 버튼 핸들러
  const handleAddAmount = (addValue) => {
    const nextAmount = currentAmount + addValue;
    onChange('amount', String(nextAmount));
  };

  // '전액' 버튼 핸들러
  const handleSetMaxAmount = () => {
    onChange('amount', String(maxBalance));
  };

  return (
    <div>
      <div className="transferStep2">
        <h2>얼마를 보낼까요?</h2>
        <p>
          우리 첫급여통장 잔액 {maxBalance.toLocaleString()}원 중에서 보냅니다
        </p>

        <div>
          {/* 1. 금액 입력창 */}
          <input
            type="number"
            placeholder="보낼 금액 입력"
            value={formData.amount}
            onChange={(e) => onChange('amount', e.target.value)}
          />

          {/* 2. 유효성 검사 안내 문구 */}
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

          {/* 3. 빠른 금액 추가 버튼 */}
          <div>
            <button type="button" onClick={() => handleAddAmount(10000)}>
              +1만
            </button>
            <button type="button" onClick={() => handleAddAmount(50000)}>
              +5만
            </button>
            <button type="button" onClick={() => handleAddAmount(100000)}>
              +10만
            </button>
            <button type="button" onClick={handleSetMaxAmount}>
              전액
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2AmountInput;