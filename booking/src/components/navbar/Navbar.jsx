import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faBed,
  faCar,
  faMagnet,
  faPlane,
  faTaxi,
  faCalendarDays,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import "./navbar.css";
import React,{useState} from "react";
import Calendar from 'react-calendar';


const  Navbar =()=>{
  let [date, filterDate]=useState('');
  let [isOpen,setOpen]=useState(false)
  
  return (
    <div className="navbar">
      <div className="navContainer">
        <div className="navList">
          <div className="navListItem active">
            <FontAwesomeIcon icon={faBed} />
            <span>Stays</span>
          </div>
          <div className="navListItem">
            <FontAwesomeIcon icon={faPlane} />
            <span>Flight</span>
          </div>
          <div className="navListItem">
            <FontAwesomeIcon icon={faCar} />
            <span>Car Rental</span>
          </div>
          <div className="navListItem">
            <FontAwesomeIcon icon={faMagnet} />
            <span>Attraction</span>
          </div>
          <div className="navListItem">
            <FontAwesomeIcon icon={faTaxi} />
            <span>Airport Taxi</span>
          </div>
        </div>
        <h1 className="headerTitle">Find your next stay</h1>
        <p className="headerDisc">
          Search deals on hotels, homes, and much more...
        </p>
        <div className="headerSearch">
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faBed} className="headerIcon" />
            <input
              type="text"
              placeholder="Where you want to go"
              className="headerSearchInput"
            />
          </div>
          <div className="headerSearchItem"> 
            <FontAwesomeIcon icon={faCalendarDays} className="headerIcon"  />
            <span  >
              {date[0] }-{date[1]} 
                </span>
                <div>
                {isOpen ===false &&
                <p onClick={()=>setOpen(isOpen=true)}>date</p>
                }
                {
                  isOpen === true&&
                  <p className="dates" onClick={()=>setOpen(isOpen=false)}>x</p>
                }
                {isOpen===true &&
                <Calendar selectedDate={filterDate} range={true}/>}
                </div> 
          </div>
          
          <div className="headerSearchItem">
            <FontAwesomeIcon icon={faPerson} className="headerIcon" />
            <span className="headerSearchText" >2 Adult 2 Children 1 room</span>
          </div>
          <div className="headerSearchItem">
          <button className="butt">Search</button>
          </div>
          
        </div>
        
      </div>
    </div>
  
  );
  };



export default Navbar;
