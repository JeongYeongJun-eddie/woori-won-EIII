import React from 'react';

const Step1AccountSelect = ({ formData, onChange }) => {
  return (
    <div>
      <div className="transferStep1">
        <h2>누구에게 보낼까요?</h2>
        <p>출금 계좌와 받는 분의 계좌 정보를 입력해주세요</p>

        {/* 1. 출금 계좌 선택 */}
        <div>
          <label>출금 계좌</label>
          <select
            value={formData.fromAccount}
            onChange={(e) => onChange('fromAccount', e.target.value)}
          >
            <option value="">계좌를 선택하세요</option>
            <option value="1002-123-123456">우리 첫급여통장 (1002-***-123456)</option>
          </select>
        </div>

        {/* 2. 받는 은행 선택 */}
        <div>
          <label>받는 은행</label>
          <select
            value={formData.toBank}
            onChange={(e) => onChange('toBank', e.target.value)}
          >
            <option value="">은행 선택</option>
            <option value="woori">우리은행</option>
            <option value="shinhan">신한은행</option>
          </select>
        </div>

        {/* 3. 계좌번호 입력 */}
        <div>
          <label>계좌번호</label>
          <input
            type="text"
            placeholder="계좌번호 입력 ('-' 제외)"
            value={formData.toAccount}
            onChange={(e) => onChange('toAccount', e.target.value)}
          />
        </div>

        {/* 계좌 조회 결과 영역 (조건부 렌더링 예정) */}
        <div>
          <div>예금주: 000님 확인됨</div>
          <div>계좌 정보를 조회할 수 없습니다.</div>
          <div>
            테스트용 등록 계좌: 1002123456789(김민준), 1002987654321(이서연), 1102555666777(박지훈)
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1AccountSelect;