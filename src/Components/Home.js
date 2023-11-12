import React from 'react';
import './Container.css';
import Description from './Description';
import {TiWeatherWindyCloudy} from 'react-icons/ti';
import 'animate.css'

const Home = (props) => {
   let {color} =props
    const { weather, cityname ,temperature,WeatherDescription , feels , temp_min ,temp_max ,pressure ,humidity, windSpeed ,AQi, weatherData , AQ } = props;
    const levelCheck = (AQi) =>{
      
      if(AQi <= 12){
        
        return "Good";
      }else if(AQi <= 100){
        
        return "Moderate"
      }else if(AQi <= 150){
       
        return " Unhealthy";
      }else if(AQi <=250){
          
        return "Very Poor";
      }else if(AQi <=420){
        return "Hazardous";
      }
  
    }
  
    
   
  
    return (
       
        <div className='container-fluid back-design'>
        
       
        <div className=' form-group col-lg combine'>
        <label className='design-text mx-3 text-dark' htmlFor='searchOption'></label>
        
        <input type='search' placeholder='Enter The City...' className='form-control ' name='cityname' id='searchOption'   required/>
          <button className=' we-btn mx-3' onClick={props.weather}><TiWeatherWindyCloudy/>°C</button>
            </div>
        <div className='border-design animate__animated animate__pulse'>
        
         <h1 className='p-4'>{cityname}, {weatherData ? weatherData.sys.country: ""}</h1>
         <h6 className='AQi-1' style={{color : color}}>Air Quality-{levelCheck(AQi)}</h6>
         <h3 className='AQi'>PM 2.5- {AQi?AQi:""} </h3>
       <img
             className='img-size px-3'
             src={`http://openweathermap.org/img/w/${weatherData ? weatherData.weather[0].icon : ''}.png`}
         alt='Weather-Icon'
         onError={(e) => {
    console.error('Error loading image:', e);
    e.target.onerror = ''; 
    e.target.src = './season.png';
  }}
                       />

         <h2 className='p-3 mt-4 text-light'>&emsp;{WeatherDescription} </h2>
         <h2 className='temp-adj animate__animated animate__fadeIn '>{(temperature) ? `${((temperature-273.15)).toFixed(2)}°C` : `${((temperature-273.15)).toFixed(2)}°K`}</h2>
         
          
        </div> 
       
        <div className='cardz'>
        <Description feels= {feels} temp_min = {temp_min} temp_max={temp_max} weatherData = {weatherData} pressure = {pressure} humidity ={humidity} windSpeed ={windSpeed} AQ = {AQ}/>
        </div>
         </div>
        

        
    );
}

export default Home;
