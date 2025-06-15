import { useAuth } from '@clerk/clerk-react'

export const useApi = () => {
  const { getToken } = useAuth()

  const makeRequest = async (endpoint, options = {}) => {
    const token = await getToken()
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}`, {
        ...defaultOptions,
        ...options,
    })

    if (!response.ok) {
      const error = await response.json().catch(() => null)
      if(response.status === 429) {
        throw new Error('The daily quota is exceeded.')
      }
      throw new Error(error.detail || 'An error occurred')
    }
    return response.json()
  }
  return {makeRequest}
}