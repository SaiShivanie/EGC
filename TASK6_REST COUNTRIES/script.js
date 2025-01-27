let countriesData = []; // Store all countries data

// Fetch countries data from API
function fetchCountries() {
    const apiURL = "https://restcountries.com/v3.1/all";
  
    fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then((data) => {
            console.log("Fetched data:", data);
            countriesData = data; // Store data globally
            displayCountries(countriesData); // Display all countries initially
        })
        .catch((error) => {
            console.error("Error fetching countries data:", error);
        });
}

// Display countries in cards
function displayCountries(countries) {
    const container = document.getElementById("countries-container");
    container.innerHTML = ""; // Clear existing cards
    
    countries.forEach((country) => {
        const { name, capital, latlng, flags, region, currencies } = country;
        let currencyInfo = "Not Available";

        if (currencies) {
            const currencyKeys = Object.keys(currencies);
            if (currencyKeys.length > 0) {
                const currency = currencies[currencyKeys[0]];
                currencyInfo = `${currency.name} (${currency.symbol})`;
            }
        }

        // Create a new card element
        const card = document.createElement("div");
        card.className = "country-card";

        // Add content to card
        card.innerHTML = `
            <img src="${flags?.svg}" alt="${name.common} Flag">
            <h2>${name.common}</h2>
            <p><strong>Capital:</strong> ${capital ? capital[0] : "Not Available"}</p>
            <p><strong>Region:</strong> ${region}</p>
            <p><strong>Coordinates:</strong> ${latlng ? latlng.join(", ") : "Not Available"}</p>
            <p><strong>Currency:</strong> ${currencyInfo}</p>
        `;

        // Append card to container
        container.appendChild(card);
    });
}

// Search countries by name
function handleSearch() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const filteredCountries = countriesData.filter(country => 
        country.name.common.toLowerCase().includes(searchTerm)
    );
    displayCountries(filteredCountries); // Display filtered countries
}

// Filter countries by region
function handleFilter(region) {
    const filteredCountries = countriesData.filter(country => 
        country.region.toLowerCase().includes(region.toLowerCase())
    );
    displayCountries(filteredCountries); // Display filtered countries
}

// Toggle dark mode
function Toggle() {
    document.body.classList.toggle("dark-mode");
}

// Toggle dropdown menu visibility
function filter() {
    document.getElementById("myDropdown").classList.toggle("show");
}

// Close dropdown if clicked outside
window.onclick = function(event) {
    if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName("dropdown-content");
        for (var i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
};

// Initial function call to fetch countries and display
fetchCountries();
