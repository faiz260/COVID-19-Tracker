import React, {useState, useEffect} from "react";
import { FormControl, Select, MenuItem } from "@material-ui/core";
import "./App.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide')

    useEffect(()=>{
      const getCountiresData = async () => { 
      await fetch("https://disease.sh/v3/covid-19/countries ")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => ({
          name: country.country,
          value: country.countryInfo.iso2
        }));
        setCountries(countries);
      })
      }
      getCountiresData();
    },[]);

    const onCountryChange = (event) => {
      const countryCode = event.target.value;

      console.log("CountryCode", countryCode)

      setCountry(countryCode);
    } 

  return (
    <div className="App">
      {/* Header */}
      <div className="app_header">
        <h1>COVID-19 Tracker</h1>

        <FormControl className="app_dropdown">
          <Select variant="outlined" 
          value={country} 
          onChange={onCountryChange}
          >
            <MenuItem value="worldwide">Worldwide</MenuItem>
            {
              countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))
            }
          </Select>
        </FormControl>
      </div>
      {/* Title & search dropdown field */}

      {/* info cards */}
      {/* info cards */}
      {/* info cards */}

      {/* Table */}
      {/* graph */}

      {/* map */}
    </div>
  );
}

export default App;
