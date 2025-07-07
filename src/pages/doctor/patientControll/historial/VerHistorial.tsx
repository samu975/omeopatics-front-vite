import { useCallback, useEffect, useState } from 'react'
import PatientControllLayout from '../PatientControllLayout'
import type { GetHistorial, Patient } from '../../../../intefaces/User.interface'
import { useNavigate, useParams } from 'react-router-dom'
import { historialApi } from '../../../../utils/api'
import { FaEdit } from 'react-icons/fa'

const VerHistorial = () => {
  const { patientId } = useParams()
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL
  const [paciente, setPaciente] = useState<Patient | null>(null)
  const [historial, setHistorial] = useState<GetHistorial[] | null>(null)

  const navigate = useNavigate()
  
  const fetchPaciente = useCallback(async () => {
    const response = await fetch(`${apiUrl}/users/${patientId}`)
    const data = await response.json()
    setPaciente(data)
  }, [apiUrl, patientId])

  const fetchHistorial = useCallback(async () => {
    if (patientId) {
      const response = await historialApi.getByPatient(patientId)
      setHistorial(response)
    }
  }, [apiUrl, patientId])

  const redirectToCreateAppointment = () => {
    navigate(`/doctor/create-historial/${patientId}`)
  }

  const redirectToAddSession = (historialId: string) => {
    navigate(`/doctor/historial/agregar-sesion/${historialId}`)
  }

  const handleClickOnEdit = (index: number, historialId: string) => {
    navigate(`/doctor/historial/${historialId}/sesiones/${index}`)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  useEffect(() => {
    fetchPaciente()
  }, [])

  useEffect(() => {
    if (paciente?.historial && paciente?.historial.length && paciente?.historial.length > 0) {
      fetchHistorial()
    }
  }, [fetchHistorial, paciente])

  return (
    <PatientControllLayout>
        <h1 className='text-4xl font-bold text-center mb-8'>Ver Historial</h1>
        <div className='flex flex-col gap-4 text-white mb-8'>
            <p className='text-2xl font-bold'>Nombre: <span className='text-info'>{paciente?.name}</span></p>
            <p className='text-2xl font-bold'>Teléfono: <span className='text-info'>{paciente?.phone}</span></p>
            <p className='text-2xl font-bold'>Cédula: <span className='text-info'>{paciente?.cedula}</span></p>
        </div>
        {historial ? (
            <div className='flex flex-col gap-6'>
                {historial.map((historial) => (
                    <div key={historial._id} className='bg-base-200 rounded-lg p-6 shadow-lg'>
                        {/* Header del historial */}
                        <div className='flex justify-between items-center mb-6 pb-4 border-b border-base-300'>
                            <div className='text-white'>
                                <p className='text-lg font-semibold'>Historial ID: <span className='text-info'>{historial._id}</span></p>
                                <p className='text-sm text-gray-400'>Creado el: <span className='text-info'>{formatDate(historial.fechaCreacion)}</span></p>
                            </div>
                            <button 
                                className='btn btn-success text-white font-bold'
                                onClick={() => redirectToAddSession(historial._id)}
                            >
                                Agregar Sesión
                            </button>
                        </div>

                        {/* Objetivo de la Terapia */}
                        <div className='mb-6'>
                            <h3 className='text-xl font-bold text-white mb-2'>Objetivo de la Terapia</h3>
                            <p className='text-white bg-base-300 p-4 rounded-lg'>
                                {historial.objetivoDeTerapia}
                            </p>
                        </div>

                        {/* Tratamiento a Seguir */}
                        <div className='mb-6'>
                            <h3 className='text-xl font-bold text-white mb-2'>Tratamiento a Seguir</h3>
                            <p className='text-white bg-base-300 p-4 rounded-lg'>
                                {historial.tratamientoASeguir}
                            </p>
                        </div>

                        {/* Sesiones Trabajadas */}
                        <div>
                            <h3 className='text-xl font-bold text-white mb-2'>Sesiones Trabajadas</h3>
                            {historial.sesionesTrabajadas && historial.sesionesTrabajadas.length > 0 ? (
                                <div className='bg-base-300 p-4 rounded-lg'>
                                    <p className='text-white'>Total de sesiones: <span className='text-info font-bold'>{historial.sesionesTrabajadas.length}</span></p>
                                    {historial.sesionesTrabajadas
                                        .slice()
                                        .reverse()
                                        .map((sesion, index) => (
                                        <div key={index} className='bg-base-200 p-4 rounded-lg mb-4'>
                                          <div className='flex justify-end w-full cursor-pointer' onClick={() => {
                                            handleClickOnEdit(index, historial._id)
                                          }}>
                                            <FaEdit className='flex self-end' />
                                          </div>
                                            <p className='text-white'>Fecha: <span className='text-info font-bold'>{formatDate(sesion.fechaSesion.toString())}</span></p>
                                            <p className='text-white'>Que se hizo: <span className='text-info font-bold'>{sesion.queSeHizo}</span></p>
                                            <p className='text-white'>Recomendaciones para la próxima sesión: <span className='text-info font-bold'>{sesion.recomendacionesProximaSesion}</span></p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className='bg-base-300 p-4 rounded-lg'>
                                    <p className='text-white text-center italic'>Todavía no hay sesiones con el paciente</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
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