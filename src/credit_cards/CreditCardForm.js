// @flow
import React from "react";
import Button from "../base_components/Button";
import CreditCardNameField from "./form_fields/CreditCardNameField";
import CreditCardNumberField from "./form_fields/CreditCardNumberField";
import CVV2Field from "./form_fields/CVV2Field";
import Visa from "../Assets/Visa.svg";
import AmEx from "../Assets/Amex.svg";
import MC from "../Assets/Mastercard.svg";
import Discover from "../Assets/Discover.svg";
import DateFields from "./form_fields/DateFields";
import { isKnownCreditVendor, getCreditVendor } from "./creditCardHelpers";
type State = {
  name: string | null,
  creditCardNumber: string | null,
  cvv2: string | null,
  expirationMonth: string | null,
  expirationYear: string | null,
  errors: { [errorKey: string]: Array<string> }
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
    expirationYear: null,
    errors: { name: [], creditCardNumber: [], cvv2: [], dates: [] }
  };

  handleNameInputChange = (name: string) => {
    this.setState({ name }, this.clearSubmissionErrors);
  };

  handleCreditCardInputChange = (creditCardNumber: string) => {
    this.setState({ creditCardNumber }, this.clearSubmissionErrors);
  };

  handleCVV2InputChange = (cvv2: string) => {
    this.setState({ cvv2 }, this.clearSubmissionErrors);
  };

  handleMonthChange = (expirationMonth: string) => {
    this.setState({ expirationMonth }, this.clearSubmissionErrors);
  };
  handleYearChange = (expirationYear: string) => {
    this.setState({ expirationYear }, this.clearSubmissionErrors);
  };

  clearSubmissionErrors = () => {
    this.setState({
      errors: { name: [], creditCardNumber: [], cvv2: [], dates: [] }
    });
  };

  handleSubmit = () => {
    const errors = validateFormSubmission(this.state);
    if (Object.keys(errors).some(errorKey => errors[errorKey].length > 0)) {
      this.setState({ errors });
      return;
    }
    this.props.onSubmit(this.state);
  };

  render() {
    const { onSubmit } = this.props;
    const {
      name,
      creditCardNumber,
      cvv2,
      expirationMonth,
      expirationYear,
      errors
    } = this.state;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: 400,
          backgroundColor: "#EDECED",
          borderRadius: 4,
          padding: 40
        }}
      >
        <CreditCardNameField
          onChange={this.handleNameInputChange}
          name={name}
          errors={errors.name}
        />
        <CreditCardNumberField
          onChange={this.handleCreditCardInputChange}
          number={creditCardNumber}
          errors={errors.creditCardNumber}
        />

        <CVV2Field
          onChange={this.handleCVV2InputChange}
          number={cvv2}
          creditCardNumber={creditCardNumber}
          errors={errors.cvv2}
        />
        <DateFields
          onMonthChange={this.handleMonthChange}
          month={expirationMonth}
          onYearChange={this.handleYearChange}
          year={expirationYear}
          errors={errors.dates}
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            paddingLeft: 10,
            paddingRight: 10
          }}
        >
          <img className={"creditCardImage"} src={Visa} />
          <img className={"creditCardImage"} src={AmEx} />
          <img className={"creditCardImage"} src={MC} />
          <img className={"creditCardImage"} src={Discover} />
        </div>
        <Button onClick={this.handleSubmit}>Submit</Button>
      </div>
    );
  }
}

function validateFormSubmission(
  formValue: FormValue
): { [errorKey: string]: Array<string> } {
  const errors = {
    name: [],
    creditCardNumber: [],
    cvv2: [],
    dates: []
  };

  if (!creditCardNameIsValidForSubmission(formValue.name)) {
    errors.name.push("Please enter the name on your credit card");
  }

  // Credit card number validations
  const vendor = formValue.creditCardNumber
    ? getCreditVendor(formValue.creditCardNumber)
    : null;
  if (
    !creditCardNumberIsValidForSubmission(formValue.creditCardNumber, vendor)
  ) {
    errors.creditCardNumber.push("Credit card number is invalid");
  }
  if (!cvv2IsValidForSubmission(formValue.cvv2, vendor)) {
    errors.cvv2.push("Cvv2 is invalid");
  }
  if (
    !monthIsValidForSubmission(formValue.expirationMonth) ||
    !yearIsValidForSubmission(formValue.expirationYear)
  ) {
    errors.dates.push("Date is invalid");
  }
  return errors;
}

function creditCardNumberIsValidForSubmission(
  number: string | null,
  vendor: { numberLength: number } | null
) {
  return number != null && vendor && number.length === vendor.numberLength;
}

function creditCardNameIsValidForSubmission(name: string | null): boolean {
  return name != null && name.length > 0;
}

function cvv2IsValidForSubmission(
  number: string | null,
  vendor: { cvvLength: number } | null
) {
  return number != null && vendor && number.length === vendor.cvvLength;
}
function monthIsValidForSubmission(month: string | null): boolean {
  return month != null && month.length === 2;
}
function yearIsValidForSubmission(year: string | null): boolean {
  return year != null && year.length === 2;
}
