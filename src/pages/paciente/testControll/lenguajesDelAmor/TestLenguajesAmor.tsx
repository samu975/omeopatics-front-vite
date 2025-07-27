import { useState, useEffect } from 'react'
import { loveLanguagesApi } from '../../../../utils/api'
import type { LoveLanguageCategory, LoveLanguageCategoryAnswer } from '../../../../intefaces/User.interface'
import { useNavigate } from 'react-router-dom'
import CategoryForm from './CategoryForm'
import { useTestProgress } from '../hooks/useTestProgress'

const TestLenguajesAmor = () => {
  const [categories, setCategories] = useState<LoveLanguageCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const navigate = useNavigate()
  
  const {
    progress: testProgress,
    goToNextCategory,
    loadCategoryAnswers,
    clearProgress
  } = useTestProgress()

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        setLoading(true)
        const questionsResponse = await loveLanguagesApi.getQuestions()
        setCategories(questionsResponse)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al cargar las preguntas')
      } finally {
        setLoading(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleCategorySubmit = async (answers: LoveLanguageCategoryAnswer) => {
    try {
      setSubmitting(true)
      await loveLanguagesApi.submitCategoryAnswers(answers)
      
      // Si es la última categoría, redirigir a los resultados
      if (testProgress.currentCategoryIndex === categories.length - 1) {
        clearProgress() // Limpiar progreso al completar
        navigate('/paciente/test-lenguajes-amor/resultados')
      } else {
        // Ir a la siguiente categoría
        goToNextCategory()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al enviar las respuestas')
    } finally {
      setSubmitting(false)
    }
  }

  const handleGoBack = () => {
    navigate('/paciente/ver-test')
  }

  // Cargar respuestas de la categoría actual cuando cambie
  useEffect(() => {
    if (categories.length > 0 && testProgress.currentCategoryIndex < categories.length) {
      const currentCategory = categories[testProgress.currentCategoryIndex]
      
      // Verificar si la categoría actual ya está completa
      const categoryAnswer = testProgress.categoryAnswers[currentCategory.categoria]
      if (categoryAnswer && categoryAnswer.recibirAmor.length === 10 && categoryAnswer.expresarAmor.length === 10) {
        // Si es la última categoría y está completa, redirigir a resultados
        if (testProgress.currentCategoryIndex === categories.length - 1) {
          clearProgress()
          navigate('/paciente/test-lenguajes-amor/resultados')
          return
        } else {
          // Si no es la última, ir a la siguiente categoría
          goToNextCategory()
          return
        }
      }
      
      // Solo cargar si no hay respuestas actuales para esta categoría
      if (testProgress.recibirAmorAnswers.length === 0 && testProgress.expresarAmorAnswers.length === 0) {
        loadCategoryAnswers(currentCategory.categoria)
      }
    }
  }, [testProgress.currentCategoryIndex, categories])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-error max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>{error}</span>
        </div>
      </div>
    )
  }

  if (categories.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="alert alert-warning max-w-md">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <span>No se encontraron preguntas disponibles</span>
        </div>
      </div>
    )
  }

  const currentCategory = categories[testProgress.currentCategoryIndex]
  const progress = ((testProgress.currentCategoryIndex + 1) / categories.length) * 100

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header con progreso */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={handleGoBack}
              className="btn btn-ghost btn-sm"
            >
              ← Volver
            </button>
            <span className="text-sm text-white">
              Categoría {testProgress.currentCategoryIndex + 1} de {categories.length}
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          <h1 className="text-2xl font-bold text-white text-center">
            Test de Lenguajes del Amor
          </h1>
        </div>

        {/* Formulario de la categoría actual */}
        <CategoryForm 
          category={currentCategory}
          onSubmit={handleCategorySubmit}
          submitting={submitting}
        />
      </div>
    </div>
  )
}

export default TestLenguajesAmor 