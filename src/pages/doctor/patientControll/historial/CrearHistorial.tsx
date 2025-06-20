import { useState } from 'react'
import PatientControllLayout from '../PatientControllLayout'
import { useNavigate, useParams } from 'react-router-dom'
import type { CreateHistorial } from '../../../../intefaces/User.interface'
import { historialApi } from '../../../../utils/api'
import { toast, ToastContainer } from 'react-toastify'

const CrearHistorial = () => {
    const { patientId } = useParams()
    const navigate = useNavigate()
    const [historial, setHistorial] = useState<CreateHistorial>({
        patient: patientId || '',
        objetivoDeTerapia: '',
        tratamientoASeguir: '',
        sesionesTrabajadas: []
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setHistorial({
            ...historial,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            const data = await historialApi.create(historial)
            console.log('Historial creado exitosamente:', data)
            toast.success('Historial creado exitosamente')
            navigate('/doctor/historial/' + patientId)
        } catch (error) {
            console.error('Error al crear historial:', error)
            alert(`Error al crear historial: ${error instanceof Error ? error.message : 'Error desconocido'}`)
        }
    }

    return (
        <PatientControllLayout>
            <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 md:mb-12'>Crear Historial</h1>
            <form onSubmit={handleSubmit} className='flex flex-col card p-4 md:p-8 lg:p-12 shadow-lg bg-base-100 lg:w-1/2'>
                <div className='flex flex-col gap-4 my-4'>
                    <label htmlFor="objetivoDeTerapia" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Objetivo de la Terapia</label>
                    <textarea 
                        name="objetivoDeTerapia" 
                        value={historial.objetivoDeTerapia} 
                        onChange={handleChange} 
                        className='textarea textarea-bordered w-full lg:text-xl' 
                        rows={3}
                        placeholder="Describe el objetivo principal de la terapia para este paciente"
                        required
                    />
                </div>
                <div className='flex flex-col gap-4 my-4'>
                    <label htmlFor="tratamientoASeguir" className='text-lg font-bold text-white md:text-xl lg:text-2xl'>Tratamiento a Seguir</label>
                    <textarea 
                        name="tratamientoASeguir" 
                        value={historial.tratamientoASeguir} 
                        onChange={handleChange} 
                        className='textarea textarea-bordered w-full lg:text-xl' 
                        rows={3}
                        placeholder="Describe el tratamiento recomendado para el paciente"
                        required
                    />
                </div>
                <div className='flex flex-col gap-4 my-4'>
                    <button type="submit" className='btn btn-primary w-full mx-auto text-white text-center font-bold text-xl'>
                        Crear Historial
                    </button>
                </div>
            </form>
            <ToastContainer position='bottom-center'/>
        </PatientControllLayout>
    )
}

export default CrearHistorial