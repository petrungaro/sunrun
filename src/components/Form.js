import Location from "./Location";

const Form = (props) => {

    const { getLong, getLat, getDate, date, sunOption, updateSunOption, todaysDate, getSubmit} = props

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

    return (
    
    <>
        <p>Date</p>
        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Select date:</label>
          <input min ={todaysDate} type="date" id="date" name="date" value={date} onChange={handleChange}/>

          <p>location</p>
          <button onClick={getLocation}>Get my location</button>

          <p>Sunrise or Sunset?</p>
          <div onChange={handleSunChange} value={sunOption}>
              <input type="radio" id="sunrise" name="sunOption" value="true"/>
              <label htmlFor="sunrise">Sunrise</label>

              <input type="radio" id="sunset" name="sunOption" value="false"/>
              <label htmlFor="sunset">Sunset</label>

              <button>Get a run time</button>
          </div>

        </form>

    </>

    

    )

}

export default Form;