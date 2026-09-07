import { useState } from 'react'
import HomeScreen from './components/HomeScreen'
import PhoneFrame from './layouts/PhoneFrame'
import TransferFrame from './components/TransferScreen'
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
      {activeTab === 'home' && (
        <HomeScreen onQuickMenuSelect={handleAction} />
      )}

      {activeTab === 'history' && (
        <TransactionPage />
      )}

      {activeTab === 'transfer' && (
        <TransferFrame
          onFinishHome={() => setActiveTab('home')}
        />
      )}


    </PhoneFrame>
  )
}

export default App;