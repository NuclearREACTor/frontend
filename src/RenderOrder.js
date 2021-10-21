import React from "react"
function RenderOrder(props){
    {props.item.map(item => {
        return (
    
            <div className="p-3">
                <h2>{item.foodName}</h2>
                <p>Price: <b>{item.price}</b></p>
                <p>Quantity: <b>{item.quantity}</b></p>
                <p>Sub Total : <b>{item.price * item.quantity}</b></p>
                
                <hr />
            </div>
        )
    })}

}
export default RenderOrder;
