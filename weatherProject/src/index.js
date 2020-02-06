const API_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=9d5b59f6e7f7e77586dc0269e6d0438a&q=';
import {load} from './fetchData';




const template = '<div><img src="images/rainy.png" alt="Давление"></div>' +
    '<div><img src="images/warm.png" alt="Температура"></div>' +
    '<div><img src="images/humidity.png" alt="Влажность"></div>' +
    '<div><img src="images/wind.png" alt="Ветер"></div>' +
    '<div><img src="images/cloud.png" alt="Облачность"></div>' +
    '<div>{{main.pressure}}</div>' +
    '<div>{{main.temp}}</div>' +
    '<div>{{main.humidity}}%</div>' +
    '<div>{{wind.speed}} м/с</div>' +
    '<div>{{clouds.all}}%</div>';


document.getElementById('form').onsubmit = (event) => {
    handleSubmit(event);
};

function handleSubmit (e) {
    e.preventDefault();
    let city = e.target.cityName.value;
    load(API_URL+city,
        function(err, data) {
            if (err !== null) {
                if (err === 'Not found'){
                    document.getElementById('root').innerText = 'City not found';
                }
                else {
                    document.getElementById('root').innerText = 'Invalid input';
                }
            } else {
                $(document.getElementById('root')).html(Mustache.render(template, data));
            }
        });
    e.target.cityName.value = '';
}