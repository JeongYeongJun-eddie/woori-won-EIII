// 환경 변수 활용 (기본값 localhost:4000)
export const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:4000'

export const API_ENDPOINTS = {
  ACCOUNTS: '/api/accounts',
  TRANSACTIONS: '/api/transactions',
  LOOKUP: '/api/transfer/lookup',
  TRANSFERS: '/api/transfers',
}

async function apiRequest(path, options = {}) {
  const { headers, ...restOptions } = options

  const res = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...headers, // 헤더가 덮어씌워지지 않도록 깊은 병합
    },
    ...restOptions,
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    throw new Error(data?.message || `요청 실패 (${res.status})`)
  }

  return data
}

export function getAccounts() {
  return apiRequest(API_ENDPOINTS.ACCOUNTS)
}

export function getTransactions({ accountId, type, limit } = {}) {
  const params = new URLSearchParams()
  if (accountId) params.set('accountId', accountId)
  if (type) params.set('type', type)
  if (limit) params.set('limit', limit)

  const queryString = params.toString() ? `?${params.toString()}` : ''
  return apiRequest(`${API_ENDPOINTS.TRANSACTIONS}${queryString}`)
}

export function getTransaction(id) {
  return apiRequest(`${API_ENDPOINTS.TRANSACTIONS}/${id}`)
}

export function transfer(payload) {
  return apiRequest(`${API_ENDPOINTS.TRANSFERS}`, {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}

export function lookupOwner({ bank, accountNo }) {
  const params = new URLSearchParams()
  if (bank) params.set('bank', bank)
  if (accountNo) params.set('accountNo', accountNo)

  return apiRequest(`${API_ENDPOINTS.LOOKUP}?${params.toString()}`)
}