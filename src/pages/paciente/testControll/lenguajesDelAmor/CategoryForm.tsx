import React, { useState } from 'react'
import type { LoveLanguageCategory, LoveLanguageCategoryAnswer } from '../../../../intefaces/User.interface'

interface CategoryFormProps {
  category: LoveLanguageCategory
  onSubmit: (answers: LoveLanguageCategoryAnswer) => void
  submitting: boolean
}

const CategoryForm: React.FC<CategoryFormProps> = ({ category, onSubmit, submitting }) => {
  const [currentSection, setCurrentSection] = useState<'recibirAmor' | 'expresarAmor'>('recibirAmor')
  const [recibirAmorAnswers, setRecibirAmorAnswers] = useState<number[]>([])
  const [expresarAmorAnswers, setExpresarAmorAnswers] = useState<number[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

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

    // Si es la última pregunta de la sección actual
    if (currentQuestionIndex === currentQuestions.length - 1) {
      // Si estamos en recibirAmor, cambiar a expresarAmor
      if (currentSection === 'recibirAmor') {
        setCurrentSection('expresarAmor')
        setCurrentQuestionIndex(0)
      } else {
        // Si estamos en expresarAmor, enviar el formulario
        const finalAnswers: LoveLanguageCategoryAnswer = {
          categoria: category.categoria,
          recibirAmor: recibirAmorAnswers,
          expresarAmor: newAnswers
        }
        onSubmit(finalAnswers)
      }
    } else {
      // Ir a la siguiente pregunta
      setCurrentQuestionIndex(prev => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1)
    } else if (currentSection === 'expresarAmor') {
      setCurrentSection('recibirAmor')
      setCurrentQuestionIndex(recibirAmorAnswers.length - 1)
    }
  }

  const getSectionProgress = () => {
    const totalQuestions = currentQuestions.length
    const answeredQuestions = currentAnswers.filter(answer => answer !== undefined).length
    return (answeredQuestions / totalQuestions) * 100
  }

  const getOverallProgress = () => {
    const totalQuestions = category.recibirAmor.length + category.expresarAmor.length
    const answeredQuestions = recibirAmorAnswers.filter(a => a !== undefined).length + 
                             expresarAmorAnswers.filter(a => a !== undefined).length
    return (answeredQuestions / totalQuestions) * 100
  }

  return (
    <div className="card bg-base-100 shadow-xl">
      <div className="card-body">
        {/* Header de la categoría */}
        <div className="text-center mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            {category.categoria}
          </h2>
          <div className="badge badge-primary">
            {currentSection === 'recibirAmor' ? 'Recibir Amor' : 'Expresar Amor'}
          </div>
        </div>

        {/* Progreso general */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Progreso general</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(getOverallProgress())}%</span>
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
            <span className="text-sm font-medium text-gray-700">
              {currentSection === 'recibirAmor' ? 'Recibir Amor' : 'Expresar Amor'}
            </span>
            <span className="text-sm font-medium text-gray-700">
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
        <div className="text-center mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {currentQuestions[currentQuestionIndex]?.pregunta}
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
              <span className="text-sm text-gray-600">Enviando...</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default CategoryForm 