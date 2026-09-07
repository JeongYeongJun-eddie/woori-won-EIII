import React from 'react'

const Step3Confirm = ({ formData, selectedAccount }) => {
    // 계산 로직: 보낼 금액, 현재 잔액, 이체 후 예상 잔액 도출
    const transferAmount = Number(formData.amount) || 0;
    const currentBalance = selectedAccount?.balance || 0;
    const balanceAfterTransfer = currentBalance - transferAmount;

    return (
        <div>
            <div className="transferStep3">
                <h2>이체 정보를 확인해주세요</h2>
                <p>아래 내용으로 이체가 진행됩니다</p>

                {/* 1. 핵심 이체 금액 요약 카드 */}
                <div style={{ margin: '20px 0', padding: '16px', border: '1px solid #eee', borderRadius: '8px' }}>
                    <div style={{ fontSize: '14px', color: '#666' }}>보낼 금액</div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563eb', marginTop: '4px' }}>
                        {transferAmount.toLocaleString()}원
                    </div>
                </div>

                {/* 2. 상세 이체 정보 목록 */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* 받는 분 정보 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>받는 분</span>
                        <span style={{ fontWeight: 'bold' }}>{formData.toName}님</span>
                    </div>

                    {/* 입금 계좌 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>입금 은행/계좌</span>
                        <span>
                            {formData.toBank} {formData.toAccount}
                        </span>
                    </div>

                    {/* 출금 계좌 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ color: '#666' }}>출금 계좌</span>
                        <span>
                            {selectedAccount?.nickname || selectedAccount?.name || '내 계좌'} ({selectedAccount?.accountNo})
                        </span>
                    </div>

                    {/* 출금 후 예상 잔액 */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '1px solid #f0f0f0', paddingTop: '10px' }}>
                        <span style={{ color: '#666' }}>이체 후 잔액</span>
                        <span style={{ fontWeight: 'bold' }}>
                            {balanceAfterTransfer.toLocaleString()}원
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Step3Confirm