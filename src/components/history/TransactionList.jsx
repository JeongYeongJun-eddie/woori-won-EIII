import { useState } from "react";
import TransactionItem from "./TransactionItem";
import TransactionModal from "../ui/TransactionModal";

const TransactionList = ({
  transactions,
  accounts,
}) => {

  const [selectedTransactionId, setSelectedTransactionId] =
    useState(null);

  const groupedTransactions = transactions.reduce(
    (groups, transaction) => {

      if (!groups[transaction.date]) {
        groups[transaction.date] = [];
      }

      groups[transaction.date].push(transaction);

      return groups;
    },
    {}
  );

  return (
    <>
      <div>
        {Object.entries(groupedTransactions).map(
          ([date, transactionList]) => (
            <section key={date}>

              <h3>{date}</h3>

              {transactionList.map(transaction => {

                const account = accounts.find(
                  account =>
                    account.id === transaction.accountId
                );

                return (
                  <TransactionItem
                    key={transaction.id}
                    transaction={transaction}
                    account={account}
                    onClick={() => {
                      console.log("선택 거래:", transaction.id);

                      setSelectedTransactionId(
                        transaction.id
                      );
                    }}
                  />
                );
              })}

            </section>
          )
        )}
      </div>

      {selectedTransactionId !== null && (
        <TransactionModal
          transactionId={selectedTransactionId}
          accounts={accounts}
          onClose={() =>
            setSelectedTransactionId(null)
          }
        />
      )}
    </>
  );
};

export default TransactionList;