import React, { Component } from 'react';
import Home from './Home';
import Weather from './Weather';
import './Container.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Description from './Description';
import 'animate.css';
import ContactUsCard from './Weather';


class Container extends Component {
   
    constructor(props){
        super(props);
        this.state = {
            cityname: '',
            lat: '',
            lon: '',
            weatherData: '',
            temperature:'',
            windSpeed : '',
            WeatherDescription:'',
            country:'',
            humidity:'',
            pressure:"",
            temp_min:'',
            temp_max:'',
            AQi :'',
            color:'' ,
            error : null,
           
            
            

            }
    }
    
    
weatherUpdateHandler = (e) => {
    e.preventDefault();
    let city = e.target.parentElement.querySelector('[name="cityname"]').value;
    
  
    this.setState({ city , }, () => {
        console.log(city);
    });
     const apiKey = process.env.REACT_APP_API_KEY;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=standard`)
        .then((res) => {
            this.setState({ weatherData: res.data });
            console.log(this.state.weatherData);
            
                const lat = res.data.coord.lat;
                const lon = res.data.coord.lon;
                axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                    .then((res) => {
                        this.setState({ AQi: res.data }, () => {
                            console.log('Lat:', lat);
                            console.log('Lon:', lon);
                            console.log('API Key:', apiKey);
                            console.log(this.state.AQi);
                            if(this.state.AQi.list[0]?.components?.pm2_5  > 100){
                               this.setState({color : 'red' });
                            }else if(this.state.AQi.list[0]?.components?.pm2_5  > 60){
                               this.setState({color : 'yellow' });
                            }else {
                                this.setState({color : 'green'})
                            }
                        });
                    })
                    .catch((err) => {
                          this.setState({ error: 'An error occurred while fetching weather data.' }, () => {
        
          console.log(this.state.error);
        });
                        console.log(err);
                    });
        }).catch((err) => {
              this.setState({ error: 'An error occurred while fetching weather data.' }, () => {
        
          console.log(this.state.error);
        });
            console.log(err);
        })
  
};




    render() {
        const{weatherData , cityname ,temperature , temp_min, pressure , humidity ,windSpeed ,AQi ,color ,error ,contact}= this.state;   
        return (
            <Router>
                <div>
                   <div className='container-fluid'>
    <nav className="navbar navbar-expand-lg opac">
        <Link className="navbar-brand fs-3 text-light header" to="/">
            <span role="img" aria-label="Weather Icon" ><img className=" icon-1 animate__animated animate__slideRight" src='./rain.png'/>Weather <span className='text-primary fw-bold'>Whiz</span></span> 
         
        </Link>
        <div className="collapse navbar-collapse move" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item ">
                    <Link className="nav-link fs-5 text-light" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fs-5" to='/Contact'>Contact</Link>
                </li>
            </ul>
             
        </div>
       
    </nav> 
      <Routes>
      <Route exact path="/" element={<Home weather={this.weatherUpdateHandler} weatherData = {weatherData ? weatherData : null} AQ = {AQi ? AQi : ''} AQi= {AQi ? AQi.list[0]?.components?.pm2_5  : ""} color ={color ? color : ''} humidity= {weatherData ? weatherData.main.humidity : ''} windSpeed={weatherData ? weatherData.wind.speed :""} pressure={weatherData ?weatherData.main.pressure : ""} temp_max ={weatherData?weatherData.main.temp_max:''} temp_min= {weatherData ? weatherData.main.temp_min :''} feels={weatherData ? weatherData.main.feels_like : ''} cityname ={weatherData ? weatherData.name : ''} temperature = {weatherData ? weatherData.main.temp : ''}  WeatherDescription={weatherData?weatherData.weather[0].description:''} />} />
      <Route exact path='/Contact' element={<Weather/>}/>
      </Routes>
      </div>
      </div>
      </Router>
        );
    }
}

export default Container;
