import { useEffect, useState } from "react";

import AccountTabs from "./AccountTabs";
import TransactionFilter from "./TransactionFilter";
import TransactionList from "./TransactionList";

import "./TransactionPage.css";

const API_URL = "http://localhost:4000/api";

const TransactionPage = ({ initialAccountId = "" }) => {
  // 계좌 목록
  const [accounts, setAccounts] = useState([]);

  // 거래내역 목록
  const [transactions, setTransactions] = useState([]);

  // 선택된 계좌 (홈 화면에서 특정 계좌를 눌러 진입한 경우 해당 계좌로 초기 선택)
  const [selectedAccountId, setSelectedAccountId] = useState(initialAccountId);

  // 선택된 거래 종류
  const [selectedType, setSelectedType] = useState("");

  // 계좌 목록 조회
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
    <main className="transaction-page">

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

    </main>
  );
};

export default TransactionPage;