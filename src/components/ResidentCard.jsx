import axios from 'axios'
import React, { useEffect, useState } from 'react'

export const ResidentCard = ({urlResidents}) => {
    
    const [resident, setResident] = useState()
    
    useEffect(() => {
      const URL=urlResidents
        axios.get(URL)
        .then((res)=>{
            setResident(res.data)
        })
        .catch((err)=>console.log(err))
    }, [])
    

  return (
    <div className='card-container'>
        <header >
          <div >
              <img className='resident-image-container'src={resident?.image} alt="" />
          </div>
            
        </header>
        <section className='info-resident-container'>
        <h3>{resident?.name}</h3>
        <div className='status-container'>
          <div className={`circle ${resident?.status}`}></div>
          <div>{resident?.status} - {resident?.species}</div>
        </div>

            
            <p className='resident-info'><span>Origin:</span>   {resident?.origin.name}</p>
            <p className='resident-info'><span>Number of episodes: </span>{resident?.episode.length}</p>
        </section>
    </div>
  )
}
