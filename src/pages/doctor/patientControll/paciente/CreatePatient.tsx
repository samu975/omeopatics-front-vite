import { useEffect, useState } from "react"
import { toast, ToastContainer } from "react-toastify"
import { useNavigate } from "react-router-dom"
import type { CreatePatient as CreatePatientType } from "../../../../intefaces/User.interface"
import PatientControllLayout from "../PatientControllLayout";


const CreatePatient = () => {

  const navigate = useNavigate()

  const [patient, setPatient] = useState<CreatePatientType>({
    role: 'patient',
    name: '',
    phone: '',
    cedula: '',
    password: '',
    asignedFormulas: [],
    historial: [],
    loveLanguagesTestEnabled: false
  })

  const [error, setError] = useState({
    name: '',
    phone: '',
    cedula: ''
  })
  const apiUrl = import.meta.env.VITE_PUBLIC_API_URL

  const postPaciente = async () => {
    patient.password = patient.phone
    const response = await fetch(`${apiUrl}/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(patient)
    })
    if (response.status === 201) {
      toast.success('Paciente creado correctamente', {
        onClose: () => navigate('/doctor/patients'),
        autoClose: 2000  
      })
    }

    if (response.status === 409) {
      toast.error('No pueden existir pacientes con la misma cédula')
    }
    
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, [e.target.name]: e.target.value })
    if (e.target.name === 'cedula') {
      setError(prev => ({ ...prev, cedula: '' }))
    }
  }

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPatient({ ...patient, [e.target.name]: e.target.checked })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let hasError = false

    if(patient.name.length < 3) {
      setError(prev => ({ ...prev, name: 'El nombre debe tener al menos 3 caracteres' }))
      hasError = true
    }
    if(patient.phone.length < 10) {
      setError(prev => ({ ...prev, phone: 'El teléfono debe tener al menos 10 caracteres' }))
      hasError = true
    }

    if (!hasError) {
      postPaciente()
    }
  }

  useEffect(() => {
    if (error.name || error.phone || error.cedula) {
      const timeoutId = setTimeout(() => {
        setError({ name: '', phone: '', cedula: '' })
      }, 10000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [error.name, error.phone, error.cedula])


  return (
    <PatientControllLayout>
      <h1 className="text-4xl font-bold text-center">Crear Paciente</h1>
    <form onSubmit={handleSubmit} className='flex flex-col gap-8 w-full max-w-md items-center'>
        <input
          type="text"
          name="name"
          placeholder="Nombre"
          onChange={handleChange}
          className='input input-bordered input-primary w-full'
          value={patient.name}
        />
        <input
          type="text"
          name="cedula"
          placeholder="Cédula"
          onChange={handleChange}
          className='input input-bordered input-primary w-full'
          value={patient.cedula}
        />
        <input
          type="text"
          name="phone"
          placeholder="Teléfono"
          onChange={handleChange}
          className='input input-bordered input-primary w-full'
          value={patient.phone}
        />
        <label htmlFor="loveLanguagesTest" className="text-xl text-left w-full">Habilitar test lenguaje de amor ?</label>
        <div className="flex justify-between w-full mb-4">
          <input
            id="loveLanguagesTest"
            name="loveLanguagesTestEnabled"
            type="checkbox"
            className="checkbox checkbox-primary"
            onChange={handleChecked}
            checked={!!patient.loveLanguagesTestEnabled}
          />
        </div>
        <button type="submit" className='bg-success text-white p-2 rounded-md w-full cursor-pointer'>Crear Paciente</button>
        {error.name && <p className='text-red-500'>{error.name}</p>}
        {error.phone && <p className='text-red-500'>{error.phone}</p>}
        {error.cedula && <p className='text-red-500'>{error.cedula}</p>}
        <ToastContainer position='bottom-center'/>
    </form>
    </PatientControllLayout>
  )
}

export default CreatePatient