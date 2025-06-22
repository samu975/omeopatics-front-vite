import { useNavigate, useParams } from 'react-router-dom'
import PatientControllLayout from '../../PatientControllLayout'
import { useState } from 'react'
import type { SesionTrabajada } from '../../../../../intefaces/User.interface'
import { historialApi } from '../../../../../utils/api'
import { toast } from 'react-toastify'

const AgregarSesion = () => {
  const { historialId } = useParams()
  const navigate = useNavigate()
  const [sesion, setSesion] = useState<SesionTrabajada>({
    fechaSesion: new Date(),
    queSeHizo: '',
    recomendacionesProximaSesion: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSesion({
      ...sesion,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (historialId) {
      try {
        const response = await historialApi.addSesion(historialId, sesion)
        if (response) {
            toast.success('Sesión agregada correctamente')
            navigate(-1)
        }
      } catch (error) {
        console.error('Error al agregar sesión:', error)
        toast.error('Error al agregar sesión')
      }
    }
  }

  return (
    <PatientControllLayout>
        <h1 className='text-4xl font-bold text-center mb-8'>Agregar Sesión</h1>
        <form onSubmit={handleSubmit}>
          <div className='flex flex-col gap-4 my-4'>
            <label htmlFor="queSeHizo" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Que se trabajo hoy ?</label>
            <textarea name="queSeHizo" value={sesion.queSeHizo} onChange={handleChange} className='bg-gray-800 text-white p-2 rounded-md h-60' />
          </div>
          <div className='flex flex-col gap-4 my-4'>
            <label htmlFor="recomendacionesProximaSesion" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Recomendaciones para la próxima sesión</label>
            <textarea name="recomendacionesProximaSesion" value={sesion.recomendacionesProximaSesion} onChange={handleChange} className='bg-gray-800 text-white p-2 rounded-md h-60' />
          </div>
          <button type="submit" className='btn btn-primary w-full mt-4'>Agregar Sesión</button>
        </form>
    </PatientControllLayout>
  )
}

export default AgregarSesion