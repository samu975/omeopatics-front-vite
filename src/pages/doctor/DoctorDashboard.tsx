import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User } from '../../intefaces/User.interface';

const DoctorDashboard = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState<User | null>(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  }

  const handleCreatePatient = () => {
    navigate('/doctor/create-patient');
  }

  const handlePatientList = () => {
    navigate('/doctor/patients');
  }

  const handleBankQuestions = () => {
    navigate('/doctor/bank-questions');
  }


  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    const userData = JSON.parse(user || '{}');
    
    if (!token || !user) {
      navigate('/login');
    } else {
      setUser(userData);
    }
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-20">
      <div className='flex justify-end w-full my-6 lg:text-xl'>
        <div className='btn btn-error text-white lg:h-12 lg:text-lg' onClick={handleLogout}>Cerrar sesión</div>
      </div>
      <h1 className="text-2xl font-bold lg:text-4xl">Bienvenido {user?.name}</h1>
      <h2 className="text-lg lg:text-2xl lg:my-4">Que deseas hacer hoy ? </h2>
      <div className='flex flex-col items-center justify-center my-4 gap-4 lg:gap-6'>
        <div className='btn btn-success w-full lg:text-xl lg:py-4 text-white lg:h-12' onClick={handleCreatePatient}>
          Crear Paciente
        </div>
        <div className='btn btn-primary w-full lg:text-xl lg:py-4 text-white lg:h-12' onClick={handlePatientList}>
          Seguimiento de pacientes
        </div>
        <div className='btn btn-secondary w-full lg:text-xl lg:py-4 text-white lg:h-12' onClick={handleBankQuestions}>
          Banco de preguntas
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard