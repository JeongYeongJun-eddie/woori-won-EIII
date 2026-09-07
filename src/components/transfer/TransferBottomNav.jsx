import React from 'react';

export default function TransferBottomNav({
  step,
  onPrev,
  onNext,
  onFinish,
  isNextDisabled = false,
}) {
  return (
    <div className="transfer-bottom-nav col">
      {/* 1단계: '다음' 버튼 하나만 노출 */}
      {step === 1 && (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="btn-nav-primary"
        >
          다음
        </button>
      )}

      {/* 2~3단계: [다음 / 이체하기] 위에, [이전으로] 아래에 배치 */}
      {(step === 2 || step === 3) && (
        <>
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className="btn-nav-primary"
          >
            {step === 3 ? '이체하기' : '다음'}
          </button>
          <button
            type="button"
            onClick={onPrev}
            className="btn-nav-outline"
          >
            이전으로
          </button>
        </>
      )}

      {/* 4단계: 완료 화면 */}
      {step === 4 && (
        <button
          type="button"
          onClick={onFinish}
          className="btn-nav-primary"
        >
          홈으로
        </button>
      )}
    </div>
  );
}