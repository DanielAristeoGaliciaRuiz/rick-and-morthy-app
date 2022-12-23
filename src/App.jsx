
import axios from 'axios'
import { useEffect, useState } from 'react'
import './App.css'
import { Location } from './components/Location'
import LocationFilter from './components/LocationFilter'
import { ResidentCard } from './components/ResidentCard'
import ResidentsList from './components/ResidentsList'
import { getRandomNumber } from './utils/getRandomNumber'

const RESIDENTS_PER_PAGE=15
function App() {
  const [location, setLocation] = useState()
  const [locationName, setLocationName] = useState()
  const [currentPage, setCurrentPage] = useState(1)
  const [lastPage, setLastPage] = useState(1)
  const [residentsFilter, setResidentsFilter] = useState([])

  const getDimensionInfo=(id)=>{
       const URL=`https://rickandmortyapi.com/api/location/${id}`
    axios.get(URL)
    .then((res)=>setLocation(res.data))
    .catch((err)=>console.log(err))
   
   
  }

  useEffect(() => {
    const randomDimension= getRandomNumber()
    getDimensionInfo(randomDimension)
  }, [])
  
  const handleSubmit=(event)=>{
    event.preventDefault()
    const newDimension=event.target.searcherDimension.value
    getDimensionInfo(newDimension)
  }

  const handleOnChange=(event)=>{
      setLocationName(event.target.value)
  }

  const getNewDimension=(URL,name)=>{
      setLocationName(name)
      axios.get(URL)
      .then((res)=>setLocation(res.data))
      .catch((err)=>console.log(err))
  }

  const getAllPages=()=>{
    const arrayPages=[]
    for(let i=1;i<=lastPage;i++){
      arrayPages.push(i)
    }
    return arrayPages
  }
  
  useEffect(() => {
    const lastResidentCut=currentPage*RESIDENTS_PER_PAGE
    const firstResidentCut=lastResidentCut-RESIDENTS_PER_PAGE
    const newResidentFilter=location?.residents.slice(firstResidentCut,lastResidentCut)
    setResidentsFilter(newResidentFilter)
  }, [location,currentPage])
  

  useEffect(() => {
    if(location){
          const quantityResidents=location.residents.length
          const quantityPages=Math.ceil(quantityResidents/RESIDENTS_PER_PAGE)
          setLastPage(quantityPages)
          setCurrentPage(1)
    }

  }, [location])
  
  
  
  return (
    <div className="App">
      <div className='header-image-container'>
       
      </div >
      <Location location={location}/>

      <div className='searcher-form-container'>
      <form className='searcher-form' onSubmit={handleSubmit}>
        <input className='searcher-form-input' id='searcherDimension' value={locationName}
       onChange={handleOnChange} type="text" placeholder='Search a dimension'/>
      </form>
      </div>

      <LocationFilter 
      getNewDimension={getNewDimension} 
      locationName={locationName}/>
  
    <ResidentsList  residentsFilter={residentsFilter}/>
    <ul className='list-pages'>
      {
        getAllPages().map(page=> (
        <li 
        className={currentPage===page?"currentPage":""}
        onClick={()=>setCurrentPage(page)} 
        key={page} >{page}</li>) )
      }
    </ul>
    </div>
  )
}

export default App
