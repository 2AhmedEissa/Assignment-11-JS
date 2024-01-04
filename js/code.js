const apiKey = "0e455e0b9c3543a4871125549240401";

async function search(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`
    );

    if (response.ok && response.status !== 400) {
      const data = await response.json();
      displayCurrent(data.location, data.current);
      displayAnother(data.forecast.forecastday);
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function displayCurrent(location, current) {
  if (current !== null) {
    const date = new Date(current.last_updated.replace(" ", "T"));
    const forecastHTML = `
      <div class="today forecast">
        <div class="forecast-header d-flex  justify-content-between" id="today">
          <div class="day">${days[date.getDay()]}</div>
          <div class="date">${date.getDate()} ${
      monthNames[date.getMonth()]
    }</div>
        </div>
        <div class="forecast-content" id="current">
          <div class="location">${location.name}</div>
          <div class="degree">
            <div class="num">${current.temp_c}<sup>o</sup>C</div>
            <div class="forecast-icon">
              <img src="https:${current.condition.icon}" alt="" width=90>
            </div>
          </div>
          <div class="custom">${current.condition.text}</div>
          <span><img src="img/icon-umberella.png" alt="">20%</span>
          <span><img src="img/icon-wind.png" alt="">18km/h</span>
          <span><img src="img/icon-compass.png" alt="">East</span>
        </div>
      </div>`;

    document.getElementById("temp-info").innerHTML = forecastHTML;
  }
}

function displayAnother(forecastDays) {
  let forecastHTML = "";
  for (let i = 1; i < forecastDays.length; i++) {
    const date = new Date(forecastDays[i].date.replace(" ", "T"));
    forecastHTML += `
      <div class="forecast">
        <div class="forecast-header">
          <div class="day">${days[date.getDay()]}</div>
        </div>
        <div class="forecast-content">
          <div class="forecast-icon">
            <img src="https:${
              forecastDays[i].day.condition.icon
            }" alt="" width=48>
          </div>
          <div class="degree">${
            forecastDays[i].day.maxtemp_c
          }<sup>o</sup>C</div>
          <small>${forecastDays[i].day.mintemp_c}<sup>o</sup></small>
          <div class="custom">${forecastDays[i].day.condition.text}</div>
        </div>
      </div>`;
  }

  document.getElementById("temp-info").innerHTML += forecastHTML;
}

document.getElementById("search").addEventListener("input", (event) => {
  search(event.target.value);
});

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
    
search("cairo");
