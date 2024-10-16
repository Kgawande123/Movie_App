import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from "../../assets/back_arrow_icon.png"
import { useNavigate, useParams } from 'react-router-dom'

const player = () => {
  const{id} = useParams();
  const navigate = useNavigate();

  const [apiData, setApiData] = useState({
    name:"",
    key:"",
    published_at:"",
    typeof:""
  })

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTg1NWNlNmVkYmMyY2M3ZWNlYzNiMDhkNWM1OGY4MCIsIm5iZiI6MTcyODg5NzAzMS40OTg5MjcsInN1YiI6IjY3MGNkZTI1NDExMWJlNGYwMjc1MGQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EEdUO_yQK2T64x5BAK4LN0R13AJUl4yMxseK7YfVgms'
    }
  };
  useEffect(()=>{
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results[0]))
    .catch(err => console.error(err));

  },[])
  
  
  return (
    <div className='player'>
      <img src={back_arrow_icon} alt=''onClick={()=>{navigate(-2)}}/>
      <iframe width="90%" height="90%" src={`https://www.youtube.com/embed/${apiData.key}`}
      title='trailer' frameBorder='0' allowFullscreen></iframe>
        <div className="player-info">
          <p>{apiData.published_at.slice(0,10)}</p>
          <p>{apiData.name}</p>
          <p>{apiData.type}</p>
        </div>

      
    </div>
  )
}

export default player