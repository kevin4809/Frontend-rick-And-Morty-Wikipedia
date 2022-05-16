import axios from 'axios';
import React, { useEffect, useState } from 'react'


const Characters = ({ resident }) => {

  const [getResidents, setGetResidents] = useState({});
  const [changeColor, setChangeColor] = useState("green")

  useEffect(() => {

    axios.get(resident)
      .then(res => setGetResidents(res.data))

  }, [resident])


  useEffect(() => {

    if (getResidents.status === "Alive") {
      setChangeColor("green")
    } else if (getResidents.status === "Dead") {
      setChangeColor("red")
    } else {
      setChangeColor("gray")
    }

  }, [getResidents.status])

  return (


    <div className='cards'>

      <div className="card-image">
        <img src={getResidents.image} alt="" />
      </div>

      <div className="card-info">

        <h1>{getResidents.name}</h1>
        <p className='colorText'> Gender </p>
        <p> <b>{getResidents.gender}</b></p>
        <div className="state">
          <div style={{ background: changeColor }} red id='icon'></div>
          <p>  {getResidents.status} - {getResidents.species}</p>
        </div>
        <p className='colorText'>Origin </p>
        <p> <b>{getResidents.origin?.name}</b></p>
        <p className='colorText'>episodes numbers</p>
        <p> <b>{getResidents.episode?.length}</b> </p>
      </div>

    </div>
  )
}

export default Characters