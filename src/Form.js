import React from "react";
import Name from "./Name.js";
import CreditCardNumber from "./CreditCardNumber.js";

export default class Form extends React.Component {
  state = {
    nameFieldValue: "",
    creditCardNumber: ""
  };

  handleNameInputChange = nameFieldValue => {
    this.setState({ nameFieldValue });
  };

  handleCreditCardInputChange = creditCardNumber => {
    this.setState({ creditCardNumber });
  };

  render() {
    console.log(this.state);

    return (
      <div>
        <Name
          onChange={this.handleNameInputChange}
          value={this.state.nameFieldValue}
        />
        <CreditCardNumber
          onChange={this.handleCreditCardInputChange}
          value={this.state.creditCardNumber}
        />
      </div>
    );
  }
}
