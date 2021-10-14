import React from "react";
import Banner from "./components/Banner";
import FetchFood from "./FetchFood";


function MainPage()
{
    return(
        <div>
            <Banner />
      <h2>Food Menu</h2>
      <FetchFood />
        </div>
    )
}

export default MainPage;
