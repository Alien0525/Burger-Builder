import React, { Component } from "react";
import { connect } from "react-redux";

import Button from "../../../components/UI/Button/Button";
import Spinner from "../../../components/UI/Spinner/Spinner";
import styles from "./ContactData.module.css";
import axios from "../../../axios-orders";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";
class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      address: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Delivery Address",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      landmark: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Landmark",
        },
        value: "",
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
      },
      pinCode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "PinCode",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
          maxLength: 6,
          isNumeric: true,
        },
        valid: false,
        touched: false,
      },

      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-Mail",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.price,
      orderData: formData,
    };

    this.props.onOrderBurger(order, this.props.token);
  };



  inputChangedHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });

    let formIsValid = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
    }
    this.setState({ orderForm: updatedOrderForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
          />
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid}>
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={styles.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
