import { useCallback, useEffect, useState } from 'react'
import PatientControllLayout from '../PatientControllLayout'
import { useNavigate, useParams } from 'react-router-dom'
import type { UpdateHistorial } from '../../../../intefaces/User.interface'
import { historialApi } from '../../../../utils/api'
import { toast, ToastContainer } from 'react-toastify'

const EditarHistorial = () => {
    const { historialId } = useParams()
    const navigate = useNavigate()
    const [ loading, setLoading ] = useState<boolean>(false)
    const [historial, setHistorial] = useState<UpdateHistorial>({
        _id: historialId || '',         
        objetivoDeTerapia: '',
        tratamientoASeguir: ''
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setHistorial({
            ...historial,
            [e.target.name]: e.target.value,
        })
    }

    const fetchHistorial = useCallback( async (historialId: string) => {
        try {
            setLoading(true)
            const response = await historialApi.getById(historialId)
            setHistorial(response);
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false)
        }
    }, [])

    useEffect(() => {
        if (historialId) {
            fetchHistorial(historialId)
        }
    }, [historialId, fetchHistorial])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        
        try {
            if (historialId) {
                const data = await historialApi.update(historialId, historial)
                if (data) {
                    toast.success('Historial creado exitosamente')
                    navigate(-1)
                }         
            }
        } catch (error) {
            console.error('Error al editar historial:', error)
        }
    }

    return (
        <>
            {loading === false ? (
                <PatientControllLayout>
                    <h1 className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-10 md:mb-12'>Editar Historial</h1>
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
                                Editar Historial
                            </button>
                        </div>
                    </form>
                    <ToastContainer position='bottom-center'/>
                </PatientControllLayout>
            ) : (
                <div className="text-center text-white">Cargando...</div>
            )}
        </>
    )
}

export default EditarHistorial