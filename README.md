# 🌤 **Weather App - Features & Description** 🌤  


#### **Overview**  
The Weather App provides real-time weather updates based on the user's current location or any searched city. It displays temperature, humidity, weather conditions, and a five-day forecast with a clean, minimal UI.  

---

## **Features & Functionalities**  

### **Location-Based Weather Updates**  
- Automatically detects the user's current location using the **Geolocation API**.  
- Displays real-time weather conditions for the detected city on startup.  

### **City Search Functionality**  
- Users can search for any city’s weather by entering its name.  
- If the city name is invalid, a **notification pop-up** alerts the user.  

### **Temperature Conversion (°C ↔ °F)**  
- Toggle between **Celsius (°C)** and **Fahrenheit (°F)** with correct unit conversions.  

### **Dynamic Background Based on Temperature**  
- Background color changes dynamically:  
  - Cold (Blue) - Below 0°C  
  - Cool (Green) - 0 to 15°C  
  - Mild (Yellow) - 15 to 25°C  
  - Warm (Pink) - 25 to 35°C  
  - Hot (Red) - Above 35°C  

### **5-Day Forecast**  
- Displays the weather forecast for the next five days, including temperature and weather conditions.  

### **Error Handling with Notification Pop-up**  
- Shows a notification pop-up for errors like invalid city names or network issues.  

### **UI Enhancements**  
- Pastel color scheme for a minimal and modern look.  
- Smooth hover effects for buttons.  
- City and temperature information highlighted inside a bordered hover box.  

### **Reset Location Button**  
- Resets the weather display to the user’s current location.  

---

## **Technology Stack**  
- **HTML, CSS, JavaScript** (Frontend)  
- **OpenWeather API** (Weather Data)  
- **Geolocation API** (User Location Detection)  

---
### **Getting Started**  
To get a local copy up and running, follow these simple steps.  

---

## **Prerequisites**  
- A modern web browser.  
- An API key from OpenWeatherMap API.  

---

## **Installation**  

### **Clone the repository:**  
```bash
git clone <your-repo-link>
```
### **Navigate to the project directory:**  
```bash
cd <your-project-directory>
```
### **Update API Key in JavaScript files:**  
Replace the placeholder with your API key in all relevant `.js` files:  
```js
let apiKey = "Your API Key";
```
### **Run the project:**  
Open `index.html` in your browser to view the project.  

---

## **Usage**  
- The app will detect your **current location** and display real-time weather updates automatically.  
- To search for a different location, enter the **city name** in the search bar and press **Enter**.  
- View details such as **temperature, humidity, wind speed, and a 5-day forecast**.  
- Toggle between **Celsius (°C) and Fahrenheit (°F)** for temperature conversion.  
- Use the **Reset Location** button to revert to your current location’s weather.  

---

## **Note**  
- For the **best experience**, view this website on a **400×860** screen resolution.  

