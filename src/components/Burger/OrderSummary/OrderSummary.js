import React, { Component } from "react";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {


  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((igKey) => {
      return (
        <li key={igKey}>
          <span style={{ textTransform: "capitalize" }}>{igKey} : </span>
          {this.props.ingredients[igKey]}
        </li>
      );
    });
    return (
      <Auxiliary>
        <h3>Your Order</h3>
        <p>A delicious burger with the following ingredients</p>
        <ul>{ingredientSummary}</ul>
        <p>
          <strong>Total Price: {this.props.price.toFixed(2)}</strong>
        </p>
        <p style={{color:"#2574db"}}><strong>Checkout?</strong></p>
        <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
          Cancel
        </Button>
        <Button btnType="Success" clicked={this.props.purchaseContinued}>
          Continue
        </Button>
      </Auxiliary>
    );
  }
}

export default OrderSummary;
