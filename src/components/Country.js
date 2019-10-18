import React, { useState, useEffect } from "react";
import { useFetch } from "../api/countriesData";
import './Country.css'

const Country = props => {

  const allCountriesUrl = "https://cors-anywhere.herokuapp.com/https://date.nager.at/Api/v2/AvailableCountries";
  const [countries, setCountries] = useState([]);
  const [data, loading] = useFetch(allCountriesUrl);
  let firstLetter = '';
  let letter = '';
  let hr = false;
  const [suggestions, setSuggestions] = useState(false);

  useEffect(() => {
    setCountries(data.sort(sortByProperty('value')));
    if (props.filterValue && props.filterValue !== '') {
        filterData();
    }
  }, [props, data, allCountriesUrl, suggestions]);

  var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
  };

  const filterData = ()=> {
    if(props.filterValue.length > 0){
      const suggestedCountries = data.filter((country) => {
        return country.value.toLowerCase().includes(props.filterValue.toLowerCase());
      }
      );
      setCountries(suggestedCountries);
      if (suggestedCountries.length === 0){
        setSuggestions(true);
      }else{
        setSuggestions(false);
      }
    }
  }

  const renderData = countries.map((item, index) => {
    if(firstLetter !== item.value.charAt(0)){
      firstLetter = item.value.charAt(0);
      letter = firstLetter;
      hr = true;
    }else{
      letter = '';
      hr = false;
    }
    return (
      <div key={index} className="country-name" >
        {hr ? (
         <>
          <hr></hr>
          <h2 className='letter'>{letter}</h2>
          <p className="country">{item.value}, {item.key}</p>
         </>
        ) : (
          <p className="country">{item.value}, {item.key}</p>
        )}
      </div>
    )
  });

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="row">
          <div className="items col-12">
            {renderData}
            {suggestions ? (
              <>
              <div className="col-12">No suggestions</div>
              </>
            ) : (
              <>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};
export default Country;
