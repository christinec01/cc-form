// @flow
import React from "react";
import Button from "../base_components/Button";
import CreditCardNameField from "./form_fields/CreditCardNameField";
import CreditCardNumberField from "./form_fields/CreditCardNumberField";
import CVV2Field from "./form_fields/CVV2Field";
import DateFields from "./form_fields/DateFields";
type State = {
  name: string | null,
  creditCardNumber: string | null,
  cvv2: string | null,
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

  handleCreditCardInputChange = (creditCardNumber: string) => {
    this.setState({ creditCardNumber });
  };

  handleCVV2InputChange = (cvv2: string) => {
    this.setState({ cvv2 });
  };

  handleMonthChange = (expirationMonth: string) => {
    this.setState({ expirationMonth });
  };
  handleYearChange = (expirationYear: string) => {
    this.setState({ expirationYear });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state);
  };

  render() {
    const { onSubmit } = this.props;
    const {
      name,
      creditCardNumber,
      cvv2,
      expirationMonth,
      expirationYear
    } = this.state;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          backgroundColor: "lightBlue"
        }}
      >
        <CreditCardNameField
          onChange={this.handleNameInputChange}
          name={name}
        />
        <CreditCardNumberField
          onChange={this.handleCreditCardInputChange}
          number={creditCardNumber}
        />

        <CVV2Field onChange={this.handleCVV2InputChange} number={cvv2} />
        <DateFields
          onMonthChange={this.handleMonthChange}
          month={expirationMonth}
          onYearChange={this.handleYearChange}
          year={expirationYear}
        />
        <Button
          onClick={this.handleSubmit}
          disabled={!formIsComplete(this.state)}
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
