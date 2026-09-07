import { useState } from "react";

import TransactionItem from "./TransactionItem";
import TransactionModal from "../ui/TransactionModal";

const TransactionList = ({
  transactions,
  accounts,
}) => {

  const [selectedTransactionId, setSelectedTransactionId] =
    useState(null);

  // 날짜별 거래 그룹화
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
      <div className="transaction-list">

        {Object.entries(groupedTransactions).map(
          ([date, transactionList]) => (

            <section
              key={date}
              className="transaction-section"
            >

              <h3 className="transaction-date">
                {date}
              </h3>

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
                      console.log(
                        "선택 거래:",
                        transaction.id
                      );

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
          transactions={transactions}
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