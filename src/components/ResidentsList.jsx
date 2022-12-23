import React from 'react'
import { ResidentCard } from './ResidentCard'

const ResidentsList = ({residentsFilter}) => {

  return (
    <div className="residents-list">
        {
            residentsFilter?.map((urlResidents)=>(
                <ResidentCard key={urlResidents} urlResidents={urlResidents}/>
            ))
        }
    </div>
  )
}

export default ResidentsList