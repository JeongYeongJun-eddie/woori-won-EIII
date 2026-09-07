import './BottomNav.css'

const NAV_ITEMS = [
  { key: 'home', icon: '🏠', label: '홈' },
  { key: 'transfer', icon: '💸', label: '이체' },
  { key: 'history', icon: '📋', label: '거래내역' },
  { key: 'more', icon: '⋯', label: '전체' },
]

function BottomNav({ active, onNavigate }) {
  return (
    <nav className="bottom-nav" aria-label="하단 메뉴">
      {NAV_ITEMS.map((item) => (
        <button
          key={item.key}
          type="button"
          className={`nav-btn ${active === item.key ? 'active' : ''}`}
          onClick={() => onNavigate?.(item.key)}
          aria-current={active === item.key ? 'page' : undefined}
        >
          <span className="nav-icon" aria-hidden="true">{item.icon}</span>
          <span className="nav-lbl">{item.label}</span>
        </button>
      ))}
    </nav>
  )
}

export default BottomNav
