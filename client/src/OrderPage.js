import React, { useState, useEffect } from "react";
import axios from "axios";
// import cartItems from "../cartItem";

function OrderPage(props) {

    const [receivedData, setReceivedData] = useState({
        isLoaded: false,
        isDetailLoaded:false,
        orderDetails: [],
        detailedOrders :[]
    });

    useEffect(() => {
        if (receivedData.isLoaded !== true) {
            getOrder();
        }
    });
    const getOrder = () => {
        axios("http://localhost:8000/order/findbyid/" + props.match.params.id).then((result) => {
            setReceivedData({ isLoaded: true, orderDetails: result.data });
            //   setReceivedDate({ isLoaded: true, items: json.data });
        });
    };
    // const getFoodDetail = (food_id,quantity) =>{
    //     axios("http://localhost:8000/order/findbyid/" +food_id).then((result) => {
    //         setReceivedData({ isDetailLoaded: true, orderDetails: result.data });
    //         //   setReceivedDate({ isLoaded: true, items: json.data });
    //     });
    // }
    // if(!receivedData.isLoaded)
    // {
    //     {receivedData.orderDetails.map(item =>{
    //         return 
    //            ( getFoodDetail(item.food_id,item.quantity))
    //     })}
    // }
    if(!receivedData.isLoaded)
    {   
        return(
            <div>
                < h1>Loading The Order Details</h1>
            </div>
        )
    }
    else 
    {
        return (
            <div>
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2>Order Details</h2>
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
                                        <h2>{item.food_id}</h2>
                                        <p>Price: <b>{item.quantity}</b></p>
                                        {/* <p>Quantity:<b>{item.quantity}</b></p>
                                        <p>Total:<b>{item.price * item.quantity} $</b></p> */}
                                        <hr/>
                                    </div>
                            )
                        })}
    
                    </div>
                    <div className="col-md-4">
                        <h2>Total</h2>
                        <h3>37.5 $</h3>
                    </div>
                </div>
            </div>
        )
    }
    
}
export default OrderPage;