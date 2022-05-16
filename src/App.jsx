import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Characters from './Componets/Characters';
import './Componets/style.css'


const App = () => {

  const [location, setLocation] = useState([]);
  const [allLocation, setAllLocation] = useState({});
  const [selectLocation, setSelectLocation] = useState({});
  const [isShowing, setiIsShowing] = useState(false);
  let tempAllLocation = []


  const getAllLocation = (next) => {

    //se revisa si no hay mas paginas de siguiente en la Api
    if (!next) {
      setAllLocation(tempAllLocation)
      return
    }

    //almacenamos los nuevos elementos de la pagina actual
    axios.get(next)
      .then(res => {
        res.data?.results.map(e => tempAllLocation.push(e))
        getAllLocation(res.data?.info.next)
      })
  }

  //Peticion a la api de toda la informacion
  useEffect(() => {

    getAllLocation('https://rickandmortyapi.com/api/location')

    //Mandamos un apeticion a la api para colocar la primera locacion aleatorio 
    let randomNumber = Math.floor(Math.random() * 126)
    axios.get(`https://rickandmortyapi.com/api/location/${randomNumber}`)
      .then(res => setSelectLocation(res.data))
  }, [])

  //Encuetra las concidencias con lo que los que ese esta buscando con los resultados del input de la busqueda 
  const onChangeSearch = (e) => {
    const result = allLocation.filter(x => x.name.toLowerCase().startsWith(e.toLowerCase()))
    setLocation(result)
  }

  //Optiene el id para luego setearlo en el setSelectLocation
  const getIds = (id) => {

    const found = allLocation.find(e => e.id === id)
    setSelectLocation(found)
    setiIsShowing(false)

  }

  return (
    <div>

      <div className="wallpaper"></div>

      <h1 id='main-tittle'>Rick and Morty Wiki</h1>

      <div className="content">
        <div className="search">
          <input id='input' type="text" placeholder='Type a location name' onChange={(e) => onChangeSearch(e.target.value)} onClick={() => setiIsShowing(true)} />


          {/* Captura el id del elemento seleccionado y mapea las sugerencias  */}

          <div className="list-locations" style={{ display: isShowing ? 'block' : 'none' }}>
            {location.map((e, i) => (
              i < 10 ? <button key={e.name} onClick={() => getIds(e.id)} >{e.name}</button> : null
            ))}
          </div>
        </div>

        <div className="location">
          <h1>{selectLocation.name}</h1>
          <p> Type: <b>{selectLocation.type}</b></p>
          <p>Dimension: <b>{selectLocation.dimension}</b></p>
          <p> Total residents: <b>{selectLocation.residents?.length}</b></p>
        </div>
        <h1 id='titleResidents'>Residents</h1>
        <div className='father-cards'>
          {selectLocation.residents?.map((resident) => (
            <Characters key={resident} resident={resident} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App