import { useEffect, useRef, useState } from 'react'
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

// TODO: API 담당 팀원이 constants/api.js의 getAccounts/getTransactions로 교체 예정
const DUMMY_ACCOUNTS = [
  { id: 'acc1', nickname: '우리 첫급여통장', accountNo: '1002-***-123456', balance: 2384560, type: '입출금' },
  { id: 'acc2', nickname: '우리 SUPER주거래통장', accountNo: '1002-***-789012', balance: 15200000, type: '저축예금' },
  { id: 'acc3', nickname: '우리 청년도약계좌', accountNo: '1002-***-456789', balance: 5000000, type: '적금' },
]

const DUMMY_TRANSACTIONS = [
  { id: 1, accountId: 'acc1', date: '2026-08-23', time: '09:12', desc: '스타벅스 강남점', type: 'out', amount: 5800, balanceAfter: 2384560, status: 'done' },
  { id: 2, accountId: 'acc1', date: '2026-08-22', time: '14:05', desc: '월급', type: 'in', amount: 3200000, balanceAfter: 2390360, status: 'done' },
  { id: 3, accountId: 'acc1', date: '2026-08-22', time: '11:40', desc: '이서연', type: 'out', amount: 30000, balanceAfter: -809640, status: 'done' },
  { id: 4, accountId: 'acc2', date: '2026-08-21', time: '08:00', desc: '자동이체 - 적금', type: 'out', amount: 500000, balanceAfter: 15200000, status: 'done' },
  { id: 5, accountId: 'acc3', date: '2026-08-20', time: '10:00', desc: '적금 자동납입', type: 'in', amount: 300000, balanceAfter: 5000000, status: 'done' },
]

function HomeScreen({ onQuickMenuSelect }) {
  const [accounts] = useState(DUMMY_ACCOUNTS)
  const [recentTransactions] = useState(
    [...DUMMY_TRANSACTIONS].sort((a, b) => (b.date + b.time).localeCompare(a.date + a.time)).slice(0, 4)
  )

  const [masked, setMasked] = useState(false)

  const [expandedAccountId, setExpandedAccountId] = useState(null)

  const [selectedTxId, setSelectedTxId] = useState(null)
  const txTriggerRef = useRef(null)
  const sheetCloseBtnRef = useRef(null)

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

  const selectedTx = selectedTxId !== null ? DUMMY_TRANSACTIONS.find((tx) => tx.id === selectedTxId) : null
  const total = accounts.reduce((sum, a) => sum + a.balance, 0)

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
            const accountTx = DUMMY_TRANSACTIONS.filter((tx) => tx.accountId === a.id).slice(0, 3)
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
                  <p className="meta">{tx.date.slice(5)}</p>
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
