// @flow
import React from "react";
import InputField from "../../base_components/InputField";
import { isAmEx, isVisa } from "../creditCardHelpers";

type Props = {
  number: string | null,
  onChange: string => void,
  creditCardNumber: string | null
};
type State = {};
export default class CVV2Field extends React.Component<Props, State> {
  handleChange = (number: string) => {
    const { creditCardNumber, onChange } = this.props;
    if (creditCardNumber && isVisa(creditCardNumber)) {
      onChange(number.slice(0, 3));
    }

    if (creditCardNumber && isAmEx(creditCardNumber)) {
      onChange(number.slice(0, 4));
    }
  };
  render() {
    const { number, onChange, creditCardNumber } = this.props;
    return (
      <InputField
        type="number"
        placeholder="CVV2"
        onChange={this.handleChange}
        value={number}
      />
    );
  }
}
