export const API_BASE = 'http://localhost:4000'

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
  return data
}

export function getAccounts() {
  return apiRequest('/api/accounts')
}

export function getTransactions({ accountId, type, limit } = {}) {
  const params = new URLSearchParams()
  if (accountId) params.set('accountId', accountId)
  if (type) params.set('type', type)
  if (limit) params.set('limit', limit)
  const query = params.toString() ? `?${params.toString()}` : ''
  return apiRequest(`/api/transactions${query}`)
}

export function getTransaction(id) {
  return apiRequest(`/api/transactions/${id}`)
}
