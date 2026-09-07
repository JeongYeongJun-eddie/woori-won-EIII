import { useEffect, useState } from "react";

import AccountTabs from "./AccountTabs";
import TransactionFilter from "./TransactionFilter";
import TransactionList from "./TransactionList";
import TransactionModal from "../ui/TransactionModal";

const API_URL = "http://localhost:4000/api";

const TransactionPage = () => {
  
  //처음 렌더링 초깃값
  //여기서 두번째 인자는 상태 변경 함수로, setTransactions(data) 이렇게 사용해야 함
  const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);

  //계좌 선택, 현재는 ""로 설정됨
  const [selectedAccountId, setSelectedAccountId] = useState("");
  //입출금 선택
  const [selectedType, setSelectedType] = useState("");

  //선택한 거래 내역
  const [selectedTransactionId, setSelectedTransactionId] =
    useState(null);

  //GET /api/accounts — 전체 계좌 목록 조회
  //useEffect() : 두번째 인자의 의존성 배열에 따라 실행 시점이 결정됨
  // 아래엔 [] 넣음 > 빈 배열을 넣으면 컴포넌트가 처음 화면에 나타난 뒤 1번만 실행
  useEffect(() => {
    fetch(`${API_URL}/accounts`)
      .then(response => {
        if (!response.ok) {
          throw new Error("계좌 조회 실패");
        }

        return response.json();
      })
      .then(data => {
        //위의 then 에서 반환 값을 처리함
        //빈 배열인 accounts에 계좌 목록을 저장
        setAccounts(data);
      })
      .catch(console.error);
  }, []);


  // GET /api/transactions?accountId=&type=&limit= — 거래내역 목록 조회
  //처음 렌더링, 계좌 or 거래 종류가 선택되는 경우 실행됨.
  useEffect(() => {
    const params = new URLSearchParams();

    //경로 파라미터에 계좌 or 거래 종류 추가
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
        //빈 배열인 transactions에 데이터 저장
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