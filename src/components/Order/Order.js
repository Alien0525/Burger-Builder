import React from "react";
import styles from "./Order.module.css";
const order = (props) => {
  const ingredients = [];
  for (let ingredientName in props.ingredients) {
    ingredients.push({
      name: ingredientName,
      quantity: props.ingredients[ingredientName],
    });
  }
  // Converts object in array of objects
  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span style={{
          display:"inline-block", margin:"1rem", textTransform: "uppercase", border: "1px solid #ccc", padding:"0.5rem"}}key={ig.name}>
        {ig.name} ({ig.quantity})
      </span>
    );
  });
  return (
    <div className={styles.Order}>
      <p>Ingredients: {ingredientOutput}</p>
      <p>
        Price: <strong>Rs {props.price.toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default order;
