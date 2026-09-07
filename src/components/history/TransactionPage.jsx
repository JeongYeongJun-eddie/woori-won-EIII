import { useEffect, useState } from "react";

import AccountTabs from "./AccountTabs";
import TransactionFilter from "./TransactionFilter";
import TransactionList from "./TransactionList";
import TransactionModal from "../ui/TransactionModal";

const API_URL = "http://localhost:4000/api";

const TransactionPage = () => {
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedType, setSelectedType] = useState("");

  const [selectedTransactionId, setSelectedTransactionId] =
    useState(null);

  // 계좌 전체 조회
  useEffect(() => {
    fetch(`${API_URL}/accounts`)
      .then(response => {
        if (!response.ok) {
          throw new Error("계좌 조회 실패");
        }

        return response.json();
      })
      .then(data => {
        setAccounts(data);
      })
      .catch(console.error);
  }, []);

  // 거래내역 조회
  useEffect(() => {
    const params = new URLSearchParams();

    if (selectedAccountId) {
      params.append("accountId", selectedAccountId);
    }

    if (selectedType) {
      params.append("type", selectedType);
    }

    let url = `${API_URL}/transactions`;

    if (params.toString()) {
      url += `?${params.toString()}`;
    }

    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error("거래내역 조회 실패");
        }

        return response.json();
      })
      .then(data => {
        setTransactions(data);
      })
      .catch(console.error);

  }, [selectedAccountId, selectedType]);

  return (
    <main>
      <AccountTabs
        accounts={accounts}
        selectedAccountId={selectedAccountId}
        onSelectAccount={setSelectedAccountId}
      />

      <TransactionFilter
        selectedType={selectedType}
        onSelectType={setSelectedType}
      />

      <TransactionList
        transactions={transactions}
        accounts={accounts}
      />

      {selectedTransactionId !== null && (
        <TransactionModal
          transactionId={selectedTransactionId}
          accounts={accounts}
          onClose={() => setSelectedTransactionId(null)}
        />
      )}
    </main>
  );
};

export default TransactionPage;