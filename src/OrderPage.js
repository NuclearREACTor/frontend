import React, { useState, useEffect } from "react";
import axios from "axios";
import "./order.css";
import { useHistory } from "react-router-dom";

// import cartItems from "../cartItem";

function OrderPage(props) {
  const [receivedData, setReceivedData] = useState({
    isLoaded: false,
    isDetailLoaded: false,
    orderDetails: [],
  });
  const [itemTotal, setItemTotal] = useState(0);

  useEffect(() => {
    if (receivedData.isLoaded !== true) {
      getOrder();
    }
  });
  const history = useHistory();
  let finalOrder = {};
  useEffect(() => {
    let total = 0;
    if (receivedData.isLoaded == true) {
      receivedData.orderDetails.forEach((element) => {
        total = total + element.quantity * element.price;
      });

      setItemTotal(total);
      finalOrder.orderId = props.match.params.id;
      finalOrder.total = itemTotal;
    }
  }, [receivedData.isLoaded]);

  const getOrder = () => {
    axios(
      "https://foodappbackend.herokuapp.com/order/findbyid/" +
        props.match.params.id
    ).then(async (result) => {
      for (var a in result.data) {
        //console.log(result.data[a].food_id);
        await axios(
          "https://foodappbackend.herokuapp.com/food/findbyid/" +
            result.data[a].food_id
        ).then((FoodDetail) => {
          result.data[a].foodName = FoodDetail.data.foodName;
          result.data[a].foodType = FoodDetail.data.foodType;
          result.data[a].protein = FoodDetail.data.protein;
          result.data[a].calories = FoodDetail.data.calories;
          result.data[a].price = FoodDetail.data.price;
        });
      }
      setReceivedData({ isLoaded: true, orderDetails: result.data });
    });
  };

  const payDetails = () => {
    const jsonPayload = { orderId: props.match.params.id, total: itemTotal };
    axios
      .post("https://foodappbackend.herokuapp.com/pay/payNow", {
        body: jsonPayload,
      })
      .then((resp) => {
        let id = props.match.params.id;
        history.push("/payment/" + id);
      });
  };
  const deleteOrder = () => {
    axios
      .delete(
        "https://foodappbackend.herokuapp.com/order/delete/" +
          props.match.params.id
      )
      .then((json) => {
        history.push("/");
      });
  };

  if (!receivedData.isLoaded) {
    return (
      <div>
        <h1>Loading The Order Details</h1>
      </div>
    );
  } else {
    return (
      <div>
        <div className="row justify-content-center">
          <div>
            <h2>Order Details</h2>
            <div className="orderContainer">
              {receivedData.orderDetails.map((item) => {
                return (
                  <div className="orderCard">
                    <h2>{item.foodName}</h2>
                    <p>
                      Price: <b>{item.price}</b>
                    </p>
                    <p>
                      Quantity: <b>{item.quantity}</b>
                    </p>
                    <p>
                      Sub Total : <b>{item.price * item.quantity}</b>
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="totalCard">
            <div>
              <h2>Total</h2>
              <h3>{itemTotal} $</h3>
              <button
                className="btn btn-success m-2"
                type="button"
                onClick={payDetails}
              >
                Pay Now
              </button>
              <button
                className="btn btn-danger m-2"
                type="button"
                onClick={deleteOrder}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default OrderPage;
