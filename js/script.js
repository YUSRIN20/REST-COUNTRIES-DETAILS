// Fetch data from the REST countries API
let fetchcall = fetch("https://restcountries.com/v3.1/all")
    .then((res) => res.json())
    .then((alldata) => {
        // Create a container div for the entire content
        const containerdiv = document.createElement("div");
        document.body.appendChild(containerdiv);
        containerdiv.className = "container";

        // Heading for all countries
        const h1elem = containerdiv.appendChild(document.createElement("h1"));
        h1elem.textContent = "All Countries";
        h1elem.className = "text-center";

        // Create a section for country cards
        const cardsectiondiv = containerdiv.appendChild(
            document.createElement("div")
        );
        cardsectiondiv.className = "row row-cols-1 row-cols-md-3 g-4";

        for (let i = 0; i < alldata.length; i++) {
            // Create a div for each country card
            const individualdiv = cardsectiondiv.appendChild(
                document.createElement("div")
            );
            individualdiv.className = "col";
            individualdiv.style.padding = "2em";
            individualdiv.style.margin = "2em 0em";
            individualdiv.style.position = "relative";

            // Create a div for the main content of the country card
            const childdiv = individualdiv.appendChild(document.createElement("div"));
            childdiv.className = "card";
            childdiv.id = "bg-color";

            // Country name
            const countryname = childdiv.appendChild(document.createElement("h1"));
            countryname.className = "card-title text-center";
            countryname.id = "title";
            countryname.innerText = alldata[i].name.common;

            // Flag image
            const flagimages = childdiv.appendChild(document.createElement("img"));
            flagimages.className = "card-img-top";
            flagimages.id = "image-s";
            flagimages.src = alldata[i].flags.png;
            flagimages.alt = alldata[i].name.common + " flag";

            // Create a div for additional country details
            const cardbodydiv = childdiv.appendChild(document.createElement("div"));
            cardbodydiv.className = "cardbody";
            cardbodydiv.style.display = "flex";
            cardbodydiv.style.flexDirection = "column";
            cardbodydiv.style.alignItems = "center";
            cardbodydiv.style.justifyContent = "center";

            // Country capital
            const captialname = cardbodydiv.appendChild(document.createElement("h2"));
            captialname.innerText = "Capital: " + alldata[i].capital;
            captialname.style.textAlign = "center";

            // Country region
            const regionname = cardbodydiv.appendChild(document.createElement("h2"));
            regionname.innerText = "Region: " + alldata[i].region;
            regionname.style.textAlign = "center";

            // Create a div for displaying the country code and weather button
            const countrycode = cardbodydiv.appendChild(document.createElement("h2"));
            const weatherbutton = cardbodydiv.appendChild(
                document.createElement("button")
            );
            weatherbutton.textContent = "Click for Weather";
            weatherbutton.className = "btn btn-primary";
            weatherbutton.style.fontSize = "large";
            weatherbutton.style.padding = "0.5em";
            weatherbutton.style.margin = "3em 0em";

            // Create a div for the weather popup
            const popupoverlay = document.createElement("div");
            document.body.appendChild(popupoverlay);
            popupoverlay.className = "popupoverlay";
            const popupbox = document.createElement("div");
            document.body.appendChild(popupbox);
            popupbox.className = "popupbox";

            weatherbutton.addEventListener("click", () => {
                // Introduce a delay of 2 seconds before fetching weather information
                setTimeout(async () => {
                    try {
                        // Fetch weather information for the country
                        const weatherResponse = await getWeather(alldata[i].name.common);
                       console.log(weatherResponse)
                        // Display popup box
                        popupoverlay.style.display = "block";
                        popupbox.style.display = "block";

                        // Calculate the center position of the clicked country card
                        const divCenterX = childdiv.offsetLeft + childdiv.offsetWidth / 2;
                        const divCenterY = childdiv.offsetTop + childdiv.offsetHeight / 2;

                        // Set the position of the popupbox at the center of the clicked card
                        popupbox.style.top = `${divCenterY}px`;
                        popupbox.style.left = `${divCenterX}px`;

                        // Display country code
                        countrycode.textContent =
                            "Country Code:" + weatherResponse.sys.country;
                        countrycode.style.textAlign = "center";

                        // Extract temperature, description, and wind speed from weatherResponse
                        const temperature = weatherResponse.main.temp;
                        const minTemp = weatherResponse.main.temp_min
                        const maxTemp = weatherResponse.main.temp_max
                        const description = weatherResponse.weather[0].description;
                        const windspeed = weatherResponse.wind.speed;

                        // Create elements for displaying weather details
                        const countryheading = popupbox.appendChild(
                            document.createElement("h1")
                        );
                        const line = popupbox.appendChild(document.createElement("hr"));

                        const tempDetails = popupbox.appendChild(
                            document.createElement("h3")
                        );
                        const descriptiondetails = popupbox.appendChild(
                            document.createElement("h3")
                        );
                        const windspeeddetails = popupbox.appendChild(
                            document.createElement("h3")
                        );
                        const okbutton = popupbox.appendChild(
                            document.createElement("button")
                        );
                        okbutton.textContent = "ok";
                        okbutton.className = "btn btn-primary";

                        // Event listener for disabling the popup
                        okbutton.addEventListener("click", () => {
                            popupbox.style.display = "none";
                            popupoverlay.style.display = "none";
                        });

                        // Set the text content of elements with weather details
                        countryheading.textContent = `Weather details for ${alldata[i].name.common}`;
                        tempDetails.textContent = `Temperature in ${alldata[i].name.common}: ${temperature} °C`;
                        descriptiondetails.textContent = `Description : ${description}`;
                        windspeeddetails.textContent = `WindSpeed : ${windspeed}m/s`;
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
