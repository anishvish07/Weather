import React, { Component } from 'react';
import Home from './Home';
import Weather from './Weather';
import './Container.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Description from './Description';
import 'animate.css';


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
            error : null
            
            

            }
    }
    
weatherUpdateHandler = (e) => {
    e.preventDefault();
    const city = e.target.parentElement.querySelector('[name="cityname"]').value;
    
   
    this.setState({ city , }, () => {
        console.log(city);
    });
   const apiKey = process.env.REACT_APP_API_KEY;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=standard`)
        .then((res) => {
            this.setState({ weatherData: res.data });
            console.log(this.state.weatherData);
            //second API call
                const lat = res.data.coord.lat;
                const lon = res.data.coord.lon;
                axios.get(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`)
                    .then((res) => {
                        this.setState({ AQi: res.data }, () => {
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
          // After setting the error state, you can display it here.
          console.log(this.state.error);
        });
                        console.log(err);
                    });
        }).catch((err) => {
              this.setState({ error: 'An error occurred while fetching weather data.' }, () => {
          // After setting the error state, you can display it here.
          console.log(this.state.error);
        });
            console.log(err);
        })
  
};


    render() {
        const{weatherData , cityname ,temperature , temp_min, pressure , humidity ,windSpeed ,AQi ,color ,error}= this.state;   
        return (
            <Router>
                <div>
                   <div className='container-fluid'>
    <nav className="navbar navbar-expand-lg opac">
        <Link className="navbar-brand fs-3 text-light header" to="/">
            <span role="img" aria-label="Weather Icon" ><img className=" icon-1 animate__animated animate__slideRight" src='./hot.png'/></span> Weather App
        </Link>
        <div className="collapse navbar-collapse move" id="navbarNav">
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link fs-5" to='/'>Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link fs-5" to='/Contact'>Contact</Link>
                </li>
            </ul>
        </div>
    </nav> 
      <Routes>
      <Route exact path="/" element={<Home weather={this.weatherUpdateHandler} weatherData = {weatherData ? weatherData : null} AQ = {AQi ? AQi : ''} AQi= {AQi ? AQi.list[0]?.components?.pm2_5  : ""} color ={color ? color : ''} humidity= {weatherData ? weatherData.main.humidity : ''} windSpeed={weatherData ? weatherData.wind.speed :""} pressure={weatherData ?weatherData.main.pressure : ""} temp_max ={weatherData?weatherData.main.temp_max:''} temp_min= {weatherData ? weatherData.main.temp_min :''} feels={weatherData ? weatherData.main.feels_like : ''} cityname ={weatherData ? weatherData.name : ''} temperature = {weatherData ? weatherData.main.temp : ''}  WeatherDescription={weatherData?weatherData.weather[0].description:''} />} />
   
      </Routes>
      </div>
      </div>
      </Router>
        );
    }
}
//weatherData data is put up into the render function inside the element section pass the weatherData's with anonymous name and assign it into all this.state...use the in another file by assigning it into render function and the used function inside the tag and that it . 
export default Container;
