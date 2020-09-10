import React, { Component } from 'react'
import { Button } from '@material-ui/core'
import './App.css';

export default class Ccomponent extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            lat : null,
            long : null,
            cityName : '',
            temp : null,
            weather : '',
            href : '#',
            humidity : null,
            pressure : null,
            country : null
        }
        this.handelClick = this.handelClick.bind(this)
    }

    handelClick () {
            if (navigator.geolocation) { 
                navigator.geolocation.getCurrentPosition(
                    (position)=> {
                        console.log(position)
                        this.setState({
                            lat : position.coords.latitude,
                            long : position.coords.longitude,
                            href : `https://www.openstreetmap.org/#map=18/${this.state.lat}}/${this.state.long}`
                        })
                        fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${this.state.lat}&lon=${this.state.long}&appid=2887724757802138873b1a931a572b1f`)
                        .then((response) => {
                            return response.json();
                        })
                        .then((data) => {
                            console.log(data)
                            this.setState({
                                country : `Страна : ${data.sys.country}`,
                                cityName : `Город : ${data.name}`,
                                weather : `Погода : ${data.weather[0].main}`,
                                temp : `Температура : ${Math.round(data.main.temp-273)}°С`,
                                tempFeels : `Ощущается как : ${Math.round(data.main.feels_like-273)}°С`,
                                humidity : `Влажность : ${data.main.humidity}%`,
                                pressure : `Давление : ${Math.round(data.main.pressure/1.33322)} мм рт ст`
                            })
                        });
                    },

                     (error) => {
                        alert (error);
                    }
                )
            } else alert ('Cant find your position')
    }

    render() {
        return (
            <div>
                <select>
                    <option value = 'Minsk'>Минск</option>
                    <option value = 'Vitebsk'>Витебск</option>
                </select> <br></br>
                {this.state.test}
                <Button variant="contained" color="primary" onClick = {this.handelClick}>Find me</Button> 
                <br></br>
                <a href = {this.state.href} target = '_blank'><Button variant="contained" color="secondary">Show pos on map</Button> </a> <br></br>
                <div id = 'weather'>
                    {this.state.country}<br></br>
                    {this.state.cityName} <br></br>
                    {this.state.weather}<br></br>
                    {this.state.temp}<br></br>
                    {this.state.tempFeels}<br></br>
                    {this.state.humidity}<br></br>
                    {this.state.pressure} <br></br>
                </div>
            </div>
        )
    }
}




