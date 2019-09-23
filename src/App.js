import React from 'react';
import { useState } from "react";
import Country from "./components/Country";
import FilterCountryForm from "./components/FilterCountryForm";
import './App.css';
import "bootstrap-4-grid/css/grid.css"

function App() {
  const [filterValue, setFilterValue] = useState('');
  const countryFilter = (e, value) =>{
    setFilterValue(value)
  }
  const [opacity, setOpacity] = useState("0");
  const [marginLeft, setMarginLeft] = useState("100px")
  const author = (
    <>
      Rolandas Gedgaudas - T. <br></br>
      rolandas.gt@gmail.com
    </>
  );
  const styles = {
    transition: "all 1s ease",
  }

  setTimeout(function(){ setOpacity("1"); }, 300);
  setTimeout(function(){ setMarginLeft("2px") }, 300);

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <FilterCountryForm countryFilter={countryFilter}/>
        </div>
        <div className="col-sm-12 col-md-6 side" >
          <div className="rol row" style={{...styles,"opacity":`${opacity}`, "left":`${marginLeft}`}}>
            <div className="user-icon"></div>
            <div className="col author">
             {author}
            </div>
          </div>
        </div>
        <div className="col-sm-12 col-md-6">
          <div style={{...styles, "opacity":`${opacity}`}}>
            <Country filterValue={filterValue}/>
          </div>
          
        </div>
        <footer className="container bottom">
          <div className="user-icon-footer"></div>
          <div className="footer-info">
            {author}
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
