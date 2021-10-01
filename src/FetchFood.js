import React, { useState, useEffect } from "react";
import RenderFood from "./RenderFood";
import axios from "axios";
import { Button } from "react-bootstrap";

function FetchFood() {
  const [receivedData, setReceivedDate] = useState({
    isLoaded: false,
    items: [],
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [reset, resetOrder] = useState(false);
  let orderMap = new Map();

  const updateTotal = (amt, operation) => {
    if (operation === "sub") {
      setTotalAmount(totalAmount - amt);
    } else {
      setTotalAmount(totalAmount + amt);
    }
    console.log(totalAmount);
  };

  const populateOrder = (id, quantity) => {
    console.log(id, quantity);
    orderMap.set(id, quantity);
  };

  useEffect(() => {
    if (isLoaded !== true) {
      getFoodItems();
    }
  });

  const getFoodItems = () => {
    axios("https://foodappbackend.herokuapp.com/food/get").then((json) => {
      setReceivedDate({ isLoaded: true, items: json.data });
    });
  };

  const placeOrder = () => {
    console.log(orderMap);
    const jsonPayload = Object.fromEntries(orderMap);
    axios
      .post("https://foodappbackend.herokuapp.com/order/place", {
        body: jsonPayload,
      })
      .then((resp) => {
        console.log(resp);
      });
  };

  const renderFoodItems = () => {
    let { items } = receivedData;
    let foodChildDivs = [];
    for (let item of items) {
      foodChildDivs.push(
        <RenderFood
          id={item._id}
          name={item.foodName}
          type={item.foodType}
          protein={item.protein}
          calories={item.calories}
          price={item.price}
          updateTotal={updateTotal}
          addOrder={populateOrder}
        />
      );
    }
    return <div className="food-container">{foodChildDivs}</div>;
  };

  let { isLoaded } = receivedData;

  if (!isLoaded) {
    return (
      <div className="text-center">
        <p>Fetching Food Menu</p>
      </div>
    );
  } else {
    const items = renderFoodItems();
    return (
      <div className="container">
        <div className="row results">{items}</div>
        <div className="total">Total : {totalAmount}$</div>
        <button
          className="btn btn-success m-2"
          type="button"
          onClick={placeOrder}
        >
          Place Order
        </button>
        <button
          className="btn btn-danger m-2"
          type="button"
          onClick={() => {
            window.location.reload();
          }}
        >
          Cancel
        </button>
      </div>
    );
  }
}

export default FetchFood;
