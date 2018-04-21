// @flow
import React from "react";
import InputField from "../../base_components/InputField";
import {
  isVisa,
  isAmEx,
  isKnownCreditVendor,
  getCreditVendor
} from "../creditCardHelpers";
import InlineErrors from "../../base_components/InlineErrors";
import { vendor } from "postcss";

type Props = {
  number: string | null,
  onChange: string => void,
  errors: Array<string>
};

type State = {};
export default class CreditCardNumber extends React.Component<Props, State> {
  handleChange = (number: string) => {
    // number may include dashes
    const numberWithoutDashes = number.split("-").join("");
    if (/[A-Za-z]/.test(number[number.length - 1])) {
      return this.props.onChange(numberWithoutDashes);
    }

    const vendorConfig = getCreditVendor(number);

    if (vendorConfig) {
      this.props.onChange(
        numberWithoutDashes.slice(0, vendorConfig.numberLength)
      );
    } else {
      this.props.onChange(numberWithoutDashes);
    }
  };
  render() {
    const { number, errors } = this.props;
    const vendorConfig = number ? getCreditVendor(number) : null;
    const groupings = vendorConfig ? vendorConfig.groupings : [];
    const value = addDashes(number, groupings);
    return (
      <div>
        <InputField
          type="text"
          placeholder="Enter your credit card number"
          onChange={this.handleChange}
          value={value}
        />
        {/* with more time, I would find a way to handle edit vs. submission vs. api/backend errors in the same fashion */}
        <InlineErrors errors={errors} />
        {number && !isKnownCreditVendor(number) ? (
          <div>Unrecognized credit card number</div>
        ) : null}
      </div>
    );
  }
}

function addDashes(
  number: string | null,
  groupings: Array<number>
): string | null {
  if (groupings.length === 0) {
    return number;
  }
  if (number == null) {
    return null;
  }
  const result = [];
  let lastIndex = 0;
  groupings.forEach(grouping => {
    // $FlowFixMe
    result.push(number.slice(lastIndex, lastIndex + grouping));
    lastIndex += grouping;
  });

  return result.filter(item => item.length > 0).join("-");
}
