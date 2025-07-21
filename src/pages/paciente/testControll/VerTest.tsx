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

  const handleStartTest = () => {
    navigate('/paciente/test-lenguajes-amor')
  }

  // Estados de carga y error
  if (loading) {
    return <LoadingSpinner />
  }

  if (error) {
    return <ErrorMessage message={error} />
  }

  // Usuario sin test habilitado
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
      <div className='min-h-screen'>
        <NavBar />
        <TestContent 
          progress={progress}
          onStartTest={handleStartTest}
        />
      </div>
    )
  }

  return <ErrorMessage message="Error inesperado al cargar los datos" />
}

export default VerTest