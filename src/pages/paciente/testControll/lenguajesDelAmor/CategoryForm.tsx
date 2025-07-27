import React, { useState, useEffect } from 'react'
import type { LoveLanguageCategory, LoveLanguageCategoryAnswer } from '../../../../intefaces/User.interface'
import { useTestProgress } from '../hooks/useTestProgress'

interface CategoryFormProps {
  category: LoveLanguageCategory
  onSubmit: (answers: LoveLanguageCategoryAnswer) => void
  submitting: boolean
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSubmit, submitting }) => {
  const {
    progress: testProgress,
    updateCurrentQuestionState,
    updateCurrentCategoryAnswers
  } = useTestProgress()

  // Inicializar estado desde el progreso guardado
  const [currentSection, setCurrentSection] = useState<'recibirAmor' | 'expresarAmor'>(
    testProgress.currentSection
  )
  const [recibirAmorAnswers, setRecibirAmorAnswers] = useState<number[]>(
    testProgress.recibirAmorAnswers
  )
  const [expresarAmorAnswers, setExpresarAmorAnswers] = useState<number[]>(
    testProgress.expresarAmorAnswers
  )
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(
    testProgress.currentQuestionIndex
  )

  // Sincronizar estado cuando cambie la categoría o el progreso global relevante
  useEffect(() => {
    setCurrentSection(testProgress.currentSection)
    setRecibirAmorAnswers([...testProgress.recibirAmorAnswers])
    setExpresarAmorAnswers([...testProgress.expresarAmorAnswers])
    setCurrentQuestionIndex(testProgress.currentQuestionIndex)
  }, [testProgress.currentCategoryIndex, testProgress.currentSection, testProgress.currentQuestionIndex, testProgress.recibirAmorAnswers, testProgress.expresarAmorAnswers])

  const currentQuestions = currentSection === 'recibirAmor' 
    ? category.recibirAmor 
    : category.expresarAmor

  const currentAnswers = currentSection === 'recibirAmor' 
    ? recibirAmorAnswers 
    : expresarAmorAnswers

  const setCurrentAnswers = currentSection === 'recibirAmor' 
    ? setRecibirAmorAnswers 
    : setExpresarAmorAnswers

  const handleAnswer = (answer: number) => {
    const newAnswers = [...currentAnswers]
    newAnswers[currentQuestionIndex] = answer
    setCurrentAnswers(newAnswers)

    // Guardar progreso inmediatamente
    updateCurrentQuestionState(
      currentSection,
      currentQuestionIndex,
      currentSection === 'recibirAmor' ? newAnswers : recibirAmorAnswers,
      currentSection === 'expresarAmor' ? newAnswers : expresarAmorAnswers
    )

    // Si es la última pregunta de la sección actual
    if (currentQuestionIndex === currentQuestions.length - 1) {
      // Si estamos en recibirAmor, cambiar a expresarAmor
      if (currentSection === 'recibirAmor') {
        setCurrentSection('expresarAmor')
        setCurrentQuestionIndex(0)
        // Guardar cambio de sección
        updateCurrentQuestionState(
          'expresarAmor',
          0,
          newAnswers,
          expresarAmorAnswers
        )
      } else {
        // Si estamos en expresarAmor, enviar el formulario
        const finalAnswers: LoveLanguageCategoryAnswer = {
          categoria: category.categoria,
          recibirAmor: recibirAmorAnswers,
          expresarAmor: newAnswers
        }
        // Guardar respuestas completas de la categoría
        updateCurrentCategoryAnswers(category.categoria, recibirAmorAnswers, newAnswers)
        onSubmit(finalAnswers)
      }
    } else {
      // Ir a la siguiente pregunta
      const nextQuestionIndex = currentQuestionIndex + 1
      setCurrentQuestionIndex(nextQuestionIndex)
      // Guardar cambio de pregunta
      updateCurrentQuestionState(
        currentSection,
        nextQuestionIndex,
        currentSection === 'recibirAmor' ? newAnswers : recibirAmorAnswers,
        currentSection === 'expresarAmor' ? newAnswers : expresarAmorAnswers
      )
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      const prevQuestionIndex = currentQuestionIndex - 1
      setCurrentQuestionIndex(prevQuestionIndex)
      // Guardar cambio de pregunta
      updateCurrentQuestionState(
        currentSection,
        prevQuestionIndex,
        recibirAmorAnswers,
        expresarAmorAnswers
      )
    } else if (currentSection === 'expresarAmor') {
      setCurrentSection('recibirAmor')
      const prevQuestionIndex = recibirAmorAnswers.length - 1
      setCurrentQuestionIndex(prevQuestionIndex)
      // Guardar cambio de sección
      updateCurrentQuestionState(
        'recibirAmor',
        prevQuestionIndex,
        recibirAmorAnswers,
        expresarAmorAnswers
      )
    }
  }

  const getSectionProgress = () => {
    const totalQuestions = currentQuestions.length
    const answeredQuestions = currentAnswers.filter(answer => answer !== undefined && answer !== null).length
    return (answeredQuestions / totalQuestions) * 100
  }

  const getOverallProgress = () => {
    const totalQuestions = category.recibirAmor.length + category.expresarAmor.length
    const answeredQuestions = recibirAmorAnswers.filter(a => a !== undefined && a !== null).length + 
                             expresarAmorAnswers.filter(a => a !== undefined && a !== null).length
    return (answeredQuestions / totalQuestions) * 100
  }

  // Reiniciar barras de progreso cuando se completa la categoría o sección
  useEffect(() => {
    if (getOverallProgress() === 100 || getSectionProgress() === 100) {
      setRecibirAmorAnswers([])
      setExpresarAmorAnswers([])
      setCurrentQuestionIndex(0)
      setCurrentSection('recibirAmor')
    }
  }, [getOverallProgress(), getSectionProgress()])

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Header de la categoría */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text- mb-2">
            {category.categoria}
          </h2>
          <div className="badge badge-primary">
            {currentSection === 'recibirAmor' ? 'Recibir Amor' : 'Expresar Amor'}
          </div>
        </div>

        {/* Progreso general */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-primary">Progreso general</span>
            <span className="text-sm font-medium text-primary">{Math.round(getOverallProgress())}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getOverallProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Progreso de la sección actual */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-secondary">
              {currentSection === 'recibirAmor' ? 'Recibir Amor' : 'Expresar Amor'}
            </span>
            <span className="text-sm font-medium text-secondary">
              {currentQuestionIndex + 1} de {currentQuestions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-secondary h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getSectionProgress()}%` }}
            ></div>
          </div>
        </div>

        {/* Pregunta actual */}
        <div className="text-center my-8">
          <h3 className="text-lg lg:text-2xl font-semibold text-white mb-6">
            {`¿${currentQuestions[currentQuestionIndex]}?`}
          </h3>
        </div>

        {/* Opciones de respuesta */}
        <div className="flex flex-col gap-4 mb-8">
          <button
            onClick={() => handleAnswer(1)}
            disabled={submitting}
            className="btn btn-primary btn-lg"
          >
            Sí
          </button>
          <button
            onClick={() => handleAnswer(0)}
            disabled={submitting}
            className="btn btn-outline btn-lg"
          >
            No
          </button>
        </div>

        {/* Botones de navegación */}
        <div className="flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentQuestionIndex === 0 && currentSection === 'recibirAmor' || submitting}
            className="btn btn-ghost"
          >
            ← Anterior
          </button>
          
          {submitting && (
            <div className="flex items-center">
              <span className="loading loading-spinner loading-sm mr-2"></span>
              <span className="text-sm text-secondary">Enviando...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryForm 