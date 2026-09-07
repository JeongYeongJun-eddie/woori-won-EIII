import React from 'react';

export default function TransferBottomNav({
  step,
  onPrev,
  onNext,
  onFinish,
  isNextDisabled = false,
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto p-4 bg-white border-t flex gap-2">
      {/* 1단계: 이전 버튼 없이 '다음'만 전체 너비로 노출 */}
      {step === 1 && (
        <button
          type="button"
          onClick={onNext}
          disabled={isNextDisabled}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg disabled:bg-gray-300"
        >
          다음
        </button>
      )}

      {/* 2~3단계: [이전]과 [다음 / 이체하기] 2개 버튼 배치 */}
      {(step === 2 || step === 3) && (
        <>
          <button
            type="button"
            onClick={onPrev}
            className="flex-1 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg"
          >
            이전
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={isNextDisabled}
            className="flex-[2] py-3 bg-blue-600 text-white font-bold rounded-lg disabled:bg-gray-300"
          >
            {step === 3 ? '이체하기' : '다음'}
          </button>
        </>
      )}

      {/* 4단계: 완료 화면 전용 '홈으로' 버튼 */}
      {step === 4 && (
        <button
          type="button"
          onClick={onFinish}
          className="w-full py-3 bg-blue-600 text-white font-bold rounded-lg"
        >
          홈으로
        </button>
      )}
    </div>
  );
}