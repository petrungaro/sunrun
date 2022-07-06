const Results = (props) => {

    const {sunInformation, sunOption, userRunTime } = props
    console.log("results rerendred");
     return(
         <>
         {
        sunOption?
        <p>{sunInformation.sunrise}</p>
        :<><p>{sunInformation.sunset}</p> <p>{`${userRunTime} minutes`}</p></>
         }
         </>
     )
}

export default Results;