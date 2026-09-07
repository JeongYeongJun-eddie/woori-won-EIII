
//여기서 selectedAccountId는 가장 처음엔 ""로 설정되어 있음
const AccountTabs = ({
  accounts,
  selectedAccountId,
  onSelectAccount,
}) => {
  return (
    <div>
      <button
      //onSelectAccount는 선택 계좌 상태 변경 함수
        onClick={() => onSelectAccount("")}
      >
        전체계좌
      </button>

      {accounts.map(account => (
        <button
          key={account.id}
          onClick={() => onSelectAccount(account.id)}
        >
          {account.nickname}
        </button>
      ))}
    </div>
  );
};

export default AccountTabs;