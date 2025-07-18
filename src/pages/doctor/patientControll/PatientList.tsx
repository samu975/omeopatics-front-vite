import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import useDoctorStore from '../../../store/doctorStore'
import Search from '../../../components/Search'
import ModalAcceptDelete from '../../../components/ModalAcceptDelete'
import PatientControllLayout from './PatientControllLayout'

const PatientList = () => {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')
  const { pacientes, setPacientes } = useDoctorStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedPacienteId, setSelectedPacienteId] = useState('')
  const bearerToken = localStorage.getItem('token')

  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

  const fetchPacientes = useCallback(async () => {
    try {
      const response = await fetch(`${apiUrl}/users`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${bearerToken}`
        }
      }

      )
      const data = await response.json()
      setPacientes(data)
    } catch {
      toast.error('Error al cargar los pacientes')
    }
  }, [apiUrl, setPacientes, bearerToken])

  useEffect(() => {
    fetchPacientes()
  }, [fetchPacientes])

  const handleDeletePaciente = async (id: string) => {
    try {
      const response = await fetch(`${apiUrl}/users/${id}`, {
        method: 'DELETE'
      })
      if (response.ok && pacientes.length > 0) {
        setPacientes(pacientes.filter(paciente => paciente._id !== id))
        toast.success('Paciente eliminado correctamente')
      } else {
        toast.error('Error al eliminar el paciente')
      }
    } catch {
      toast.error('Error al eliminar el paciente')
    }
  }

  const openConfirmationModal = (id: string) => {
    setSelectedPacienteId(id)
    setIsModalOpen(true)
  }

  const closeConfirmationModal = () => {
    setSelectedPacienteId('')
    setIsModalOpen(false)
  }

  // Filtrar pacientes basado en el término de búsqueda
  const filteredPacientes = pacientes.length > 0 ? pacientes.filter(paciente =>
    paciente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.phone.includes(searchTerm) ||
    paciente.cedula?.toLowerCase().includes(searchTerm.toLowerCase())
  ) : null

  const showPacientes = () => {
    return (
      <div className="container mx-auto p-4 min-h-screen">
        <div className="flex justify-between items-center mb-6">
          <button 
            onClick={() => navigate('/doctor/paciente/create')}
            className="btn btn-primary"
          >
            Crear Paciente
          </button>
        </div>

        <Search 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          placeholder="Buscar por nombre, teléfono o cédula..."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredPacientes && filteredPacientes.map((paciente) => (
            <div key={paciente._id} className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h2 className="card-title">{paciente.name}</h2>
                <p>Teléfono: {paciente.phone}</p>
                <p>Cédula: {paciente.cedula}</p>
                <div className="card-actions">
                  <button 
                    onClick={() => navigate(`/doctor/patient/${paciente._id}`)}
                    className="btn btn-primary"
                  >
                    Ver Paciente
                  </button>
                  <button 
                    onClick={() => navigate(`/doctor/paciente/edit/${paciente._id}`)}
                    className='btn btn-secondary'
                  >
                    Editar
                  </button>
                  <button 
                    className='btn btn-error' 
                    onClick={() => openConfirmationModal(paciente._id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <ModalAcceptDelete 
          isOpen={isModalOpen}
          title="Eliminar Paciente"
          message="¿Está seguro que desea eliminar este paciente? Esta acción no se puede deshacer."
          onAccept={() => {
            closeConfirmationModal();
            handleDeletePaciente(selectedPacienteId);
          }}
          onClose={closeConfirmationModal}
        />

        {filteredPacientes && filteredPacientes.length === 0 && searchTerm && (
          <p className="text-center text-gray-500 mt-4">
            No se encontraron pacientes que coincidan con la búsqueda
          </p>
        )}
      </div>
    )
  } 

  return (
    <PatientControllLayout>
      <h1 className='font-bold text-3xl text-white'>Pacientes</h1>
      {showPacientes()}
      <ToastContainer position='bottom-left' autoClose={3000} />
    </PatientControllLayout>
  )
}

export default PatientList