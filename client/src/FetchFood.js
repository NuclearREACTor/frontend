import React, { useState, useEffect } from "react";
import RenderFood from "./RenderFood";
import axios from "axios";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import FetchCategory from "./FetchCategory";

function FetchFood() {
  const [receivedData, setReceivedDate] = useState({
    isLoaded: false,
    items: [],
  });

  const [totalAmount, setTotalAmount] = useState(0);
  const [reset, resetOrder] = useState(false);
  const history = useHistory();
  const navigateTo = (data) => history.push("/order/" + data);
  const [orderMap, setOrderMap] = useState(new Map());
  const [foodCategory, setFoodCategory] = useState(null);

  const updateTotal = (amt, operation) => {
    if (operation === "sub") {
      setTotalAmount(totalAmount - amt);
    } else {
      setTotalAmount(totalAmount + amt);
    }
    console.log(totalAmount);
    console.log(orderMap);
  };

  const populateOrder = (id, quantity) => {
    setOrderMap(new Map(orderMap.set(id, quantity)));
  };

  useEffect(() => {
    if (isLoaded !== true) {
      getFoodItems();
    }
  });

  useEffect(() => {
    getFoodItems();
  }, [foodCategory]);

  const updateCategory = (item) => {
    console.log("Here in parent");
    setFoodCategory(item);
    console.log(foodCategory);
    // getFoodItems();
  };

  const getFoodItems = () => {
    if (foodCategory != null) {
      axios(
        "https://foodappbackend.herokuapp.com/food/get?foodType=" + foodCategory
      ).then((json) => {
        setReceivedDate({ isLoaded: true, items: json.data });
      });
    } else {
      axios("https://foodappbackend.herokuapp.com/food/get").then((json) => {
        setReceivedDate({ isLoaded: true, items: json.data });
      });
    }
  };

  const placeOrder = () => {
    const jsonPayload = Object.fromEntries(orderMap);
    axios
      .post("https://foodappbackend.herokuapp.com/order/place", {
        body: jsonPayload,
      })
      .then((resp) => {
        navigateTo(resp.data);
        console.log(resp.data);
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
        <FetchCategory update={updateCategory} />
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
