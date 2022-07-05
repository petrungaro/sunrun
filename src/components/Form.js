import Location from "./Location";

const Form = (props) => {

    const { getLong, getLat, getDate, date, sunOption, updateSunOption} = props

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

    return (
    
    <>
        <p>Date</p>
        <label htmlFor="date">Select date:</label>
        <input type="date" id="date" name="date" value={date} onChange={handleChange}/>

        <p>location</p>
        <button onClick={getLocation}>Get my location</button>

        <p>Sunrise or Sunset?</p>
        <form onChange={handleSunChange} value={sunOption}>
            <input type="radio" id="sunrise" name="sunOption" value="true"/>
            <label htmlFor="sunrise">Sunrise</label>

            <input type="radio" id="sunset" name="sunOption" value="false"/>
            <label htmlFor="sunset">Sunset</label>
        </form>

    </>

    

    )

}

export default Form;