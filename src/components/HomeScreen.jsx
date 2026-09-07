import { useEffect, useRef, useState } from 'react'
// [변경 1] 더미 데이터 대신 API 호출 함수를 import
import { getAccounts, getTransactions } from '../constants/api'
import './HomeScreen.css'

function won(n) {
  return Number(n).toLocaleString('ko-KR') + '원'
}

const QUICK_MENU_ITEMS = [
  { key: 'transfer', icon: '💸', label: '이체' },
  { key: 'history', icon: '📋', label: '거래내역' },
  { key: 'product', icon: '📦', label: '상품' },
  { key: 'wealth', icon: '📊', label: '자산관리' },
  { key: 'more', icon: '⋯', label: '전체' },
]

// [변경 2] 기존 상단에 하드코딩되어 있던 DUMMY_ACCOUNTS, DUMMY_TRANSACTIONS 배열 제거

function HomeScreen({ onQuickMenuSelect }) {
  // [변경 3] 더미 배열 대신 서버에서 받아올 빈 배열로 초기 State 선언
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  // [변경 4] 서버 통신 중/실패 시 상태 처리를 위한 loading, error State 추가
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [masked, setMasked] = useState(false)
  const [expandedAccountId, setExpandedAccountId] = useState(null)
  const [selectedTxId, setSelectedTxId] = useState(null)

  const txTriggerRef = useRef(null)
  const sheetCloseBtnRef = useRef(null)

  // [변경 5] 화면 마운트 시 백엔드 API(localhost:4000)에서 실시간 데이터 동시 호출
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true)
        const [accountsData, transactionsData] = await Promise.all([
          getAccounts(),
          getTransactions(),
        ])
        setAccounts(accountsData)
        setTransactions(transactionsData)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // [변경 6] 더미 변수 대신 서버에서 받아온 transactions State 기준으로 최근 4건 추출
  const recentTransactions = [...transactions]
    .sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time))
    .slice(0, 4)

  function handleToggleAccount(accountId) {
    setExpandedAccountId((prev) => (prev === accountId ? null : accountId))
  }

  function handleOpenTxDetail(txId, event) {
    txTriggerRef.current = event.currentTarget
    setSelectedTxId(txId)
  }

  function closeTxDetail() {
    setSelectedTxId(null)
    txTriggerRef.current?.focus()
  }

  useEffect(() => {
    if (selectedTxId === null) return
    sheetCloseBtnRef.current?.focus()
    function onKeyDown(e) {
      if (e.key === 'Escape') closeTxDetail()
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [selectedTxId])

  // [변경 7] DUMMY_TRANSACTIONS 대신 서버에서 받아온 transactions State에서 선택된 거래 탐색
  const selectedTx = selectedTxId !== null ? transactions.find((tx) => tx.id === selectedTxId) : null
  const total = accounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0)

  // [변경 8] 서버 데이터 로딩 중 및 통신 에러 발생 시 안내 UI 분기
  if (loading) {
    return (
      <main className="home-screen" style={{ padding: '40px 20px', textAlign: 'center', color: '#6b7280' }}>
        <p>데이터를 불러오는 중입니다...</p>
      </main>
    )
  }

  if (error) {
    return (
      <main className="home-screen" style={{ padding: '40px 20px', textAlign: 'center', color: '#ef4444' }}>
        <p>서버 연결 실패: {error}</p>
      </main>
    )
  }

  // 아래 UI 마크업, CSS 클래스, 인터랙션 구조는 팀장님 원본 그대로 유지됩니다.
  return (
    <main className="home-screen">
      <header className="greeting">
        <p className="hi">안녕하세요 👋</p>
        <p className="name">김민준님</p>
      </header>

      <section className="total-card" aria-label="총 자산">
        <div className="label-row">
          <span className="label">총 자산</span>
          <button
            type="button"
            className="eye-btn"
            onClick={() => setMasked((v) => !v)}
            aria-pressed={masked}
          >
            {masked ? '보이기' : '숨기기'}
          </button>
        </div>
        <p className="amount">{masked ? '••••••••' : won(total)}</p>
        <p className="sub">계좌 {accounts.length}개 합산 금액입니다</p>
      </section>

      <nav className="quick-menu" aria-label="빠른 메뉴">
        <ul>
          {QUICK_MENU_ITEMS.map((item) => (
            <li key={item.key}>
              <button type="button" onClick={() => onQuickMenuSelect?.(item.key)}>
                <span className="icon" aria-hidden="true">{item.icon}</span>
                <span className="lbl">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section aria-labelledby="account-heading">
        <div className="section-head">
          <h3 id="account-heading">내 계좌</h3>
          <span className="more">전체보기</span>
        </div>
        <ul className="account-list">
          {accounts.map((a) => {
            const isExpanded = expandedAccountId === a.id
            // [변경 9] DUMMY_TRANSACTIONS 대신 서버 transactions State에서 계좌별 거래내역 필터링
            const accountTx = transactions.filter((tx) => tx.accountId === a.id).slice(0, 3)
            return (
              <li key={a.id} className="account-card-wrap">
                <button
                  type="button"
                  className="account-card"
                  onClick={() => handleToggleAccount(a.id)}
                  aria-expanded={isExpanded}
                  aria-controls={`account-detail-${a.id}`}
                >
                  <div className="left">
                    <p className="nickname">{a.nickname}</p>
                    <p className="accno">{a.accountNo}</p>
                  </div>
                  <div className="right">
                    <p className="balance">{masked ? '••••••' : won(a.balance)}</p>
                    <p className="type">{a.type}</p>
                  </div>
                </button>

                {isExpanded && (
                  <div className="account-detail" id={`account-detail-${a.id}`}>
                    {accountTx.length === 0 && (
                      <p className="state-message">최근 거래내역이 없습니다</p>
                    )}
                    {accountTx.map((tx) => (
                      <div key={tx.id} className="account-detail-row">
                        <span>{tx.desc}</span>
                        <span className={tx.type === 'in' ? 'plus' : 'minus'}>
                          {tx.type === 'in' ? '+' : '-'}{won(tx.amount)}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            )
          })}
        </ul>
      </section>

      <section aria-labelledby="recent-heading">
        <div className="section-head">
          <h3 id="recent-heading">최근 거래</h3>
          <span className="more">전체보기</span>
        </div>
        <ul className="recent-list">
          {recentTransactions.length === 0 && (
            <li className="state-message">거래내역이 없습니다</li>
          )}
          {recentTransactions.map((tx) => (
            <li key={tx.id} className="recent-item">
              <button type="button" className="recent-item-btn" onClick={(e) => handleOpenTxDetail(tx.id, e)}>
                <div className="left">
                  <p className="desc">{tx.desc}</p>
                  <p className="meta">{tx.date?.slice(5)}</p>
                </div>
                <p className={`right ${tx.type === 'in' ? 'plus' : 'minus'}`}>
                  {tx.type === 'in' ? '+' : '-'}{won(tx.amount)}
                </p>
              </button>
            </li>
          ))}
        </ul>
      </section>

      {selectedTx && (
        <div className="sheet-backdrop" onClick={closeTxDetail}>
          <div
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="거래 상세"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sheet-head">
              <h4>거래 상세</h4>
              <button
                type="button"
                className="sheet-close"
                onClick={closeTxDetail}
                aria-label="닫기"
                ref={sheetCloseBtnRef}
              >
                ✕
              </button>
            </div>

            <dl className="sheet-body">
              <dt>거래 대상</dt>
              <dd>{selectedTx.desc}</dd>
              <dt>일시</dt>
              <dd>{selectedTx.date} {selectedTx.time}</dd>
              <dt>금액</dt>
              <dd className={selectedTx.type === 'in' ? 'plus' : 'minus'}>
                {selectedTx.type === 'in' ? '+' : '-'}{won(selectedTx.amount)}
              </dd>
              <dt>거래 후 잔액</dt>
              <dd>{won(selectedTx.balanceAfter)}</dd>
              <dt>상태</dt>
              <dd>{selectedTx.status === 'done' ? '완료' : selectedTx.status}</dd>
            </dl>
          </div>
        </div>
      )}
    </main>
  )
}

export default HomeScreen

