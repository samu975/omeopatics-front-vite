import type { LoveLanguageProgress } from '../../../../intefaces/User.interface'
import ProgressBar from './ProgressBar'

interface TestContentProps {
  progress: LoveLanguageProgress;
  onStartTest: () => void;
}

const TestContent: React.FC<TestContentProps> = ({ progress, onStartTest }) => {
  const hasProgress = progress.answers.length > 0
  const buttonText = hasProgress ? 'Continuar Test' : 'Comenzar Test'

  return (
    <div className='min-h-screen'>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
              <h2 className="card-title text-2xl font-bold text-primary mb-6">
                Test de Lenguajes del Amor
              </h2>
              
              <div className="mb-6">
                <p className="text-white mb-4">
                  Descubre tu lenguaje del amor principal y cómo expresas y recibes amor.
                </p>
                
                {hasProgress && (
                  <ProgressBar 
                    progress={progress.progress}
                    label="Progreso general"
                    color="primary"
                  />
                )}
              </div>

              <div className="card-actions justify-center">
                <button 
                  onClick={onStartTest}
                  className="btn btn-primary btn-lg"
                >
                  {buttonText}
                </button>
              </div>

              {hasProgress && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4">
                    Estado del test:
                  </h3>
                  <div className="flex items-center gap-4">
                    <div className="badge badge-lg">
                      {progress.isCompleted ? 'Completado' : 'En progreso'}
                    </div>
                    <span className="text-sm text-white">
                      {progress.answers.length} de {progress.totalCategories} categorías respondidas
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TestContent 