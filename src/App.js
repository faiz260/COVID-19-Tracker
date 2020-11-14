import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
  responsiveFontSizes,
} from "@material-ui/core";
import InfoCard from "./Components/InfoCard";
import Map from "./Components/Map";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]= useState({});

  useEffect(() => {
    const getCountiresData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          setCountries(countries);
        });
    };
    getCountiresData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    setCountry(countryCode);

    const url = countryCode === "worldwide" ? 
    "https://disease.sh/v3/covid-19/all" :
    `https://disease.sh/v3/covid-19/countries${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then((data) =>{
      setCountryInfo(data);
    })
  };

  return (
    <div className="app">
      <div className="app_left">
        {/* Header */}
        <div className="app_header">
          <h1>COVID-19 Tracker</h1>

          {/* Title & search dropdown field */}

          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          {/* info cards */}
          <InfoCard title="Corona Virus Cases" cases={123} total={230983} />
          <InfoCard title="Recovered" cases={1234} total={230983} />
          <InfoCard title="Deaths" cases={12345} total={230983} />
        </div>
        {/* map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h6>Live cases by countries</h6>
          {/* Table */}
          <h6>Worldwide new cases</h6>
          {/* graph */}
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
