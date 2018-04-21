// @flow
import React from "react";
import InputField from "../../base_components/InputField";
import {
  isKnownCreditVendor,
  getCreditVendor,
  cVV2IsValid
} from "../creditCardHelpers";
import InlineErrors from "../../base_components/InlineErrors";

import { vendor } from "postcss";

type Props = {
  number: string | null,
  onChange: string => void,
  creditCardNumber: string | null,
  errors: Array<string>
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
    const { number, onChange, creditCardNumber, errors } = this.props;
    return (
      <div>
        <InputField
          type="number"
          placeholder="CVV2"
          onChange={this.handleChange}
          value={number}
        />
        <InlineErrors errors={errors} />

        {number &&
        creditCardNumber &&
        !isKnownCreditVendor(creditCardNumber) ? (
          <div>Unknown credit card</div>
        ) : null}
      </div>
    );
  }
}
