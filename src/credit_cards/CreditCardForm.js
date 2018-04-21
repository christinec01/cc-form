// @flow
import React from "react";
import Button from "../base_components/Button";
import CreditCardNameField from "./form_fields/CreditCardNameField";
import CreditCardNumberField from "./form_fields/CreditCardNumberField";

type State = {
  name: string | null,
  creditCardNumber: number | null,
  cvv2: number | null,
  expirationMonth: string | null,
  expirationYear: string | null
};

type FormValue = State;

type Props = {
  onSubmit: FormValue => void
};

export default class CreditCardForm extends React.Component<Props, State> {
  state = {
    name: null,
    creditCardNumber: null,
    cvv2: null,
    expirationMonth: null,
    expirationYear: null
  };

  handleNameInputChange = (name: string) => {
    this.setState({ name });
  };

  handleCreditCardInputChange = (creditCardNumber: number) => {
    this.setState({ creditCardNumber });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    const { onSubmit } = this.props;
    const { name } = this.state;
    console.log(this.state);

    return (
      <div>
        <CreditCardNameField
          onChange={this.handleNameInputChange}
          name={name}
        />
        <CreditCardNumberField
          onChange={this.handleCreditCardInputChange}
          number={this.state.creditCardNumber}
        />
        <Button
          onClick={this.handleSubmit}
          disabled={formIsComplete(this.state)}
        >
          Submit
        </Button>
      </div>
    );
  }
}

function formIsComplete(formValue: FormValue) {
  return true;
}
