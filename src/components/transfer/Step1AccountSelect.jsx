import React, { useState, useEffect } from 'react';
import { lookupOwner } from '../../constants/api';

const Step1AccountSelect = ({ formData, onChange, accountList = [], isLoading = false, onNext }) => {
  const [isVerifying, setIsVerifying] = useState(false);
  const [verifyError, setVerifyError] = useState('');

  // 유효성 체크 (모든 항목이 입력되었는지)
  const isValid = Boolean(
    formData.fromAccount &&
    formData.toBank &&
    formData.toAccount &&
    formData.toName
  );

  useEffect(() => {
    const { toBank, toAccount } = formData;

    if (!toBank || !toAccount || toAccount.trim().length < 10) {
      if (formData.toName) onChange('toName', '');
      setVerifyError('');
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setIsVerifying(true);
        setVerifyError('');

        // 👈 raw fetch 대신 lookupOwner 호출 (API_BASE 자동 결합 및 JSON 파싱 완료)
        const data = await lookupOwner({
          bank: toBank,
          accountNo: toAccount.trim(),
        });

        onChange('toName', data.ownerName);
      } catch (error) {
        onChange('toName', '');
        setVerifyError(error.message);
      } finally {
        setIsVerifying(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [formData.toBank, formData.toAccount]);

  return (
    <div className="step1-container">
      {/* 타이틀 헤더 */}
      <header className="transfer-header">
        <h2>누구에게 보낼까요?</h2>
        <p>출금 계좌와 받는 분의 계좌 정보를 입력해주세요</p>
      </header>

      {/* 출금 계좌 선택 */}
      <div className="form-group">
        <label>출금 계좌</label>
        <select
          className="transfer-select"
          value={formData.fromAccount}
          onChange={(e) => onChange('fromAccount', e.target.value)}
          disabled={isLoading}
        >
          {accountList.map((acc) => (
            <option key={acc.id} value={acc.id}>
              {acc.nickname || acc.name} ({acc.balance?.toLocaleString()}원)
            </option>
          ))}
        </select>
      </div>

      {/* 받는 은행 선택 */}
      <div className="form-group">
        <label>받는 은행</label>
        <select
          className="transfer-select"
          value={formData.toBank}
          onChange={(e) => onChange('toBank', e.target.value)}
        >
          <option value="WOORI">우리은행</option>
          <option value="KOOKMIN">국민은행</option>
          <option value="SHINHAN">신한은행</option>
          <option value="HANA">하나은행</option>
          <option value="KAKAO">카카오뱅크</option>
        </select>
      </div>

      {/* 계좌번호 입력 */}
      <div className="form-group">
        <label>계좌번호</label>
        <input
          className="transfer-input"
          type="text"
          placeholder="- 없이 숫자만 입력 (예: 1002123456789)"
          value={formData.toAccount}
          onChange={(e) => onChange('toAccount', e.target.value)}
        />

        {/* 상태 피드백 */}
        <div className="feedback-box">
          {isVerifying && <span className="feedback-msg info">예금주 조회 중...</span>}
          {!isVerifying && formData.toName && (
            <span className="feedback-msg success">✓ 예금주 {formData.toName}님 확인됨</span>
          )}
          {!isVerifying && verifyError && (
            <span className="feedback-msg error">{verifyError}</span>
          )}
        </div>
      </div>

      {/* 테스트 계좌 안내 */}
      <div className="test-hint-card">
        테스트용 등록 계좌: <code>1002123456789</code> (김민준), <code>1002987654321</code> (이서연), <code>1102555666777</code> (박지훈)
      </div>
    </div>
  );
};

export default Step1AccountSelect;