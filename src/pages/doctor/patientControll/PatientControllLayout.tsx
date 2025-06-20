import React from 'react'
import NavBar from '../../../components/NavBar'

const PatientControllLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='flex flex-col gap-8 p-8 min-h-screen justify-center items-center'>
        <NavBar />
        {children}
    </div>
  )
}

export default PatientControllLayout