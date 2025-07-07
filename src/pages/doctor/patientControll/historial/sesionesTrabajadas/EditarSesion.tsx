import { useNavigate, useParams } from 'react-router-dom'
import PatientControllLayout from '../../PatientControllLayout'
import { useState, useEffect } from 'react'
import type { SesionTrabajada } from '../../../../../intefaces/User.interface'
import { historialApi } from '../../../../../utils/api'
import { toast } from 'react-toastify'

const EditarSesion = () => {
  const { historialId, index } = useParams()
  const navigate = useNavigate()
  const [sesion, setSesion] = useState<SesionTrabajada>({
    fechaSesion: new Date(),
    queSeHizo: '',
    recomendacionesProximaSesion: ''
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSesion = async () => {
      if (historialId && typeof index !== 'undefined') {
        try {
          const historial = await historialApi.getById(historialId)
          if (historial && Array.isArray(historial.sesionesTrabajadas)) {
            // Invertir el array para que el índice coincida con el mostrado
            const sesionesReversadas = [...historial.sesionesTrabajadas].reverse()
            const sesionSeleccionada = sesionesReversadas[Number(index)]
            if (sesionSeleccionada) {
              setSesion({
                ...sesionSeleccionada,
                // Asegurarse de que la fecha sea un objeto Date
                fechaSesion: new Date(sesionSeleccionada.fechaSesion)
              })
            }
          }
        } catch {
          toast.error('Error al cargar la sesión')
        } finally {
          setLoading(false)
        }
      }
    }
    fetchSesion()
  }, [historialId, index])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSesion({
      ...sesion,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (historialId && typeof index !== 'undefined') {
      try {
        // Traer el historial para obtener el índice real
        const historial = await historialApi.getById(historialId)
        if (historial && Array.isArray(historial.sesionesTrabajadas)) {
          const totalSesiones = historial.sesionesTrabajadas.length
          // El índice real es el reversado respecto al array original
          const indexReal = totalSesiones - 1 - Number(index)
          await historialApi.editSesion(historialId, indexReal, sesion)
          toast.success('Sesión editada correctamente')
          navigate(-1)
        }
      } catch (error) {
        console.error('Error al editar sesión:', error)
        toast.error('Error al editar sesión')
      }
    }
  }

  if (loading) {
    return <div className="text-center text-white">Cargando sesión...</div>
  }

  return (
    <PatientControllLayout>
        <h1 className='text-4xl font-bold text-center mb-8'>Editar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 my-4'>
            <label htmlFor="queSeHizo" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>¿Qué se trabajó hoy?</label>
            <textarea name="queSeHizo" value={sesion.queSeHizo} onChange={handleChange} className='bg-gray-800 text-white p-2 rounded-md h-60' />
          </div>
          <div className='flex flex-col gap-4 my-4'>
            <label htmlFor="recomendacionesProximaSesion" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Recomendaciones para la próxima sesión</label>
            <textarea name="recomendacionesProximaSesion" value={sesion.recomendacionesProximaSesion} onChange={handleChange} className='bg-gray-800 text-white p-2 rounded-md h-60' />
          </div>
          <button type="submit" className='btn btn-primary w-full mt-4'>Guardar Cambios</button>
        </form>
    </PatientControllLayout>
  )
}

export default EditarSesion