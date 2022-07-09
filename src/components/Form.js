import Location from "./Location";

const Form = (props) => {

    const { getLong, getLat, getDate, date, sunOption, updateSunOption, todaysDate, getSubmit, getRun, run} = props

    const handleChange = (e) => {

        console.log(e)
        getDate(e.target.value)
    }

    const handleSunChange = (e) => {

        console.log(e)
        updateSunOption(e.target.value)
    }

    // GEOLOCATION:
    // Get geolocation:
    const getLocation = () => {
      navigator.geolocation.getCurrentPosition(locationSuccess, locationFailure)
    }

    // What to do with successfull geolocation:
    const locationSuccess = (position) => {
      getLong(position.coords.longitude);
      getLat(position.coords.latitude);
      console.log('success! long/lat saved')
      console.log(position.coords)
    }

    const locationFailure = () => {
      console.log('user declined to share location')
    }

    const handleSubmit = (e)=>{
      e.preventDefault();
      console.log('Form submit',e);
      getSubmit();

    }

    const handleRunTime = (e)=>{
      console.log("Run time", e);
      getRun(e.target.value);
    }

    return (
    
    <div className="interface">
        <p>Date</p>
        <p>location</p>
        <button onClick={getLocation}>Get my location</button>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Select date:</label>
          <input min ={todaysDate} type="date" id="date" name="date" value={date} onChange={handleChange}/>


          <p>Sunrise or Sunset?</p>
          <div className="sun" onChange={handleSunChange} value={sunOption}>
              
              <input type="radio" id="sunrise" name="sunOption" value="true"/>
              <label htmlFor="sunrise"><img className="sunriseImage" src="/sunrise1.svg" alt="sunrise icon"></img></label>

              <input type="radio" id="sunset" name="sunOption" value=""/>
              <label htmlFor="sunset"><img className="sunsetImage" src="/sunset1.svg" alt="sunset icon"></img></label>
          </div>
              {
                !sunOption?
                <>
                  <label htmlFor="runTime">Length of Run</label>
                  <input onChange={handleRunTime} type="number" name="runTime" min="0"  id="runTime" value={run} step="5"/>
                </>
                :null
              }
              <button>Get a run time</button>
        
        </form>

    </div>

    

    )

}

export default Form;