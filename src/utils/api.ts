import type { CreateHistorial, SesionTrabajada } from "../intefaces/User.interface"

const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

interface ApiOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  body?: any
  headers?: Record<string, string>
}

export const apiRequest = async (endpoint: string, options: ApiOptions = {}) => {
  const token = localStorage.getItem('token')
  
  if (!token) {
    // Si no hay token, redirigir al login
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('role')
    window.location.href = '/login'
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
    
    // Si el error es 401 (Unauthorized), limpiar localStorage y redirigir
    if (response.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      localStorage.removeItem('role')
      window.location.href = '/login'
      throw new Error('Sesión expirada. Por favor, inicia sesión nuevamente.')
    }
    
    throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`)
  }

  return response.json()
}

// Funciones específicas para el historial
export const historialApi = {
  create: (data: CreateHistorial) => apiRequest('/historial', { method: 'POST', body: data }),
  getAll: () => apiRequest('/historial'),
  getById: (id: string) => apiRequest(`/historial/${id}`),
  getByPatient: (patientId: string) => apiRequest(`/historial/patient/${patientId}`),
  update: (id: string, data: CreateHistorial) => apiRequest(`/historial/${id}`, { method: 'PATCH', body: data }),
  delete: (id: string) => apiRequest(`/historial/${id}`, { method: 'DELETE' }),
  addSesion: (id: string, sesionData: SesionTrabajada) => apiRequest(`/historial/${id}/sesiones`, { method: 'POST', body: sesionData }),
  editSesion: (id: string, sesionIndex: number, sesionData: SesionTrabajada) => apiRequest(`/historial/${id}/sesiones/${sesionIndex}`, { method: 'PATCH', body: sesionData }),
  removeSesion: (id: string, sesionIndex: number) => apiRequest(`/historial/${id}/sesiones/${sesionIndex}`, { method: 'DELETE' })
} 