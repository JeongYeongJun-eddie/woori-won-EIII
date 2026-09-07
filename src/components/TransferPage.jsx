import { useState } from 'react';
import Step1AccountSelect from "./transfer/Step1AccountSelect";
import Step2AmountInput from "./transfer/Step2AmountInput";
import Step3Confirm from "./transfer/Step3Confirm";
import Step4Result from "./transfer/Step4Result";
import TransferBottomNav from "./transfer/TransferBottomNav";

export default function TransferPage({ onFinishHome }) {
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    fromAccount: '',     // 출금 계좌
    toBank: '',          // 받는 은행
    toAccount: '',       // 받는 계좌번호
    toName: '',          // 예금주명
    amount: '',          // 이체 금액
  });

  const updateFormData = (key, value) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handlePrev = () => setStep((prev) => prev - 1);

  // 1. 임시 이체 실행 함수 (추후 실제 fetch/POST API 연동 자리)
  const handleTransferSubmit = () => {
    // API 통신 성공 가정 후 4단계로 이동
    setStep(4);
  };

  // 2. 단계별 다음 버튼 활성화 검증
  const isStep1Valid = Boolean(formData.fromAccount && formData.toBank && formData.toAccount);
  const isStep2Valid = Number(formData.amount) >= 1000;
  const isStep3Valid = true; // 확인 화면은 기본 활성화

  const isNextDisabled =
    (step === 1 && !isStep1Valid) ||
    (step === 2 && !isStep2Valid) ||
    (step === 3 && !isStep3Valid);

  return (
    <div className="pb-24">
      <main>
        {step === 1 && <Step1AccountSelect formData={formData} onChange={updateFormData} />}
        {step === 2 && <Step2AmountInput formData={formData} onChange={updateFormData} />}
        {step === 3 && <Step3Confirm formData={formData} />}
        {step === 4 && <Step4Result formData={formData} />}
      </main>

      <TransferBottomNav
        step={step}
        isNextDisabled={isNextDisabled}
        onPrev={handlePrev}
        onNext={() => {
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