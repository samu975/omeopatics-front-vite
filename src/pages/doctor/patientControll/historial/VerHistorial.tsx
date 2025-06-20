
import { useCallback, useEffect, useState } from 'react'
import PatientControllLayout from '../PatientControllLayout'
import type { Patient } from '../../../../intefaces/User.interface'
import { useNavigate, useParams } from 'react-router-dom'

const VerHistorial = () => {
  const { patientId } = useParams()
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL
  const [paciente, setPaciente] = useState<Patient | null>(null)
  const navigate = useNavigate()
  
  const fetchPaciente = useCallback(async () => {
    const response = await fetch(`${apiUrl}/users/${patientId}`)
    const data = await response.json()
    setPaciente(data)
  }, [apiUrl, patientId])

  const redirectToCreateAppointment = () => {
    navigate(`/doctor/create-historial/${patientId}`)
  }

  useEffect(() => {
    fetchPaciente()
  }, [fetchPaciente])

  return (
    <PatientControllLayout>
        <h1 className='text-4xl font-bold text-center'>Ver Historial</h1>
        <div className='flex flex-col gap-4 text-white'>
            <p className='text-2xl font-bold'>Nombre: <span className='text-info'>{paciente?.name}</span></p>
            <p className='text-2xl font-bold'>Teléfono: <span className='text-info'>{paciente?.phone}</span></p>
            <p className='text-2xl font-bold'>Cédula: <span className='text-info'>{paciente?.cedula}</span></p>
        </div>
        {paciente?.historial && paciente?.historial.length && paciente?.historial.length > 0 ? (
            <div className='flex flex-col gap-4 text-white'>
                <p className='text-2xl font-bold'>Historial: <span className='text-info'>{paciente?.historial.length}</span></p>
            </div>
        ) : (
            <div className='flex flex-col gap-4 text-white'>
                <p className='text-2xl font-bold text-error text-center'>No hay historial para este paciente</p>
                <div className='btn btn-success w-auto mx-auto text-white text-center font-bold text-lg' onClick={redirectToCreateAppointment}>
                    Crear historial
                </div>
            </div>
        )}
    </PatientControllLayout>
  )
}

export default VerHistorial