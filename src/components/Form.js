import { useState } from 'react';
import Location from "./Location";

const Form = (props) => {

    const { getLong, getLat, getDate, date, sunOption, updateSunOption, todaysDate, getSubmit, getRun, run, setLatBySearch, setLongBySearch} = props

    const [checked, setChecked] = useState('')

    const handleChange = (e) => getDate(e.target.value);
    
    const handleSunChange = (e) => updateSunOption(e.target.value);
    
    // GEOLOCATION:
    const getLocation = () => navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure);
  

    // function for successful geolocation:
    const locationSuccess = (position) => {
      getLong(position.coords.longitude);
      getLat(position.coords.latitude);
    };

    // function for unsuccessful geolocation:
    const locationFailure = () => alert("We were unable to find your location, please search for your city");

    const handleSubmit = (e) => {
      e.preventDefault();

      if (checked && sunOption) {
        getSubmit()
      }
      else if (checked && !sunOption){
        alert("Please choose either sunrise or sunset")
      }
      else if (!checked && sunOption) {
        alert("Please enter your location via GPS or search")
      }
      else if (!checked && !sunOption){
        alert("Please make sure you have selected a location and sunrise or sunset option")
      }
    };

    const handleRunTime = (e) => getRun(e.target.value);

    return (
    
    <>
      <section className="interface">
          <p>location</p>
          <div>
            <input className="sr-only"
              type="radio"
              id='gps'
              checked={checked === 'gps'}
              name='gps'
              value={checked}
              onChange={(e)=>{setChecked(e.target.name)}}
            />
            <label htmlFor="gps">📍Use GPS</label>

            <input className="sr-only"
              type="radio"
              id='search'
              checked={checked === 'search'}
              name='search'
              value={checked}
              onChange={(e)=>{setChecked(e.target.name)}}
            />
            <label htmlFor="search">🔍 Search</label>
          </div>

        {/* Conditionally rendering either the gps button or searchbar by checking the value of 'checked' (state) */}
        {
          checked === 'gps'
          ? ( <button onClick={getLocation}>Get my location</button> )
          : <Location setLatBySearch={setLatBySearch} setLongBySearch={setLongBySearch} /> 
        }
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Select date:</label>
          <input min ={todaysDate} type="date" id="date" name="date" value={date} onChange={handleChange} />

          <p>Sunrise or Sunset?</p>

          <div className="sun" onChange={handleSunChange} value={sunOption}>
              
              <input className="sr-only" type="radio" id="sunrise" name="sunOption" value="sunrise"/>
              <label htmlFor="sunrise"><img className="sunriseImage" src="/sunrise1.svg" alt="sunrise icon"></img></label>

              <input className="sr-only" type="radio" id="sunset" name="sunOption" value="sunset"/>
              <label htmlFor="sunset"><img className="sunsetImage" src="/sunset1.svg" alt="sunset icon"></img></label>
          </div>

              {
                sunOption === 'sunset' 
                ?<>
                  <label htmlFor="runTime">Length of Run</label>
                  <input onChange={handleRunTime} type="number" name="runTime" min="0"  id="runTime" value={run} step="5"/>
                </>
                :null
              }

          <button>Get a run time</button>
        </form>
    </section>
  </>
  )
}

export default Form;