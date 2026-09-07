const AccountTabs = ({
  accounts,
  selectedAccountId,
  onSelectAccount,
}) => {
  return (
    <div className="account-tabs">

      <button
        className={
          selectedAccountId === ""
            ? "account-tab active"
            : "account-tab"
        }
        onClick={() => onSelectAccount("")}
      >
        전체계좌
      </button>

      {accounts.map(account => (
        <button
          key={account.id}
          className={
            selectedAccountId === account.id
              ? "account-tab active"
              : "account-tab"
          }
          onClick={() => onSelectAccount(account.id)}
        >
          {account.nickname}
        </button>
      ))}

    </div>
  );
};

export default AccountTabs;