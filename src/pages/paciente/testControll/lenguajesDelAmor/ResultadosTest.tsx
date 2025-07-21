import { useNavigate } from 'react-router-dom'

const ResultadosTest = () => {
  const navigate = useNavigate()

  const handleGoBack = () => {
    navigate('/paciente/ver-test')
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body text-center">
            <div className="mb-6">
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-3xl font-bold text-gray-800 mb-4">
                ¡Test Completado!
              </h1>
              <p className="text-gray-600 text-lg">
                Has completado exitosamente el test de lenguajes del amor.
              </p>
            </div>

            <div className="alert alert-success mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Tus resultados han sido guardados correctamente.</span>
            </div>

            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Próximamente podrás ver tus resultados detallados aquí
              </h2>
              <p className="text-gray-600">
                Estamos trabajando para mostrarte un análisis completo de tus lenguajes del amor.
              </p>
            </div>

            <div className="card-actions justify-center">
              <button 
                onClick={handleGoBack}
                className="btn btn-primary btn-lg"
              >
                Volver a Tests
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResultadosTest 