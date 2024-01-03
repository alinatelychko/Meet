import { useEffect, useState } from 'react';

const CitySearch = ({allLocations, setCurrentCity}) => {
    const [showSuggestion, setShowSuggestion] = useState(false);
    const [query, setQuery] = useState('');
    const [suggestions, setSuggaestions] = useState([]);
    
    const handleInputChange = (event) => {
        const value = event.target.value;
        const filteredLocations = allLocations ? allLocations.filter((location) => {
            return location.toUpperCase().indexOf(value.toUpperCase()) > -1;
        }) : [];
        setQuery(value);
        setSuggaestions(filteredLocations);
       // setShowSuggestion(false);
      

    }
    const handleClick = (event) => {
      const value = event.target.textContent;
      setQuery(value);
      setShowSuggestion(false);
      setCurrentCity(value);
    } 

    useEffect(() => {
      setSuggaestions(allLocations);
    }, [`${allLocations}`]);
    return(
        <div id="city-search">
          <input
             type="text"
             className="city"
             placeholder="Search for a city"
             value={query}
             onFocus={() => setShowSuggestion(true)}
             onChange={handleInputChange}
         />  
         {showSuggestion ? <ul className='suggestion'>
            {suggestions.map((suggestion) => {
                return <li onClick={handleClick} key={suggestion}>{suggestion}</li>
            })}
            <li key='See all the cities'> 
              <b>See all cities</b>
            </li>
         </ul> : null}
        </div>
    )
}

export default CitySearch;