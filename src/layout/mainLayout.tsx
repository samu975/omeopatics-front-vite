import React from 'react'

const mainLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <div className='min-h-screen bg-base-300'>
      {children}
    </div>
  )
}

export default mainLayout