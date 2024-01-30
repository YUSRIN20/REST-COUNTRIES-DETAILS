document.addEventListener("DOMContentLoaded", () => {

// Fetch data from the REST countries API
let fetchcall = fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((alldata) => {
        // Create a container div for the entire content
        const containerdiv = document.createElement("div");
        document.body.appendChild(containerdiv);
        containerdiv.className = "container";

        // Create a fluid container within the main container
        const containerfluid = containerdiv.appendChild(document.createElement("div"));
        containerfluid.className = "container-fluid";
        // containerfluid.style.margin="1em 0em"

        // Heading for all countries
        const h1elem = containerfluid.appendChild(document.createElement("h1"));
        h1elem.textContent = "All Countries Details & Weather Data";
        // h1elem.id= "title"
        h1elem.className = "text-center";
        h1elem.id = "Top-heading";

        // Create a section for country cards
        const rowdiv = containerdiv.appendChild(document.createElement("div"));
        rowdiv.className = "row";

        // Create a column div within the row for better layout
        const coldiv = rowdiv.appendChild(document.createElement("div"));
        coldiv.className = "col-lg-12 col-sm-12";    // not needed 

        // Create a flex row div within the column for individual country cards
        const flexrowdiv = coldiv.appendChild(document.createElement("div"));
        flexrowdiv.className = "row";

        // Loop through the data to create cards for each country
        for (let i = 0; i < alldata.length; i++) {
            // Create a div for each country card
            const individualdiv = flexrowdiv.appendChild(document.createElement("div"));
            individualdiv.className = "col-sm-6 col-md-4 col-lg-4 col-xl-4";
            individualdiv.style.padding = "2em";
            individualdiv.style.margin = "2em 0em";

            // Create a div for the main content of the country card
            const childdiv = individualdiv.appendChild(document.createElement("div"));
            childdiv.className = "card h-100 rounded-5 p-0";
            childdiv.id = "bg-color";
            childdiv.style.position = "relative";

            // Create a header div for the country name
            const cardheaderdiv = childdiv.appendChild(document.createElement("div"));
            cardheaderdiv.className = "card-header text-center rounded-top-5 p-0";
            cardheaderdiv.style.backgroundColor = "black";

            // cardheaderdiv.innerText  =alldata[i].name.common

            // Display the country name in an h1 element
            const countryname = cardheaderdiv.appendChild(document.createElement("h1"));
            countryname.className = "text-center";
            countryname.id = "title";
            countryname.innerText = alldata[i].name.common;

            // Create a div for additional country details
            const cardbodydiv = childdiv.appendChild(document.createElement("div"));
            cardbodydiv.className = "card-body";
            cardbodydiv.style.display = "flex";
            cardbodydiv.style.flexDirection = "column";
            cardbodydiv.style.alignItems = "center";
            cardbodydiv.style.justifyContent = "center";

            // Display the flag image
            const flagimages = cardbodydiv.appendChild(document.createElement("img"));
            flagimages.className = "card-img-top";
            flagimages.id = "image-s";
            flagimages.src = alldata[i].flags.png;
            flagimages.alt = alldata[i].name.common + " flag";

            // Create a div for the text details of the country card
            const cardtextdiv = cardbodydiv.appendChild(document.createElement("div"));
            cardtextdiv.className = "card-text ";

            // Display the country's capital
            const captialdiv = cardtextdiv.appendChild(document.createElement("div"));

            const captialname = captialdiv.appendChild(document.createElement("h3"));
            captialname.innerText = "Capital: " + alldata[i].capital;
            captialname.style.textAlign = "center";

            // Display the country's region
            const regiondiv = cardtextdiv.appendChild(document.createElement("div"));

            const regionname = regiondiv.appendChild(document.createElement("h3"));
            regionname.innerText = "Region: " + alldata[i].region;
            regionname.style.textAlign = "center";

            // Display the country's code
            const countrycodediv = cardtextdiv.appendChild(document.createElement("div"));
            const countrycode = countrycodediv.appendChild(document.createElement("h3"));
            countrycode.textContent = "Country Code:" + alldata[i].cca3;
            countrycode.style.textAlign = "center";
            
            // Display Population  
            const populationdiv = cardtextdiv.appendChild(document.createElement("div"))
            const populationdetails = populationdiv.appendChild(document.createElement("h3"))
            populationdetails.textContent = "Population:" + alldata[i].population
            populationdetails.style.textAlign = "center"
            // weather buttondiv 
            const weatherbuttondiv  = cardbodydiv.appendChild(document.createElement("div"))
            weatherbuttondiv.className = "row"


            // Create a button for fetching weather information
            const weatherbutton =weatherbuttondiv.appendChild(document.createElement("button"));
            weatherbutton.textContent = "Click for Weather";
            weatherbutton.className = "btn btn-primary";
            weatherbutton.style.fontSize = "large";
            weatherbutton.style.padding = "0.5em";
            weatherbutton.style.margin = "3em 0em";

            // Create a div for the weather popup
            const popupoverlay = containerdiv.appendChild(document.createElement("div"));
            popupoverlay.className = "popupoverlay";
            const popupbox = childdiv.appendChild(document.createElement("div"));
            popupbox.className = "popupbox";

            // Event listener for the weather button
            weatherbutton.addEventListener("click", () => {
                // Introduce a delay of 2 seconds before fetching weather information
                setTimeout(async () => {
                    try {
                        // Fetch weather information for the country
                        const weatherResponse = await getWeather(alldata[i].name.common);
                        console.log(weatherResponse);

                        // Display the weather popup box
                        popupoverlay.style.display = "block";
                        popupbox.style.display = "flex";
                        popupbox.style.flexDirection = "column"
                        popupbox.style.alignContent  ="center"

                        // Extract temperature, description, and wind speed from weatherResponse
                        const temperature = weatherResponse.main.temp;
                        const description = weatherResponse.weather[0].description;
                        const windspeed = weatherResponse.wind.speed;
                        const pressure = weatherResponse.main.pressure;
                        const humidity = weatherResponse.main.humidity;
                        const latitude = weatherResponse.coord.lat;
                        const longtitude = weatherResponse.coord.lon;

                        // Create elements for displaying weather details
                        const countryheading = popupbox.appendChild(document.createElement("h1"));
                        countryheading.id = "country-heading";

                        const line = popupbox.appendChild(document.createElement("hr"));

                        const tempDetails = popupbox.appendChild(document.createElement("h3"));
                        const descriptiondetails = popupbox.appendChild(document.createElement("h3"));
                        const windspeeddetails = popupbox.appendChild(document.createElement("h3"));
                        const pressuredetails = popupbox.appendChild(document.createElement("h3"));
                        const humiditydetails = popupbox.appendChild(document.createElement("h3"));
                        const latitudedetails = popupbox.appendChild(document.createElement("h3"));
                        const longtitudedetails = popupbox.appendChild(document.createElement("h3"));

                        // Create a button for closing the popup
                        const okbutton = popupbox.appendChild(document.createElement("button"));
                        okbutton.textContent = "Back";
                        okbutton.className = "btn btn-primary";
                        okbutton.id = "back-btn";

                        // Event listener for disabling the popup
                        okbutton.addEventListener("click", () => {
                            popupbox.style.display = "none";
                            popupoverlay.style.display = "none";
                        });

                        // Set the text content of elements with weather details
                        countryheading.textContent = `Weather details for ${alldata[i].name.common}  ` ;
                        tempDetails.textContent = `Temperature in ${alldata[i].name.common}: ${temperature} °C`;
                        descriptiondetails.textContent = `Description : ${description}`;
                        windspeeddetails.textContent = `WindSpeed : ${windspeed}m/s`;
                        pressuredetails.textContent = `Pressure: ${pressure}`;
                        humiditydetails.textContent = `Humidity: ${humidity}`;
                        latitudedetails.textContent = `Lat: ${latitude}`;
                        longtitudedetails.textContent = `Lon: ${longtitude}`;
                    } catch (err) {
                        console.error("Error fetching weather information:", err);
                    }
                }, 2000); // Timeout ends
            });
        } // Loop ends
    });

// Function to fetch weather information from OpenWeatherMap API
async function getWeather(country) {
    let weatherAPI =
        "https://api.openweathermap.org/data/2.5/weather?q=" +
        country +
        "&appid=425b0dd08f8e1137f1819825ac3ae34e&units=metric";
    let weatherOBJ = await fetch(weatherAPI);
    let response = await weatherOBJ.json();
    return response;
}
});