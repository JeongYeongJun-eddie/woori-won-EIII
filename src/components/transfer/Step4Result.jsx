import React from 'react';

const Step4Result = ({ formData, selectedAccount, transferResult }) => {
    // 1. 서버 응답 결과 데이터 가공
    // 백엔드(POST /api/transfers)가 생성해 내려준 트랜잭션 상세 객체 추출
    const transaction = transferResult?.transaction;

    // 실제 이체된 금액 (서버 트랜잭션 응답값 우선, 없으면 폼 입력값 활용)
    const transferAmount = transaction?.amount || Number(formData.amount) || 0;

    // 이체 후 최종 잔액 (서버가 계산해 내려준 balanceAfter 우선, 없으면 직전 잔액 - 이체금액)
    const balanceAfter = transaction?.balanceAfter ?? (selectedAccount?.balance - transferAmount);

    return (
        <div>
            <div className="transferStep4">
                {/* 1. 이체 완료 상태 안내 (체크 아이콘 & 헤더 메시지) */}
                <div style={{ fontSize: '48px', color: '#16a34a', margin: '20px 0' }}>
                    ✓
                </div>

                <h2>이체가 완료되었습니다</h2>
                <p>
                    {selectedAccount?.nickname || '출금 계좌'}에서 {formData.toName}님께{' '}
                    <strong>{transferAmount.toLocaleString()}원</strong>을 보냈습니다
                </p>

                {/* 2. 상세 거래 내역 영수증 카드 */}
                <div
                    style={{
                        marginTop: '24px',
                        padding: '16px',
                        backgroundColor: '#f8fafc',
                        borderRadius: '8px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '10px',
                        textAlign: 'left',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>받는 분</span>
                        <span style={{ fontWeight: '600' }}>
                            {formData.toBank} {formData.toAccount} ({formData.toName})
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>보낸 금액</span>
                        <span style={{ fontWeight: 'bold', color: '#2563eb' }}>
                            {transferAmount.toLocaleString()}원
                        </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#64748b' }}>출금 후 잔액</span>
                        <span style={{ fontWeight: '600' }}>
                            {balanceAfter.toLocaleString()}원
                        </span>
                    </div>

                    {/* 서버가 응답한 거래 승인 날짜 및 시간 (존재할 때만 렌더링) */}
                    {transaction?.date && (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <span style={{ color: '#64748b' }}>거래 일시</span>
                            <span>
                                {transaction.date} {transaction.time}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step4Result;