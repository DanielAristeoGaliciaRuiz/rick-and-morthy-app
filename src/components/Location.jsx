import React from 'react'

export const Location = ({location}) => {

  return (
    <section className='general-info-container'>

        <h2>{location?.name}</h2>
        
        < div className='info-dimenssion-container' >
          <p className='personal-info'><span >Type: </span>{location?.type} </p>
          <p className='personal-info'> <span >Dimension: </span>{location?.dimension}</p>
           <p className='personal-info'><span >Population: </span>{location?.residents.length}</p>
         
        </div>
    </section>
  )
}
