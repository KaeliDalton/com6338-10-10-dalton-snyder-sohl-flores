const API = "2df62c30dae6653493ac68c2bd19af8b"
const weather = document.getElementById('weather')
const form = document.querySelector('form')
const search = document.getElementById('weather-search')
const weatherDiv = document.getElementById('weather-div')

form.onsubmit = async function (e) {
    e.preventDefault()
    const URL = "https://api.openweathermap.org/data/2.5/weather?q="
    let city = this.search.value.trim()
    const usedURL = `${URL}${city}&units=imperial&appid=${API}`
    //if no input given, clear form
    if ((!city) || (search.value = "")){
        city = ''
        weatherDiv.innerHTML = ''
        search.value = ''
    }
    try{
        const res = await fetch(usedURL)
        if(res.status !== 200)
       throw new Error('Location Not Found')
       const data = await res.json()
       console.log(data)
       displayData(data)
    }
       catch(err){
           weatherDiv.innerHTML = err.message
   }
}

//check past cities searched
if (localStorage.getItem('city')){
    const pastSearch = JSON.parse(localStorage.getItem('city'));
    displayData(pastSearch);
}

const displayData = (data) => {
    city = ""
    weatherDiv.innerHTML = ""
    search.value = ''
    localStorage.setItem('city', JSON.stringify(data));
    
//show city
const location = document.createElement('h2')
const {
    name, 
    sys: {country,sunrise,sunset,}, 
    coord: {lat,lon},
    weather: [
        {icon, description}
    ],
    main: {temp, feels_like},
    dt,
 } = data
weatherDiv.appendChild(location)
location.textContent = `${name}, ${country}`

//show map link
const mapLink = document.createElement('a')
const googleMap = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`
weatherDiv.appendChild(mapLink)
mapLink.textContent = "Click to View Map"
mapLink.href = googleMap
mapLink.target = "_BLANK"

//show weather condition icon
const iconEl = document.createElement('img')
const iconCode = icon
const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`
iconEl.src = iconURL
iconEl.alt = data.name
weatherDiv.appendChild(iconEl)

//show weather condition
const condition = document.createElement('p')
condition.setAttribute('style', 'text-transform: capitalize')
condition.textContent = description
weatherDiv.appendChild(condition)

//show current temperature
const temperature = document.createElement('p')
const temperatureNumber = temp
temperature.textContent = `Current: ${temperatureNumber}° F`
weatherDiv.appendChild(temperature)

//show feels like temperature
const feelsLike = document.createElement('p')
const feelsLikeTemp = feels_like
feelsLike.textContent = `Feels like: ${feelsLikeTemp}° F`
weatherDiv.appendChild(feelsLike)

const sunriseDateTime = document.createElement('p')
const sunriseDate = new Date((sunrise) * 1000)
const sunriseTime = sunriseDate.toLocaleTimeString('en-US',  {
    hour: 'numeric', 
    minute: '2-digit'})
sunriseDateTime.textContent = `Sunrise: ${sunriseTime}`
weatherDiv.appendChild(sunriseDateTime)

const sunsetDateTime = document.createElement('p')
const sunsetDate = new Date((sunset) * 1000)
const sunsetTime = sunsetDate.toLocaleTimeString('en-US',  {
    hour: 'numeric', 
    minute: '2-digit'})
sunsetDateTime.textContent = `Sunset: ${sunsetTime}`
weatherDiv.appendChild(sunsetDateTime)

//show time updated
const dateTime = document.createElement('p')
const date = new Date((dt) * 1000)

const time = date.toLocaleTimeString('en-US', {
    hour: 'numeric', 
    minute: '2-digit'})
dateTime.textContent = `Last Updated: ${time}`
weatherDiv.appendChild(dateTime)
}