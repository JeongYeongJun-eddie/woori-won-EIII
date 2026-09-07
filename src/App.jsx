import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import PhoneFrame from './layouts/PhoneFrame'
import TransactionPage from './components/history/TransactionPage'

const OUT_OF_SCOPE_MESSAGES = {
  product: '상품 화면은 이번 실습 범위 밖입니다',
  wealth: '자산관리 화면은 이번 실습 범위 밖입니다',
  more: '전체메뉴는 이번 실습 범위 밖입니다',
}

function App() {
  const [activeTab, setActiveTab] = useState('home')
  const [toast, setToast] = useState(null)

  function handleAction(key) {
    const message = OUT_OF_SCOPE_MESSAGES[key]
    if (message) {
      setToast({ id: Date.now(), message })
    } else {
      setActiveTab(key)
    }
  }

  return (
    <PhoneFrame activeTab={activeTab} onNavigate={handleAction} toast={toast}>
      {activeTab === 'home' ? (
        <HomeScreen onQuickMenuSelect={handleAction} />
      ) : activeTab === 'history' ? (
        <TransactionPage />
      ) : (
        <main style={{ padding: '80px 20px', textAlign: 'center', color: '#6b7280' }}>
          <p>이 화면은 담당 팀원 브랜치에서 아직 작업 중입니다.</p>
        </main>
      )}


    </PhoneFrame>
  )
}

export default App;