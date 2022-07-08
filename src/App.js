import { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENT IMPORTS //
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import Results from './components/Results';
import Loader from './components/Loader';


import './App.css';

function App() {

  // state
const [userLongitude, setUserLongitude] = useState("");
const [userLatitude, setUserLatitude] = useState("");
const [sunData, setSunData] = useState({})
const [selectedDate, setSelectedDate] = useState("")
const [isSunrise, setIsSunrise] = useState(true)


// functions

const getLongitude = (long) => {

  setUserLongitude(long)

} 

const getLatitude = (lat) => {

  setUserLatitude(lat)
}

const getDate = (date) => {

  setSelectedDate(date)

}

const getSunOption = (option) => {

  setIsSunrise(option)


}

useEffect(() => {
  axios({
    url: `https://api.sunrise-sunset.org/json`,
    method: `GET`,
    dataResponse: `json`,
    params: {
      lat: userLatitude,
      lng: userLongitude,
      date: selectedDate,
    }
  })
  .then(jsonData => {
    console.log(jsonData)

    setSunData(jsonData.data.results);
    
  })
}, [] );



  return (
    <div className="App">
      <Loader />
      <Form getLong={getLongitude} getLat={getLatitude} getDate={getDate} date={selectedDate} sunOption={isSunrise} updateSunOption={getSunOption}/>
      <Results sunInformation={sunData} sunOption={isSunrise} />
    </div>
  );
}

export default App;
