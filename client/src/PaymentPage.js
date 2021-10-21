import React from "react";
import "./order.css";

function PaymentPage(props){
return(<div>
            <h1>Thanks for the order <span className="smallFont">({props.match.params.id})</span>,<br/> your payment will be done shortly.</h1>
            <p>Order Placed Succesful and now payment</p>
    </div>)
    

}
export default PaymentPage;