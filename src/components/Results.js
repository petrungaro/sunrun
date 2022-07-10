const Results = (props) => {

    const {sunInformation, sunOption, userRunTime } = props
    console.log("results rerendred");

    // ! Safe to delete...replaced by single sunDateObject
    // const sunriseDateObject = new Date(sunInformation.sunrise);
    // // console.log(sunriseDateObject);
    // const sunsetDateObject = new Date(sunInformation.sunset);
    // console.log(sunsetDateObject.toLocaleString())

    const sunDateObject = new Date(sunInformation[sunOption]);

    // A variable to track the difference between sunset time and current time
    const today = Date.now(); 
    const diff = sunDateObject.getTime() - today;



    // let hours = sunsetDateObject.getHours();
    // let minutes = sunsetDateObject.getMinutes();
    // console.log(hours,minutes);


    function subtractMinutes(numOfMinutes, date = new Date(sunDateObject)) {
        date.setMinutes(date.getMinutes() - numOfMinutes);
      
        return date.toLocaleString('en-US', {timeStyle: 'short' } );
      }

    const whatTimeToLeave = subtractMinutes(userRunTime, sunDateObject);
    console.log(whatTimeToLeave);


    return(
        <>
        {
          !isNaN(sunDateObject)?
       
        
      
        
        
            sunOption === 'sunrise' 
            ?<p>{sunDateObject.toLocaleString()}</p>
            :<p>{`For a ${userRunTime} minute run, leave at ${whatTimeToLeave} to get home before sunset`}</p>
         
          
          
            :(userRunTime * 1000 * 60) > diff
            ? <p>You don't have enough time for this run, try another day or a shorter runtime</p>
           
          
       :null
       }
       
        
        </>
    )
}

// THINGS TO CHECK:

// {
//     sunOption
//     ? show the sunrise time 
//     : show the userrun time and the time they would need to leave
// }
// {
//     sunOption === false
// }
// {
//     current time > time of sunset 
//     ? "you do not have to make this run"
//     : null
// }


// SUNST 8pm sunrise
// current 2 
// diff 360
// RUNTIME  40

// CURRENT - SUNSET = -30 
// IF RUNTIME > DIFF , no time for run
// IF RUNTIME(40) < DIFF (360), good to run 





export default Results;