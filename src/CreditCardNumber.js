import React from "react";

export default class CreditCardNumber extends React.Component {
  handleCreditCardChange = e => {
    this.props.onChange(e.target.value);
  };
  render() {
    const { value } = this.props.value;
    return (
      <form>
        <input
          type="number"
          placeholder="Enter your credit card number"
          onChange={this.handleCreditCardChange}
          value={value}
        />
      </form>
    );
  }
}
