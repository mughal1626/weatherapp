function handleSubmitForm(event) {
  event.preventDefault();
  const location = document.getElementById("location-input").value;
  apiCall(location);
  // save last searched location to local storage
  localStorage.setItem("lastLocation", location);
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

      // save data to local storage
      localStorage.setItem("lastTemp", z);
      localStorage.setItem("lastHumidity", data.main.humidity);
      localStorage.setItem("lastSpeed", data.wind.speed);
      localStorage.setItem("lastIcon", iconUrl);
      localStorage.setItem("lastIconText", data.weather[0].main);
    })
    .catch((error) => console.error(error));
}

// load data from local storage on page load
window.addEventListener("load", () => {
  const lastLocation = localStorage.getItem("lastLocation");
  if (lastLocation) {
    document.getElementById("location-input").value = lastLocation;
    apiCall(lastLocation);
  }

  const lastTemp = localStorage.getItem("lastTemp");
  if (lastTemp && localStorage.getItem("lastLocation") === document.getElementById("location-input").value) {
    document.getElementById("temp").innerHTML = lastTemp + ' °C';
  }

  const lastHumidity = localStorage.getItem("lastHumidity");
  if (lastHumidity && localStorage.getItem("lastLocation") === document.getElementById("location-input").value) {
    document.getElementById("humidity").innerHTML = lastHumidity + ' %';
  }

  const lastSpeed = localStorage.getItem("lastSpeed");
  if (lastSpeed && localStorage.getItem("lastLocation") === document.getElementById("location-input").value) {
    document.getElementById("speed").innerHTML = lastSpeed + ' m/s';
  }

  const lastIcon = localStorage.getItem("lastIcon");
  if (lastIcon && localStorage.getItem("lastLocation") === document.getElementById("location-input").value) {
    document.getElementById("icon").src = lastIcon;
  }

  const lastIconText = localStorage.getItem("lastIconText");
  if (lastIconText && localStorage.getItem("lastLocation") === document.getElementById("location-input").value) {
    document.getElementById("icon-text").innerText = lastIconText;
  }
});
