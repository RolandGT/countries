import React, {useEffect, useRef} from "react";
import './FilterCountryForm.css';
import logo from '../images/grundfoslogo.png';

const FilterCountryForm = props => {

  const inputValue = props.countryFilter
  const countryNameInput = useRef(null);
  useEffect(() => {
    countryNameInput.current.focus();
  }, []);

  return (
    <div className='row filter-form'>
      <div className='col-md-6'>
          <img className="g-logo" src={logo} alt="logo"></img>
      </div>
      <div className='offset-md-2 col-md-4'>
        <form>
            <p className="form">Filter country by name:</p>
            <input
              className='col-12'
              placeholder='Enter country name'
              type='text'
              ref={countryNameInput}
              onChange={(e) => {inputValue(e, e.target.value)}}
            />
        </form>
      </div>
    </div>
  );
};
export default FilterCountryForm;