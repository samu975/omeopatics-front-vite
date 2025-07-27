import { useNavigate } from 'react-router-dom'
import { useTestData } from './hooks/useTestData'
import { 
  LoadingSpinner, 
  ErrorMessage, 
  WhatsAppContact, 
  TestContent 
} from './components'
import NavBar from '../../../components/NavBar'

const VerTest = () => {
  const navigate = useNavigate()
  const { user, progress, loading, error } = useTestData()

  const handleComenzarTest = () => {
    navigate('/paciente/test-lenguajes-amor')
  }

  const handleVerResultados = () => {
    navigate('/paciente/test-lenguajes-amor/resultados/analisis')
  }

  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  if (!user?.loveLanguagesTestEnabled) {
    return (
      <div className='min-h-screen'>
        <NavBar />
        <WhatsAppContact 
          phoneNumber="+573003105263"
          message="Hola, me gustaría adquirir un test de lenguajes del amor."
          buttonText="Contactar por WhatsApp"
        />
      </div>
    )
  }

  if (progress) {
    return (
      <div className='min-h-screen py-10'>
        <NavBar />
        <TestContent 
          progress={progress}
          onStartTest={handleComenzarTest}
          onViewResults={handleVerResultados}
        />
      </div>
    )
  }

  return <ErrorMessage message="Error inesperado al cargar los datos" />
}

export default VerTest