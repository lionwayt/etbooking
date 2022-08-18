import React from 'react';
import{ FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import{ faClock,faEnvelope, faPhone} from '@fortawesome/free-solid-svg-icons'
import "./Topnavbar.css";
const Topnavbar = () => {
  return (

    <div>
        <div className='tnavbar'>
            <div className='tcontainer'>
      <div className='topitems'> 
                          <FontAwesomeIcon icon={faEnvelope}/>
                <span className='text'> info@booking.com</span>
                          <FontAwesomeIcon icon={faPhone}/>
                <span className='text'>+251 912 3456</span>
          </div>
      <div className='topitems'>
                        <FontAwesomeIcon icon={faClock}/>
                <span className='text'>office houre 08:00am - 06:00pm</span>
              <button type='button' className='button'>contact us</button>
          </div>
        </div>
    </div>
</div>
  )
  }
  export default Topnavbar;