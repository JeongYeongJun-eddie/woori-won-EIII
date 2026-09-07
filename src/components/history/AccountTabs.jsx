const AccountTabs = ({
  accounts,
  selectedAccountId,
  onSelectAccount,
}) => {
  return (
    <div>
      <button
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