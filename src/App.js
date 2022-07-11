import { useState, useEffect } from 'react';
import axios from 'axios';

// COMPONENT IMPORTS //
import Header from './components/Header';
import Footer from './components/Footer';
import Form from './components/Form';
import Results from './components/Results';
import Loader from './components/Loader';
import Animations from './Animations';
import './App.css';

function App() {

// STATE
const [userLongitude, setUserLongitude] = useState("");
const [userLatitude, setUserLatitude] = useState("");
const [sunData, setSunData] = useState({})
const [selectedDate, setSelectedDate] = useState("")
const [isSunrise, setIsSunrise] = useState('')
const [todaysDate, setTodaysDate] = useState("");
const [runTime, setRunTime]= useState(0);


// FUNCTIONS
const getLongitude = (long) => setUserLongitude(long)

const getLatitude = (lat) => setUserLatitude(lat)

const getDate = (date) => setSelectedDate(date)

const getSunOption = (option) => setIsSunrise(option)

const getRunTime=(minutes)=> setRunTime(minutes);
  
const getFormSubmit = () =>{
  axios({
    url: `https://api.sunrise-sunset.org/json`,
    method: `GET`,
    dataResponse: `json`,
    params: {
      lat: userLatitude,
      lng: userLongitude,
      date: selectedDate,
      formatted:0
    }
  })
  .then(jsonData => {
    console.log(jsonData)

    setSunData(jsonData.data.results);
    
  })
  }


useEffect(()=>{
  let date = new Date();
  let formatDate = date.toLocaleDateString();
  setTodaysDate(formatDate);

},[])



  return (
    <main>
      <Loader />
      <Header />
      <Animations />    
      <Form 
        getLong={getLongitude} 
        getLat={getLatitude} 
        getDate={getDate} 
        date={selectedDate} 
        sunOption={isSunrise} 
        updateSunOption={getSunOption} 
        todaysDate={todaysDate} 
        getSubmit={getFormSubmit} 
        getRun = {getRunTime} 
        run={runTime} 
        setLatBySearch={setUserLatitude} 
        setLongBySearch={setUserLongitude}
      />
      <Results sunInformation={sunData} sunOption={isSunrise} userRunTime={runTime} />
      <Footer />
    </main>
  );
}

export default App;
