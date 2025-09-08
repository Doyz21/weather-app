# Weather App 🌤️

A modern, responsive weather application that provides real-time weather information for cities worldwide. Built with vanilla HTML, CSS, and JavaScript, featuring a clean dark theme and intuitive user interface.

## ✨ Features

- **Real-time Weather Data**: Get current weather conditions for any city
- **Temperature Units**: Switch between Celsius (°C) and Fahrenheit (°F)
- **Comprehensive Weather Info**: 
  - Current temperature with min/max values
  - Weather description and icon
  - Real feel temperature
  - Humidity percentage
  - Wind speed
  - Atmospheric pressure
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Clean UI**: Modern dark theme with smooth animations
- **Search Functionality**: Easy city search with real-time updates

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with flexbox and grid
- **JavaScript (ES6+)**: Dynamic functionality and API integration
- **Font Awesome**: Icons for weather information
- **Google Fonts**: Poppins font family
- **Open-Meteo API**: Free weather data service
- **Geocoding API**: Location coordinates lookup

## 🏗️ Project Structure

```
weather-app/
├── index.html          # Main HTML structure
├── style.css           # Styling and responsive design
├── weather.js          # JavaScript functionality
└── README.md           # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection for API calls

### Installation

1. **Clone or download the project files**
   ```bash
   git clone https://github.com/Doyz21/weather-app
   cd weather-app
   ```

2. **Open the application**
   - Double-click `index.html` to open in your default browser
   - Or use a local server (recommended):
     ```bash
     # Using Python
     python -m http.server 8000
     
     # Using Node.js (http-server)
     npx http-server
     
     # Using Live Server (VS Code extension)
     Right-click index.html → Open with Live Server
     ```

3. **Start using the app**
   - The app will load with weather data for "Pamulang" by default
   - Search for any city using the search bar
   - Toggle between °C and °F using the unit buttons

## 🎯 How to Use

1. **Search for a City**: Type the city name in the search bar and press Enter
2. **Change Temperature Units**: Click on °C or °F to switch between Celsius and Fahrenheit
3. **View Weather Details**: The app displays:
   - Current temperature and weather condition
   - Daily minimum and maximum temperatures
   - Real feel temperature
   - Humidity level
   - Wind speed
   - Atmospheric pressure

## 🔧 API Integration

This app uses two free APIs:

### Open-Meteo Geocoding API
- **Purpose**: Convert city names to coordinates
- **Endpoint**: `https://geocoding-api.open-meteo.com/v1/search`
- **No API key required**

### Open-Meteo Weather API
- **Purpose**: Fetch weather data using coordinates
- **Endpoint**: `https://api.open-meteo.com/v1/forecast`
- **No API key required**

## 📱 Responsive Breakpoints

- **Desktop**: Full layout with side-by-side elements
- **Tablet** (≤936px): Stacked header layout
- **Mobile** (≤400px): Single column weather cards

## 🎨 Customization

### Changing the Default City
In `weather.js`, modify the initial city:
```javascript
let currCity = "Pamulang";
```

### Styling Modifications
- **Colors**: Update CSS variables in `style.css`
- **Fonts**: Change the Google Fonts import in `style.css`
- **Layout**: Modify flexbox/grid properties for different arrangements

### Adding Weather Parameters
The Open-Meteo API supports additional parameters. Update the API call in `getWeather()` function to include more data like:
- UV Index
- Visibility
- Cloud cover
- Precipitation

## 🐛 Troubleshooting

### Common Issues

1. **City not found error**
   - Check city spelling
   - Try including country name (e.g., "London, UK")

2. **Weather data not loading**
   - Check internet connection
   - Ensure APIs are accessible (no firewall blocking)

3. **Icons not displaying**
   - Verify Font Awesome CDN is loading
   - Check browser console for errors

## 🔮 Future Enhancements

- [ ] 5-day weather forecast
- [ ] Geolocation support
- [ ] Weather alerts and notifications
- [ ] Favorite cities list
- [ ] Weather maps integration
- [ ] Dark/light theme toggle
- [ ] Weather history data

## 👨‍💻 Author

**Ahmad Sahl P**
- Created a modern weather application with clean design and responsive layout

## 🙏 Acknowledgments

- **Open-Meteo**: For providing free weather APIs
- **Font Awesome**: For the weather icons
- **Google Fonts**: For the Poppins font family
- **OpenWeatherMap**: For weather condition icons

---

**Enjoy checking the weather! 🌈**