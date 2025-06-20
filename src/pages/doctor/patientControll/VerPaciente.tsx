import { useCallback, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import type { Patient } from '../../../intefaces/User.interface'
import PatientControllLayout from './PatientControllLayout'


const VerPaciente = () => {
  const { patientId } = useParams()
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL
  const [paciente, setPaciente] = useState<Patient | null>(null)
  const navigate = useNavigate()

  
  const fetchPaciente = useCallback(async () => {
    const response = await fetch(`${apiUrl}/users/${patientId}`)
    const data = await response.json()
    setPaciente(data)
  }, [apiUrl, patientId])

  const redirectToHistorial = () => {
    navigate(`/doctor/historial/${patientId}`)
  }

  useEffect(() => {
    fetchPaciente()
  }, [fetchPaciente])

  return (
    <PatientControllLayout>
        <h1 className='text-4xl font-bold text-center'>Ver Paciente</h1>
        <div className='flex flex-col gap-4 text-white'>
            <p className='text-2xl font-bold'>Nombre: <span className='text-info'>{paciente?.name}</span></p>
            <p className='text-2xl font-bold'>Teléfono: <span className='text-info'>{paciente?.phone}</span></p>
            <p className='text-2xl font-bold'>Cédula: <span className='text-info'>{paciente?.cedula}</span></p>
        </div>
        <div className='flex flex-col gap-4'>
            <p className='text-2xl font-bold'>Historial de citas: <span className='text-info'>{paciente?.historial.length}</span></p>
            <p className='text-2xl font-bold'>Fórmulas asignadas: <span className='text-info'>{paciente?.asignedFormulas.length}</span></p>
        </div>
        <div className='flex flex-col gap-4 text-white'>
            <div className='btn btn-primary' onClick={redirectToHistorial}>
                Mirar historial
            </div>
        </div>
    </PatientControllLayout>
  )
}

export default VerPaciente