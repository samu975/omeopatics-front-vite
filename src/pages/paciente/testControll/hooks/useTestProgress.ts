import { useState, useEffect } from 'react'
import type { LoveLanguageCategoryAnswer } from '../../../../intefaces/User.interface'

interface TestProgress {
  currentCategoryIndex: number
  categoryAnswers: Record<string, LoveLanguageCategoryAnswer>
  currentSection: 'recibirAmor' | 'expresarAmor'
  currentQuestionIndex: number
  recibirAmorAnswers: number[]
  expresarAmorAnswers: number[]
}

const STORAGE_KEY = 'loveLanguagesTestProgress'

export const useTestProgress = () => {
  const [progress, setProgress] = useState<TestProgress>({
    currentCategoryIndex: 0,
    categoryAnswers: {},
    currentSection: 'recibirAmor',
    currentQuestionIndex: 0,
    recibirAmorAnswers: [],
    expresarAmorAnswers: []
  })

  useEffect(() => {
    const savedProgress = localStorage.getItem(STORAGE_KEY)
    if (savedProgress) {
      try {
        const parsedProgress = JSON.parse(savedProgress)
        setProgress(parsedProgress)
      } catch (error) {
        console.error('Error al cargar el progreso:', error)
        localStorage.removeItem(STORAGE_KEY)
      }
    }
  }, [])

  const saveProgress = (newProgress: TestProgress) => {
    setProgress(newProgress)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress))
  }

  const updateCurrentCategoryAnswers = (
    categoryName: string,
    recibirAmorAnswers: number[],
    expresarAmorAnswers: number[]
  ) => {
    const newProgress = {
      ...progress,
      categoryAnswers: {
        ...progress.categoryAnswers,
        [categoryName]: {
          categoria: categoryName,
          recibirAmor: recibirAmorAnswers,
          expresarAmor: expresarAmorAnswers
        }
      }
    }
    saveProgress(newProgress)
  }

  const updateCurrentQuestionState = (
    currentSection: 'recibirAmor' | 'expresarAmor',
    currentQuestionIndex: number,
    recibirAmorAnswers: number[],
    expresarAmorAnswers: number[]
  ) => {
    const newProgress = {
      ...progress,
      currentSection,
      currentQuestionIndex,
      recibirAmorAnswers,
      expresarAmorAnswers
    }
    saveProgress(newProgress)
  }

  const goToNextCategory = () => {
    const newProgress: TestProgress = {
      ...progress,
      currentCategoryIndex: progress.currentCategoryIndex + 1,
      currentSection: 'recibirAmor' as const,
      currentQuestionIndex: 0,
      recibirAmorAnswers: [],
      expresarAmorAnswers: []
    }
    saveProgress(newProgress)
  }

  const goToPreviousCategory = () => {
    if (progress.currentCategoryIndex > 0) {
      const newProgress: TestProgress = {
        ...progress,
        currentCategoryIndex: progress.currentCategoryIndex - 1,
        currentSection: 'recibirAmor' as const,
        currentQuestionIndex: 0,
        recibirAmorAnswers: [],
        expresarAmorAnswers: []
      }
      saveProgress(newProgress)
    }
  }

  // Función para cargar respuestas de una categoría específica
  const loadCategoryAnswers = (categoryName: string) => {
    const categoryAnswer = progress.categoryAnswers[categoryName]
    if (categoryAnswer) {
      // Si la categoría ya está completa, ir a la siguiente
      if (categoryAnswer.recibirAmor.length === 10 && categoryAnswer.expresarAmor.length === 10) {
        // Verificar si hay una siguiente categoría
        const nextCategoryIndex = progress.currentCategoryIndex + 1
        if (nextCategoryIndex < 5) { // Asumiendo 5 categorías totales
          const newProgress: TestProgress = {
            ...progress,
            currentCategoryIndex: nextCategoryIndex,
            currentSection: 'recibirAmor' as const,
            currentQuestionIndex: 0,
            recibirAmorAnswers: [],
            expresarAmorAnswers: []
          }
          saveProgress(newProgress)
          return
        } else {
          // Si es la última categoría y está completa, redirigir a resultados
          // Esto se manejará en el componente principal
          return
        }
      }
      
      // Si no está completa, cargar las respuestas existentes
      const newProgress: TestProgress = {
        ...progress,
        recibirAmorAnswers: [...categoryAnswer.recibirAmor],
        expresarAmorAnswers: [...categoryAnswer.expresarAmor]
      }
      saveProgress(newProgress)
    } else {
      // Si no hay respuestas guardadas, reiniciar arrays
      const newProgress: TestProgress = {
        ...progress,
        recibirAmorAnswers: [],
        expresarAmorAnswers: []
      }
      saveProgress(newProgress)
    }
  }

  const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY)
    setProgress({
      currentCategoryIndex: 0,
      categoryAnswers: {},
      currentSection: 'recibirAmor',
      currentQuestionIndex: 0,
      recibirAmorAnswers: [],
      expresarAmorAnswers: []
    })
  }

  return {
    progress,
    updateCurrentCategoryAnswers,
    updateCurrentQuestionState,
    goToNextCategory,
    goToPreviousCategory,
    loadCategoryAnswers,
    clearProgress
  }
} 