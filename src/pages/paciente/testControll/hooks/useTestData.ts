import { useState, useEffect } from 'react'
import { loveLanguagesApi } from '../../../../utils/api'
import type { UserWithLoveLanguages, LoveLanguageProgress } from '../../../../intefaces/User.interface'

interface UseTestDataReturn {
  user: UserWithLoveLanguages | null
  progress: LoveLanguageProgress | null
  loading: boolean
  error: string | null
}

export const useTestData = (): UseTestDataReturn => {
  const [user, setUser] = useState<UserWithLoveLanguages | null>(null)
  const [progress, setProgress] = useState<LoveLanguageProgress | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)
        
        const token = localStorage.getItem('token')
        const userData = localStorage.getItem('user')
        
        if (!token || !userData) {
          setError('No se encontró información de autenticación')
          return
        }

        const userObj = JSON.parse(userData)
        const userId = userObj._id

        // Obtener información del usuario
        const userResponse = await loveLanguagesApi.getUser(userId)
        setUser(userResponse)

        // Si el usuario tiene habilitado el test, obtener el progreso
        if (userResponse.loveLanguagesTestEnabled) {
          try {
            const progressResponse = await loveLanguagesApi.getProgress()
            setProgress(progressResponse)
          } catch {
            // Si no hay progreso, crear un objeto vacío
            setProgress({
              answers: [],
              isCompleted: false,
              progress: 0,
              totalCategories: 5
            })
          }
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar los datos')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return { user, progress, loading, error }
} 