import React, {useEffect, useState } from 'react';
import { faCloudSun} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';

function CityNameHeader() {
    function formatDate(date) {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];
    
        let day = date.getDate();
        let monthIndex = date.getMonth();
        let year = date.getFullYear();
    
        return day + ' ' + monthNames[monthIndex] + ' ' + year;
    }
    
    function to24hr(timeString)
    {
        let date = new Date(`01/01/2020 ${timeString}`);
        let time24Hour = date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' });
        return time24Hour
    }

    let [city , setCity] = useState('Indore');

    let [resp_data , setData] = useState(
        {name :'Indore',region:'Madhya Pradesh',country:'India',
        temp_c:0,wind_mph:0,sunrise:'',sunset:'',maxtemp_c:0,mintemp_c:0,condition:''});

    let today_date = formatDate(new Date());

    let [isFormSubmitted , setFormSubmit] = useState(true);

    useEffect(()=>{
        if((isFormSubmitted)){
            // used to get current status
            axios
              .get(`http://api.weatherapi.com/v1/forecast.json?key=0b455af06ef24f8daaf183947232007&q=${city}`)
              .then((res) => {
                var loc = res.data.location;
                var cur = res.data.current;
                var forecast = res.data.forecast.forecastday;
                var astro = forecast[0].astro;
                var maxtemp_c = forecast[0].day.maxtemp_c;
                var mintemp_c = forecast[0].day.mintemp_c;
                setData(resp_data => ({...resp_data,name:loc.name,region:loc.region,country:loc.country,temp_c:cur.temp_c,wind_mph:cur.wind_mph
                    ,sunrise:to24hr(astro.sunrise),sunset:to24hr(astro.sunset),maxtemp_c:maxtemp_c,mintemp_c:mintemp_c,condition:cur.condition.text}));

              })
              .catch((error)=>{
                console.log(error);
              });
              setFormSubmit(false);
          }
          // eslint-disable-next-line
    },[isFormSubmitted,resp_data]);

    function submitData(e){
        e.preventDefault();
        setFormSubmit(true);
      }
    
    return (
        <div className='container'>
            <div className="row">
                <div className='col-sm-10 col-md-8 col-lg-6 mt-2'>
                    <div className='row'>
                        <div className='col-1'>
                            <label htmlFor="city" className="col-form-label">City</label>
                        </div>
                        <div className='col-8'>
                            <input type="text" id="city" value={city} onChange={(e)=>setCity(e.target.value)} className="form-control ms-1" />
                        </div>
                        <div className='col-2'>
                            <button className='btn btn-success' onClick={(e)=>submitData(e)}>Search</button>
                        </div>
                    </div>
                </div>
            </div>

            <h1 className='mt-3'>
                {resp_data.name} , {resp_data.region} , {resp_data.country}
            </h1>
            <div>
                {today_date}
            </div>
            <div className='container-fluid '>
                <div className='row mt-2'>
                    <div className='col-xs-12 col-sm-6'>
                        <h1 className='large-text p-2 nowrap'>
                            <FontAwesomeIcon className='large-text' icon={faCloudSun} />
                            &nbsp;{resp_data.temp_c}&deg;
                        </h1>
                        <div className='below-text text-secondary'>{resp_data.condition}</div>
                    </div>
                    <div className='col-xs-12 col-sm-6 mt-2'>
                        <div className='row'>
                            <div className='col-4'>
                                <h3>
                                    {resp_data.maxtemp_c} &deg;
                                </h3>
                                <p className='text-secondary'>High</p>
                            </div>
                            <div className='col-4'>
                                <h3>
                                    {resp_data.wind_mph}mph
                                </h3>
                                <p className='text-secondary'>Wind</p>
                            </div>
                            <div className='col-4'>
                                <h3>
                                    {resp_data.sunrise}
                                </h3>
                                <p className='text-secondary'>Sunrise</p>
                            </div>
                        </div>
                        <div className='row mt-3'>
                            <div className='col-4'>
                                <h3>
                                    {resp_data.mintemp_c} &deg;
                                </h3>
                                <p className='text-secondary'>
                                    Low
                                </p>
                            </div>
                            <div className='col-4'>
                                <h3>
                                    0%
                                </h3>
                                <p className='text-secondary'>
                                    Rain
                                </p>
                            </div>
                            <div className='col-4'>
                                <h3>
                                    {resp_data.sunset}
                                </h3>
                                <p className='text-secondary'>
                                    Sunset
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default CityNameHeader