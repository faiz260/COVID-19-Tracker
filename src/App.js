import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoCard from "./Components/InfoCard/InfoCard";
import Map from "./Components/Map/Map";
import "./App.css";
import Table from "./Components/Table/Table";
import LineGraph from "./Components/LineGraph/LineGraph";
import { sortData } from "./util";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({lat: 34.80746, lng: -40.4796})
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountiresData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);  
          setCountries(countries);
        });
    };
    getCountiresData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("COUNTRY CODE >>>", countryCode);

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(countryCode);
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long])
        setMapZoom(2);
      });
  };

  console.log("COUNTRY INFO >>>>", countryInfo);

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
          <InfoCard
            title="Corona Virus Cases"
            cases={countryInfo.todayCases}
            total={countryInfo.cases}
          />
          <InfoCard
            title="Recovered"
            cases={countryInfo.todayRecovered}
            total={countryInfo.recovered}
          />
          <InfoCard
            title="Deaths"
            cases={countryInfo.todayDeaths}
            total={countryInfo.deaths}
          />
        </div>
        {/* map */}
        <Map casesType="cases" countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>
      <Card className="app_right">
        <CardContent>
          <h6>Live cases by countries</h6>
          {/* Table */}
          <Table countries={tableData} />
          {/* graph */}
          <LineGraph casesType="cases" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
