import { useEffect } from "react";
const Results = (props) => {

    const {sunInformation, sunOption, userRunTime } = props

    const sunDateObject = new Date(sunInformation[sunOption]);

    // A variable to track the difference between sunset time and current time
    const today = Date.now(); 

    let sunTime = sunDateObject.getTime();

    const diff = sunDateObject.getTime() - today;

  // to calculate how many minutes user missed sunset 
 
    let overTime=[(today-sunTime)/1000/60,'minutes'];
    if(overTime[0]>60)
    {
      overTime=[(today-sunTime)/1000/60/60,'hours'];
    }

  // to calculate when user needs to leave in order to return before sunset
    function subtractMinutes(numOfMinutes, date = new Date(...sunDateObject)) {

      if(sunOption==='sunset'){
        date.setMinutes(date.getMinutes() - numOfMinutes);
      
        return date.toLocaleString('en-US', {timeStyle: 'short' } );
      }
    }
      
    const whatTimeToLeave = subtractMinutes(userRunTime, sunDateObject);
  
    return(

        <>

          { 
            
            //  Check for valid date and confirm sunrise hasn't past
              !isNaN(sunDateObject) &&  today<sunTime && sunOption === 'sunrise'?
              <p>{sunDateObject.toLocaleString()}</p>
              :!isNaN(sunDateObject)&&today>sunTime && sunOption && today>sunTime?
              <p>You missed the {sunOption} by {overTime[0]} {overTime[1]}</p>

            // check for valid date, confirm sunset hasnt past and user has enough time for run
              :!isNaN(sunDateObject) && today<sunTime && sunOption === 'sunset' && (userRunTime * 1000 * 60) < diff?
              <p>{`For a ${userRunTime} minute run, leave at ${whatTimeToLeave} to get home before sunset`}</p>
    
            // check if the user's run time is enough time to return before sunset
              :!isNaN(sunDateObject) && sunOption === 'sunset' && (userRunTime*1000*60)>diff ?
              <p>You don't have enough time for this run, try another day or a shorter runtime</p>
      
            // Final check: do nothing 
            :null
      
          }
        </>
    )
}

export default Results;