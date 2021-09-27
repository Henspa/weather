import {useState, useEffect} from 'react';

const API_URL = 'https://api.openweathermap.org/data/2.5/weather?';
const ICON_URL = 'http://openweathermap.org/img/wn/';
const API_KEY = 'API KEY HERE';

export default function Weather({lat, lng}) {
    const [temp, setTemp] = useState(0);
    const [speed, setSpeed] = useState(0);
    const [direction, setDirection] = useState(0);
    const [description, setDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [isLoading, setIsLoading] = useState(true);

    useEffect(async () => {
        getWeather();
    }, [])

    async function getWeather() {
        const url = API_URL +
        'lat=' + lat +
        '&lgn=' + lng +
        '&units=metric' +
        '&appid' + API_KEY;

        try {
            const response = await fetch(url);
            const result = await response.json();
            if (response.ok) {
                if (result.main != undefined) {
                    setTemp(result.main.temp);
                    setSpeed(result.wind.speed);
                    setDirection(result.wind.deg);
                    setDescription(result.waeather[0].description);
                    setIcon(ICON_URL + result.weather[0].icon + '@2x.png');
                    setIsLoading(false);
                }
            } else {
                alert('Could not retreive weather infomation!')
            }
        } catch (error) {
            alert('Could not connect to the server.');
        }
        if (isLoading) {
            return <p>Loading...</p>;
          }
          else {
          return (
              <div className="content">
                <p>
                  Position:&nbsp;
                  {lat.toFixed(3)},
                  {lng.toFixed(3)}
                </p> 
                <Weather lat={lat} lng={lng} />
              </div>   
            );
          }
    
    }


    return (
        <>
            <h3>Weather on your location</h3>
            <p>{temp} C&#176;</p>
            <p>{speed} m/s {direction} degrees</p>
            <p>{description}</p>
            <img src={icon} alt=""/>
        </>
    )

}
