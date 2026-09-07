import React from 'react'

const Step3Confirm = () => {
    return (
        <div>
            {/* Step 3: 이체 확인 */}
            <div className="transferStep3">
                <h2>이체 내용을 확인해주세요</h2>
                <div>
                    <span>받는 분</span>
                    <span>우리은행</span>
                </div>
                <div>
                    <span>계좌번호</span>
                    <span>1002123456789</span>
                </div>
                <div>
                    <span>예금주</span>
                    <span>000</span>
                </div>
                <div>
                    <span>출금 계좌</span>
                    <span>우리 첫급여통장 (1002-***-123456)</span>
                </div>
                <div>
                    <span>이체 금액</span>
                    <span>10,000원</span>
                </div>
            </div>
        </div>
    )
}

export default Step3Confirm