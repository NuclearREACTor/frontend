import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";

function FetchCategory(props) {
  const [receivedData, setReceivedDate] = useState({
    isLoaded: false,
    items: [],
  });

  useEffect(() => {
    if (isLoaded !== true) {
      getFoodCategory();
    }
  });

  const getFoodCategory = () => {
    axios("https://foodappbackend.herokuapp.com/food/get/foodTypes").then(
      (json) => {
        setReceivedDate({ isLoaded: true, items: json.data });
      }
    );
  };

  const updateCategory = (item) => {
    console.log("Here");
    props.update(item);
  };

  const renderFoodItems = () => {
    let { items } = receivedData;
    let foodChildDivs = [];
    for (let item of items) {
      foodChildDivs.push(
        <Button
          className="m-2"
          value={item}
          onClick={(e) => {
            updateCategory(e.target.value);
            // console.log(e.target.value);
          }}
        >
          {item}
        </Button>
      );
    }
    return <div className="ms-auto me-auto">{foodChildDivs}</div>;
  };

  let { isLoaded } = receivedData;

  if (!isLoaded) {
    return (
      <div className="text-center">
        <p>Fetching Food Types</p>
      </div>
    );
  } else {
    const items = renderFoodItems();
    return (
      <div className="container">
        <div className="row">{items}</div>
      </div>
    );
  }
}

export default FetchCategory;
