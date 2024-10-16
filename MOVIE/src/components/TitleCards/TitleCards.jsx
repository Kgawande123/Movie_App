import React, { useEffect, useRef, useState } from 'react'
import './TitleCards.css'
 import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';
 

 


const TitleCards = ({title,category}) => {

  const [apiData, setApiData] =useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjNTg1NWNlNmVkYmMyY2M3ZWNlYzNiMDhkNWM1OGY4MCIsIm5iZiI6MTcyODg5NzAzMS40OTg5MjcsInN1YiI6IjY3MGNkZTI1NDExMWJlNGYwMjc1MGQ5MSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EEdUO_yQK2T64x5BAK4LN0R13AJUl4yMxseK7YfVgms'
    }
  };
  
  

  const handlewheel=(event)=>{
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  
  }
  
    useEffect(()=>{
      fetch(`https://api.themoviedb.org/3/movie/${category?category:"now_playing"}?language=en-US&page=1`, options)
    .then(response => response.json())
    .then(response => setApiData(response.results))
    .catch(err => console.error(err));
      cardsRef.current.addEventListener('wheel',handlewheel);
  
    },[])
  return (
    <div className='title-cards'>
      <h2>{title?title:"Popular in Netflix"} </h2>
      <div className="card-list" ref={cardsRef}> 
        {apiData.map((card, index)=>{
          return <Link to={`/player/${card.id}`} className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500`+card.backdrop_path} alt=''/>
            <p>{card.original_title}</p>
          </Link>

        })}
      </div>
    </div>
  )
}

export default TitleCards