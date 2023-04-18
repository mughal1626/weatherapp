function handleSubmitForm(event) {
    event.preventDefault();
    const location = document.getElementById("location-input").value;
    apiCall(location);
  }
  
  function apiCall(location) {
    const apiKey = "97a8ad58907ac911a6d24210f106a427";
    const regex = /^[0-9]+$/;
    let url = "";
    
    if (regex.test(location)) {
      
      url = `https://api.openweathermap.org/data/2.5/weather?zip=${location}&appid=${apiKey}`;
    } else {
      
      url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    }
  
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        let x = data.main.temp;
        let y = x - 273.15;
        let z = y.toFixed(0);
        document.getElementById("temp").innerHTML = z+' °C';
        document.getElementById("humidity").innerHTML = data.main.humidity +' %';
        document.getElementById("speed").innerHTML = data.wind.speed +' m/s';
        const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
        document.getElementById("icon").src = iconUrl;
      })
      .catch((error) => console.error(error));
  }
  