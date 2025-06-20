const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export const apiRequest = async (endpoint: string, options: ApiOptions = {}) => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    throw new Error('No hay token de autenticación')
  }

  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  }

  const config: RequestInit = {
    method: options.method || 'GET',
    headers: {
      ...defaultHeaders,
      ...options.headers
    }
  }

  if (options.body) {
    config.body = JSON.stringify(options.body)
  }

  const response = await fetch(`${apiUrl}${endpoint}`, config)

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({ message: 'Error desconocido' }))
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

// Funciones específicas para el historial
export const historialApi = {
  create: (data: any) => apiRequest('/historial', { method: 'POST', body: data }),
  getAll: () => apiRequest('/historial'),
  getById: (id: string) => apiRequest(`/historial/${id}`),
  getByPatient: (patientId: string) => apiRequest(`/historial/patient/${patientId}`),
  update: (id: string, data: any) => apiRequest(`/historial/${id}`, { method: 'PATCH', body: data }),
  delete: (id: string) => apiRequest(`/historial/${id}`, { method: 'DELETE' }),
  addSesion: (id: string, sesionData: any) => apiRequest(`/historial/${id}/sesiones`, { method: 'POST', body: sesionData }),
  removeSesion: (id: string, sesionIndex: number) => apiRequest(`/historial/${id}/sesiones/${sesionIndex}`, { method: 'DELETE' })
} 