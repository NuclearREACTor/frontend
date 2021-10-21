import "./RenderFood.css";
import { useState, useEffect } from "react";

function RenderFood(props) {
  const [quantity, setQuantity] = useState(0);
  const [itemTotal, setItemTotal] = useState(0);

  function updateTotal(operation) {
    props.updateTotal(props.price, operation);
  }

  const updateQuantity = (op) => {
    if (op === "sub") {
      props.addOrder(props.id, quantity - 1);
      setQuantity(quantity - 1);
      updateTotal("sub");
    } else if (op === "add") {
      props.addOrder(props.id, quantity + 1);
      setQuantity(quantity + 1);
      updateTotal("add");
    }
    // updateTotal;
    // props.addOrder(props.id, quantity);
  };

  const resetOrder = () => {
    props.addOrder(props.id, 0);
    setQuantity(0);
  };

  return (
    <div className="food-card">
      <h3>{props.name}</h3>
      <div className="type">
        Type: {props.type} Protein: {props.protein}
      </div>
      <div className="calories">Calories: {props.calories}</div>
      <div className="price">Cost: {props.price}$</div>
      <button
        className="item-remove btn btn-danger m-2"
        onClick={() => {
          if (quantity > 0) {
            updateQuantity("sub");
          }
        }}
      >
        -
      </button>
      <input
        type="number"
        className="text-center"
        value={quantity}
        onChange={(e) => {
          e.target.value = quantity;
        }}
      ></input>
      <button
        className="item-add btn btn-success m-2"
        onClick={() => {
          updateQuantity("add");
        }}
      >
        +
      </button>
      <div className="Total">Total: {quantity * props.price}</div>
      {/* <button
        type="button"
        className="order-reset btn btn-danger"
        onClick={() => {
          resetOrder();
        }}
      >
        Reset
      </button> */}
    </div>
  );
}

export default RenderFood;
