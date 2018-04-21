// @flow
import React from "react";
import InputField from "../../base_components/InputField";
import { isVisa, isAmEx, isKnownCreditVendor } from "../creditCardHelpers";

type Props = {
  number: string | null,
  onChange: string => void
};
type State = {};
export default class CreditCardNumber extends React.Component<Props, State> {
  handleChange = (number: string) => {
    // number may include dashes
    const numberWithoutDashes = number.split("-").join("");
    if (/[A-Za-z]/.test(number[number.length - 1])) {
      return this.props.onChange(numberWithoutDashes);
    }
    if (isVisa(numberWithoutDashes)) {
      this.props.onChange(numberWithoutDashes.slice(0, 16));
    } else if (isAmEx(numberWithoutDashes)) {
      this.props.onChange(numberWithoutDashes.slice(0, 15));
    } else {
      this.props.onChange(numberWithoutDashes);
    }
  };
  render() {
    const { number } = this.props;
    const groupings = groupingsForVendor(number);
    const value = addDashes(number, groupings);
    return (
      <div>
        <InputField
          type="text"
          placeholder="Enter your credit card number"
          onChange={this.handleChange}
          value={value}
        />
        {number && !isKnownCreditVendor(number) ? (
          <div>Unrecognized credit card number</div>
        ) : null}
      </div>
    );
  }
}

function groupingsForVendor(number: string | null): Array<number> {
  if (number == null) {
    return [];
  }
  if (isVisa(number)) {
    return [4, 4, 4, 4];
  } else if (isAmEx(number)) {
    return [4, 6, 5];
  } else {
    return [];
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

// [4444, 5555, 66666, 77777]
// 4444555566667777
// 4444-5555-6666-7777

// function addDashes(number) {
//   if (number && isVisa(number)) {
//     return number.slice(0, 3).concat("-");
//   }
// }
