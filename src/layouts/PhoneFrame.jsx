import StatusBar from './StatusBar'
import AppHeader from './AppHeader'
import BottomNav from './BottomNav'
import Toast from './Toast'
import './PhoneFrame.css'

function PhoneFrame({ activeTab, onNavigate, toast, children }) {
  return (
    <div className="phone">
      <StatusBar />
      <AppHeader />
      <div className="phone-content">{children}</div>
      <BottomNav active={activeTab} onNavigate={onNavigate} />
      <Toast trigger={toast} />
    </div>
  )
}

export default PhoneFrame
