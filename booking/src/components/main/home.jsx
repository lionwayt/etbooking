import React from 'react';
import"./home.css";
import Images from "./cherry.jpg";
import myImages from "./cloud.jpg"
import image from"./famous.jpg";
import image2 from "./simien-mountains.jpg"

const Home=()=>{
    return(

    <div className='home'>
        <div className='homeContainer'>
        <div className="homes">
            <p>Get the advice you need. Check the latest COVID-19 restrictions before you travel.</p>
    </div> 
    <div>
    <h1 className="homeTitle">Offers</h1>
    <p className="homeDisc">
    Promotions, deals, and special offers for you
        </p>
    </div>
    <div className='card'> 
    <div>
    <img  className='image' src={Images} alt='cloud'  />
        <h1>Save 15% or more</h1>
        <p>Plan your dream trip with a Getaway Deals.</p>
        <p><button>Explore deals</button></p>
        </div>
        </div>
        <div class="exploreContainer">
           
<h1>Explore Ethiopia</h1>
<p>these popular destinations have a lot to offer</p>
</div>

<div class="row-padding margin-top">

<div class="third">
<div class="card-2">
<img src={image} alt=''/>
<div class="container">
<h5>Addis Ababa</h5>
</div>
</div>
</div>

<div class="third">
<div class="card-2">
<img src={Images} alt=''/>
<div class="container">
<h5>Debre Zeyit</h5>
</div>
</div>
</div>

<div class="third">
<div class="card-2">
<img src={image2}  alt=''/>
<div class="container">
<h5>Awassa</h5>
</div>
</div>
</div>

</div>
<div className='row-padding'>
<div class="third">
<div class="card-2">
<img src={myImages} alt=''/>
<div class="container">
<h5>Bahir Dar</h5>
</div>
</div>
</div>

<div class="third">
<div class="card-2">
<img src={image2} alt=''/>
<div class="container">
<h5>Arba Minch</h5>
</div>
</div>
</div>

<div class="third">
<div class="card-2">
<img src={image} alt=''/>
<div class="container">
<h5>Adama</h5>
</div>
</div>
</div>

</div>
</div>
        </div>
        
        
    );
};

export default Home;
