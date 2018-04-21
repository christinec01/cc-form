// @flow
import React from "react";
import InputField from "../../base_components/InputField";
import { isKnownCreditVendor, getCreditVendor } from "../creditCardHelpers";
import { vendor } from "postcss";

type Props = {
  number: string | null,
  onChange: string => void,
  creditCardNumber: string | null
};
type State = {};
export default class CVV2Field extends React.Component<Props, State> {
  handleChange = (number: string) => {
    const { creditCardNumber, onChange } = this.props;
    const vendorConfig = creditCardNumber
      ? getCreditVendor(creditCardNumber)
      : null;
    if (vendorConfig) {
      onChange(number.slice(0, vendorConfig.cvvLength));
    } else {
      onChange(number);
    }
  };
  render() {
    const { number, onChange, creditCardNumber } = this.props;
    return (
      <div>
        <InputField
          type="number"
          placeholder="CVV2"
          onChange={this.handleChange}
          value={number}
        />
        {number &&
        creditCardNumber &&
        !isKnownCreditVendor(creditCardNumber) ? (
          <div>Unknown credit card</div>
        ) : null}
      </div>
    );
  }
}
