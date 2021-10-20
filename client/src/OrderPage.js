import React, { useState, useEffect } from "react";
import axios from "axios";
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
    let finalOrder = {};
    useEffect(() => {
        let total = 0;
        if (receivedData.isLoaded == true) {
            receivedData.orderDetails.forEach(element => {
                total = total + (element.quantity * element.price)
            });

            setItemTotal(total)
            finalOrder.orderId = props.match.params.id;
            finalOrder.total = itemTotal;
        }
    }, [receivedData.isLoaded]);

    const getOrder = () => {
        axios("http://localhost:8000/order/findbyid/" + props.match.params.id).then(async (result) => {
            for (var a in result.data) {
                //console.log(result.data[a].food_id);
                await axios("http://localhost:8000/food/findbyid/" + result.data[a].food_id).then((FoodDetail) => {

                    result.data[a].foodName = FoodDetail.data.foodName;
                    result.data[a].foodType = FoodDetail.data.foodType;
                    result.data[a].protein = FoodDetail.data.protein;
                    result.data[a].calories = FoodDetail.data.calories;
                    result.data[a].price = FoodDetail.data.price;
                })
            }
            setReceivedData({ isLoaded: true, orderDetails: result.data });
        });
    };

    const payDetails = () => {

        const jsonPayload = finalOrder;
        axios
            .post("http://localhost:8000/pay/payNow", {
                body: jsonPayload,
            })
            .then((resp) => {
                console.log(resp.data);
            });
    };
    if (!receivedData.isLoaded) {
        return (
            <div>
                <h1>Loading The Order Details</h1>
            </div>
        )
    }
    else {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2>Order Details</h2>
                        { }
                        {/* <div className="p-3">
                            <h2>name: {props.match.params.id}</h2>
                            <p>Price: <b>price</b></p>
                            <p>Quantity:<b>quantity</b></p>
                            <p>Total:<b>price * item.quantity $</b></p>
                            <hr />
                        </div> */}

                        {receivedData.orderDetails.map(item => {
                            return (

                                <div className="p-3">
                                    <h2>{item.foodName}</h2>
                                    <p>Price: <b>{item.price}</b></p>
                                    <p>Quantity: <b>{item.quantity}</b></p>
                                    <p>Sub Total : <b>{item.price * item.quantity}</b></p>
                                    {/* <p>Quantity:<b>{item.quantity}</b></p>
                                        <p>Total:<b>{item.price * item.quantity} $</b></p> */}
                                    <hr />
                                </div>
                            )
                        })}

                    </div>
                    <div className="col-md-4">
                        <h2>Total</h2>
                        <h3>{itemTotal} $</h3>
                        <button
                            className="btn btn-success m-2"
                            type="button"
                            onClick={payDetails}
                        >
                            Pay Now
                        </button>                    </div>
                </div>
            </div>
        )
    }

}
export default OrderPage;