import React, { useState, useEffect } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  Card,
  CardContent,
} from "@material-ui/core";
import InfoCard from "./Components/InfoCard";
import Map from "./Components/Map";
import "./App.css";
import Table from "./Components/Table";
import LineGraph from "./Components/LineGraph";
import {sortData} from "./util";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo]= useState({});
  const [tableData, setTableData] = useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) =>{
      setCountryInfo(data);
    })
  }, [])

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
          setCountries(countries);
        });
    };
    getCountiresData();
  }, []);

  const onCountryChange = async (event) => {
    const countryCode = event.target.value;
    console.log("COUNTRY CODE >>>", countryCode);

    const url = countryCode === "worldwide" ? 
    "https://disease.sh/v3/covid-19/all" :
    `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
    .then(response => response.json())
    .then((data) =>{
      setCountry(countryCode);
      setCountryInfo(data);
    })
  };
  
  console.log("COUNTRY INFO >>>>", countryInfo)

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
          <InfoCard title="Corona Virus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoCard title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoCard title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        {/* map */}
        <Map />
      </div>
      <Card className="app_right">
        <CardContent>
          <h6>Live cases by countries</h6>
          {/* Table */}
          <Table countries={tableData} />
          <h6>Worldwide new cases</h6>
          {/* graph */}
          <LineGraph casesType="cases" />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
