const API_KEY = "5510902497bd7d29062574807af17631"

const getDATA = async (city,units='metric') =>{

    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=Metric&appid=${API_KEY}&units=${units}`
    const makeIconURL =(iconId) => `http://openweathermap.org/img/wn/${iconId}@2x.png`
    const data = await fetch(url).then((res)=>res.json).then((data)=>data);

    const {weather,main: {temp,feels_like,temp_min,temp_max,pressure,humidity},wind:{speed},sus:{country},name}=data;

    const {description,icon}=weather[0];

    return{
        description,
        iconURL : makeIconURL(icon),
        temp,
        temp_max,
        temp_min,
        pressure,
        humidity,
        speed,
        country,
        name
    }
};


export {getDATA}