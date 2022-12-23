import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LocationFilter = ({locationName,getNewDimension}) => {

    const [locationOptions, setLocationOptions] = useState()

    useEffect(() => {
        if(!locationName) return setLocationOptions()
        const URL=`https://rickandmortyapi.com/api/location?name=${locationName}`
        axios.get(URL)
        .then((res)=>setLocationOptions(res.data.results))
        .catch((err)=>console.log(err)) 
    }, [locationName])
    


  return (
    <ul className='list-container'>
        {
            locationOptions?.map((locationOption)=><li className='list-item' onClick={()=>getNewDimension(locationOption.url,locationOption.name)}
             key={locationOption.url}>{locationOption.name}</li> )
        }
    </ul>
  )
}

export default LocationFilter