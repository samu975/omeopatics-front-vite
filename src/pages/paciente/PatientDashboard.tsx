import { useEffect, useState } from 'react';
import type { User } from '../../intefaces/User.interface';
import { useLogout } from '../../hooks/useLogout';
import { useRedirectTo } from '../../hooks/useRedirectTo';

const PatientDashboard = () => {

  const [user, setUser] = useState<User | null>(null);

  const logout = useLogout()
  const redirectTo = useRedirectTo();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        console.error('Error parsing user data:', error);
        logout();
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen px-20">
      <div className='flex justify-end w-full my-6 lg:text-xl'>
        <div className='btn btn-error -mt-6 mb-5 text-white lg:h-12 lg:text-lg' onClick={logout}>Cerrar sesión</div>
      </div>
      <h1 className="text-2xl font-bold lg:text-4xl">Bienvenido <span className='text-primary'>{user?.name}</span></h1>
      <h2 className="text-lg my-6 lg:text-2xl lg:my-8">Que deseas hacer hoy ? </h2>
      <div className='flex flex-col items-center justify-center my-4 gap-4 lg:gap-6'>
        {/* Boton formulas asignadas */}
        {/* <div className='btn btn-success w-full lg:text-xl lg:py-4 text-white lg:h-12' onClick={() => redirectTo('/patient/formulas/ver')}>
          Ver formulas asignadas
        </div> */}
        <div className='btn btn-primary w-full lg:text-xl lg:py-4 text-white lg:h-12' onClick={() => redirectTo('/patient/test/ver')}>
          Ver test asignados
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard
