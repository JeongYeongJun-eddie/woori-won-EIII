import './AppHeader.css'

function AppHeader({ hasNotification = false }) {
  return (
    <header className="app-header">
      <div className="brand">
        <div className="brand-mark" aria-hidden="true">W</div>
        <div className="brand-name">WON 실습뱅킹</div>
      </div>
      <div className="header-icons">
        <button type="button" aria-label="알림">
          🔔
          {hasNotification && <span className="badge-dot" aria-hidden="true"></span>}
        </button>
        <button type="button" aria-label="전체 메뉴">☰</button>
      </div>
    </header>
  )
}

export default AppHeader
