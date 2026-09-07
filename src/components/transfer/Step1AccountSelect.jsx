import React, { useState, useEffect } from 'react';
import { API_ENDPOINTS } from '../../constants/api';

const Step1AccountSelect = ({ formData, onChange, accountList = [], isLoading = false }) => {
  // 자동 조회 상태 관리
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  // 은행 또는 계좌번호 변경 시 자동 예금주 조회 (디바운스 처리)
  useEffect(() => {
    const { toBank, toAccount } = formData;

    // 계좌번호가 10자리 이상이고 은행이 선택되었을 때만 동작
    if (!toBank || !toAccount || toAccount.trim().length < 10) {
      if (formData.toName) onChange('toName', '');
      setVerifyError('');
      return;
    }

    // 0.4초 동안 추가 입력이 없을 때 API 실행
    const timer = setTimeout(async () => {
      try {
        setIsVerifying(true);
        setVerifyError('');

        const query = new URLSearchParams({
          bank: toBank,
          accountNo: toAccount.trim(),
        }).toString();

        const res = await fetch(`${API_ENDPOINTS.LOOKUP}?${query}`);

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || '계좌 정보를 확인할 수 없습니다');
        }

        const data = await res.json();
        onChange('toName', data.ownerName); // 조회 성공 시 예금주 세팅
      } catch (error) {
        onChange('toName', '');
        setVerifyError(error.message);
      } finally {
        setIsVerifying(false);
      }
    }, 400);

    // 사용자가 다음 글자를 치면 이전 타이머를 취소
    return () => clearTimeout(timer);
  }, [formData.toBank, formData.toAccount]);

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
            disabled={isLoading}
          >

            {accountList.map((acc) => (
              <option key={acc.id} value={acc.id}>
                {acc.nickname || acc.name} ({acc.accountNo}) - {acc.balance.toLocaleString()}원
              </option>
            ))}
          </select>
        </div>

        {/* 2. 받는 은행 선택 */}
        <div>
          <label>받는 은행</label>
          <select
            value={formData.toBank}
            onChange={(e) => onChange('toBank', e.target.value)}
          >
            <option value="우리은행">우리은행</option>
            <option value="국민은행">국민은행</option>
            <option value="신한은행">신한은행</option>
            <option value="하나은행">하나은행</option>
            <option value="카카오뱅크">카카오뱅크</option>
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

        {/* 조회 로딩 상태 */}
        {isVerifying && <div>예금주 조회 중...</div>}

        {/* 정상 조회 완료 */}
        {!isVerifying && formData.toName && (
          <div style={{ color: 'blue', fontWeight: 'bold' }}>
            예금주: {formData.toName}님 확인됨
          </div>
        )}

        {/* 조회 실패 시에만 노출 */}
        {!isVerifying && verifyError && (
          <div style={{ color: 'red' }}>
            {verifyError}
          </div>
        )}

        {/* 테스트 계좌 안내 */}
        <div>
          테스트용 등록 계좌: 1002123456789(김민준), 1002987654321(이서연), 1102555666777(박지훈)
        </div>
      </div>
    </div>
  );
};

export default Step1AccountSelect;