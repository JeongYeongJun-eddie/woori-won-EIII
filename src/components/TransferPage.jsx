import { useState, useEffect } from 'react';
import Step1AccountSelect from "./transfer/Step1AccountSelect";
import Step2AmountInput from "./transfer/Step2AmountInput";
import Step3Confirm from "./transfer/Step3Confirm";
import Step4Result from "./transfer/Step4Result";
import TransferBottomNav from "./transfer/TransferBottomNav";
import { API_ENDPOINTS } from '../constants/api';

export default function TransferPage({ onFinishHome }) {
    // 1. 단계 제어 상태 (1: 계좌선택, 2: 금액입력, 3: 이체확인, 4: 이체완료)
    const [step, setStep] = useState(1);

    // 2. 전체 출금 계좌 목록 및 로딩 상태
    const [accountList, setAccountList] = useState([]);
    const [isAccountsLoading, setIsAccountsLoading] = useState(false);

    // 3. 이체 요청 진행 여부(로딩) 및 서버 응답 영수증 결과 데이터 상태
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [transferResult, setTransferResult] = useState(null);

    // 4. 이체 프로세스 전체를 관통하는 단일 진실 공급원(Single Source of Truth)
    const [formData, setFormData] = useState({
        fromAccount: '',     // 출금 계좌 ID
        toBank: '우리은행',   // 받는 은행
        toAccount: '',       // 받는 계좌번호
        toName: '',          // 예금주명
        amount: '',          // 이체 금액
    });

    // 컴포넌트 마운트 시 전체 출금 계좌 목록 조회
    useEffect(() => {
        const fetchAccounts = async () => {
            try {
                setIsAccountsLoading(true);
                const res = await fetch(API_ENDPOINTS.ACCOUNTS);
                if (!res.ok) throw new Error('계좌 목록 조회 실패');
                const data = await res.json();
                setAccountList(data);

                // 목록이 존재하면 첫 번째 계좌를 기본 출금 계좌로 자동 선택
                if (data.length > 0) {
                    setFormData((prev) => ({ ...prev, fromAccount: data[0].id }));
                }
            } catch (error) {
                console.error('계좌 조회 에러:', error);
            } finally {
                setIsAccountsLoading(false);
            }
        };

        fetchAccounts();
    }, []);

    // 자식 컴포넌트들의 입력값 변경 핸들러
    const updateFormData = (key, value) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // 단계 이동 제어 함수
    const handleNext = () => setStep((prev) => prev + 1);
    const handlePrev = () => setStep((prev) => prev - 1);

    // 현재 선택된 출금 계좌 객체 탐색 및 현재 잔액 도출
    const selectedAccount = accountList.find((acc) => acc.id === formData.fromAccount);
    const currentBalance = selectedAccount?.balance || 0;

    // 최종 이체 실행 요청
    const handleTransferSubmit = async () => {
        try {
            setIsSubmitting(true);

            // 백엔드 명세에 맞춰 Payload 조립
            const payload = {
                fromAccountId: formData.fromAccount,
                toBank: formData.toBank,
                toAccountNo: formData.toAccount,
                toOwnerName: formData.toName,
                amount: Number(formData.amount),
            };

            const res = await fetch(API_ENDPOINTS.TRANSFERS, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || '이체 처리에 실패했습니다.');
            }

            // 서버 응답 데이터({ transaction, account }) 저장 후 완료 화면(Step 4)으로 이동
            const data = await res.json();
            setTransferResult(data);
            setStep(4); // 성공 시 4단계로 이동
        } catch (error) {
            alert(`이체 실패: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };


    // 단계별 '다음'/'이체하기' 버튼 활성화 유효성 검사
    // Step 1: 출금 계좌, 받는 은행, 계좌번호, 예금주 조회가 모두 완료되어야 함
    const isStep1Valid = Boolean(
        formData.fromAccount &&
        formData.toBank &&
        formData.toAccount &&
        formData.toName
    );

    // Step 2: 1,000원 이상이고 출금 계좌의 잔액을 초과하지 않아야 함
    const isStep2Valid = Number(formData.amount) >= 1000 && Number(formData.amount) <= currentBalance;

    // Step 3: 정보 확인 화면이므로 기본 활성화
    const isStep3Valid = true;

    // 버튼 비활성화 플래그
    const isNextDisabled =
        (step === 1 && !isStep1Valid) ||
        (step === 2 && !isStep2Valid) ||
        (step === 3 && !isStep3Valid);

    return (
        <div className="pb-24">
            <main>
                {step === 1 && (
                    <Step1AccountSelect
                        formData={formData}
                        onChange={updateFormData}
                        accountList={accountList}
                        isLoading={isAccountsLoading}
                    />
                )}
                {step === 2 && (
                    <Step2AmountInput
                        formData={formData}
                        onChange={updateFormData}
                        selectedAccount={selectedAccount}
                    />
                )}
                {step === 3 && <Step3Confirm formData={formData} selectedAccount={selectedAccount} />}
                {step === 4 && (
                    <Step4Result
                        formData={formData}
                        selectedAccount={selectedAccount}
                        transferResult={transferResult}
                    />
                )}
            </main>

            {/* 하단 고정 네비게이션 바 (스텝 이동 및 최종 제출 통제) */}
            <TransferBottomNav
                step={step}
                isNextDisabled={isNextDisabled}
                isSubmitting={isSubmitting}
                onPrev={handlePrev}
                onNext={() => {
                    // 3단계에서는 다음 단계 이동 대신 API 통신(이체)을 실행
                    if (step === 3) {
                        handleTransferSubmit();
                    } else {
                        handleNext();
                    }
                }}
                onFinish={onFinishHome}
            />
        </div>
    );
}