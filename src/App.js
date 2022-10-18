import {
  FormControl,
  MenuItem,
  Select,
  Card,
  CardContent,
} from "@material-ui/core";
import React, { useState, useEffect } from "react";
import "./App.css";
import Map from "./Map";
import InfoBox from "./InfoBox";
import Table from "./Table";
import { sortData } from "./util";
import LineGraph from "./LineGraph";
import "leaflet/dist/leaflet.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("worldwide");
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch(`https://disease.sh/v3/covid-19/all`)
      .then((response) => response.json())
      .then((data) => {
        setCountryInfo(data);
      });
  }, []);

  useEffect(() => {
    const getCountriesData = async () => {
      await fetch(`https://disease.sh/v3/covid-19/countries`)
        .then((response) => response.json())
        .then((data) => {
          const countries = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2,
          }));
          const sortedData = sortData(data);
          setTableData(sortedData);
          setCountries(countries);
          setMapCountries(data);
        })
        .catch((reason) => {});
    };
    getCountriesData();
  }, []);

  const onCountryChange = async (e) => {
    const cCode = e.target.value;
    const url =
      cCode == "worldwide"
        ? `https://disease.sh/v3/covid-19/all`
        : `https://disease.sh/v3/covid-19/countries/${cCode}`;

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setCountry(cCode);
        setCountryInfo(data);
        setMapCenter({
          lat: data.countryInfo.lat,
          lng: data.countryInfo.long,
        });
      })
      .catch((reason) => {
        console.log(reason);
      });
  };

  return (
    <div className="App">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid - 19 Tracker</h1>
          <FormControl className="app_dropdown">
            <Select
              variant="outlined"
              value={country}
              onChange={onCountryChange}
            >
              <MenuItem value="worldwide">WorldWide</MenuItem>
              {countries.map((country) => {
                return (
                  <MenuItem key={country.value} value={country.value}>
                    {country.name}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem>
            <MenuItem value="worldwide">WorldWide</MenuItem> */}
            </Select>
          </FormControl>
        </div>

        <div className="app_stats">
          <InfoBox
            active={casesType === "cases" ? true : false}
            onClick={(e) => setCasesType("cases")}
            title="Coronavirus Cases"
            total={countryInfo.cases}
            cases={countryInfo.todayCases}
          />
          <InfoBox
            active={casesType === "recovered" ? true : false}
            onClick={(e) => setCasesType("recovered")}
            title="Recovered Cases"
            total={countryInfo.recovered}
            cases={countryInfo.todayRecovered}
          />
          <InfoBox
            active={casesType === "deaths" ? true : false}
            onClick={(e) => setCasesType("deaths")}
            title="Deaths"
            total={countryInfo.deaths}
            cases={countryInfo.todayDeaths}
          />
        </div>

        <Map
          casesType={casesType}
          center={mapCenter}
          zoom={mapZoom}
          countries={mapCountries}
        />
      </div>

      <Card className="app_right">
        {/* Table */}
        <h3>Live Cases By Country</h3>
        <Table countries={tableData} />
        {/* Graph */}
        <h3>Worldwide New Cases</h3>
        <LineGraph casesType={casesType} />
      </Card>
    </div>
  );
}

export default App;
