import React from 'react';
import './Description.css';
import {FaArrowDown, FaArrowUp,FaWind} from 'react-icons/fa';
import {BiHappy} from 'react-icons/bi';
import {MdCompress ,MdOutlineWaterDrop} from "react-icons/md";
import 'animate.css';
const Description = (props) => {
    const {feels , temp_min ,temp_max ,pressure ,humidity ,windSpeed ,weatherData ,AQ } = props;
    // let{data} =props
 const convertSecondsToHours = (second) => {
  
  if (second !== null) {
    let date = new Date(second * 1000); // Convert seconds to milliseconds

    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    let hours = ('0' + date.getHours()).slice(-2);
    let minutes = ('0' + date.getMinutes()).slice(-2);
    let seconds = ('0' + date.getSeconds()).slice(-2);

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  }
  return '';
};

let sunriseTime = weatherData ? weatherData.sys.sunrise : "";
let sunsetTime = weatherData ? weatherData.sys.sunset : "";

    return (
        <div>
            <div className='container'>
            <div className='row containers animate__animated animate__zoomIn'>
                  <div className=" overlay col-lg-2 colmn">
                  <div className='card'>
                   <h3><FaArrowDown/><sub className='text-dark fs-4 px-2' >Min</sub></h3>
                  <h2>{(temp_min) ? `${((temp_min-273.15)).toFixed(2)}°C` :`${((temp_min-273.15)).toFixed(2)}°k` }</h2>
                  <h6>Sunset: {convertSecondsToHours(sunsetTime)}</h6>
                  </div>
                  </div>
                  <div className=" overlay col-lg-2 colmn">
                  <div className='card'>
                  <h3><FaArrowUp/><sub className='text-dark fs-4 px-2' >Max</sub></h3>
                  <h2>{(temp_max) ? `${((temp_max-273.15)).toFixed(2)}°C` :`${((temp_max-273.15)).toFixed(2)}°k` }</h2>
                  <h6>Sunrise: {convertSecondsToHours(sunriseTime)}</h6>
                  </div>
                  </div>
                  <div className="overlay  col-lg-2 colmn">
                  <div className='card'>
                    <h3><BiHappy/><sub className='text-dark fs-4 px-2' >feels</sub></h3>
                  <h2>{(feels) ? `${((feels-273.15)).toFixed(2)}°C` :`${((feels-273.15)).toFixed(2)}°k` }</h2>
                  <h6>{weatherData ? weatherData.weather[0].description :''}</h6>
                  </div>
                  </div>
                  <div className=" overlay col-lg-2 colmn">
                  <div className='card'>
                    <h3><MdCompress/><sub className='text-dark fs-4 px-2' >Pressure</sub></h3>
                  <h2>{pressure}hPa</h2>
                  <h6>PM10- {AQ ? AQ.list[0]?.components?.pm10 : ''}</h6>
                  </div>
                  </div>
                  <div className="overlay col-lg-2 colmn">
                  <div className='card'>
                  <h4><MdOutlineWaterDrop/><sub className='text-dark fs-5 px-1' >humidity</sub></h4>
                  <h2>{humidity}%</h2>
                  <h6>so2- {AQ ? AQ.list[0]?.components?.so2 : ''}</h6>
                  </div>
                  </div>
                    <div className=" overlay col-lg-2 colmn">
                  <div className='card'>
                  <h3><FaWind/><sub className='text-dark fs-4 px-2' >wind</sub></h3>
                  <h2>{windSpeed}m/s</h2>
                  <h3>Deg:{weatherData ? weatherData.wind.deg : ""}°</h3>
                  <h6>o3- {AQ ? AQ.list[0]?.components?.o3 : ''}</h6>
                  </div>
                  </div>
                  </div>
            </div>
        </div>          
            
          
    );
}

export default Description;
