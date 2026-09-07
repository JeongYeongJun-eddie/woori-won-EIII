const API_BASE_URL = 'http://localhost:4000/api'

// 1. 전체 계좌 목록 조회
export async function getAccounts() {
  const response = await fetch(`${API_BASE_URL}/accounts`)
  if (!response.ok) {
    throw new Error('계좌 목록을 불러오는데 실패했습니다.')
  }
  return response.json()
}

// 2. 단일 계좌 상세 조회
export async function getAccountById(accountId) {
  const response = await fetch(`${API_BASE_URL}/accounts/${accountId}`)
  if (!response.ok) {
    throw new Error('계좌 상세 정보를 불러오는데 실패했습니다.')
  }
  return response.json()
}

// 3. 거래내역 목록 조회 (서버에서 최신순 정렬 및 limit 지원)
export async function getTransactions(params = {}) {
  const query = new URLSearchParams()
  if (params.accountId) query.append('accountId', params.accountId)
  if (params.type) query.append('type', params.type)
  if (params.limit) query.append('limit', params.limit)

  const queryString = query.toString() ? `?${query.toString()}` : ''
  const response = await fetch(`${API_BASE_URL}/transactions${queryString}`)
  if (!response.ok) {
    throw new Error('거래내역을 불러오는데 실패했습니다.')
export const API_ENDPOINTS = {
  ACCOUNTS: `${API_BASE}/api/accounts`,
  LOOKUP: `${API_BASE}/api/transfer/lookup`,
  TRANSFERS: `${API_BASE}/api/transfers`,
};

async function apiRequest(path, options = {}) {
  const res = await fetch(API_BASE + path, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    throw new Error(data?.message || `요청 실패 (${res.status})`)
  }
  return response.json()
}

// 4. 단일 거래 상세 조회
export async function getTransactionById(id) {
  const response = await fetch(`${API_BASE_URL}/transactions/${id}`)
  if (!response.ok) {
    throw new Error('거래 상세 정보를 불러오는데 실패했습니다.')
  }
  return response.json()
}

// 5. 예금주 조회 (이체용)
export async function lookupOwner(bank, accountNo) {
  const response = await fetch(
    `${API_BASE_URL}/transfer/lookup?bank=${encodeURIComponent(bank)}&accountNo=${encodeURIComponent(accountNo)}`
  )
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '예금주 조회에 실패했습니다.')
  }
  return response.json()
}

// 6. 이체 실행 (이체용)
export async function transferMoney(transferData) {
  const response = await fetch(`${API_BASE_URL}/transfers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(transferData),
  })
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message || '이체 처리에 실패했습니다.')
  }
  return response.json()
}


