// @flow
import React from "react";
import InputField from "../../base_components/InputField";

type Props = {
  number: string | null,
  onChange: string => void
};
type State = {};
export default class CreditCardNumber extends React.Component<Props, State> {
  render() {
    const { number, onChange } = this.props;
    return (
      <InputField
        type="number"
        placeholder="Enter your credit card number"
        onChange={onChange}
        value={number}
      />
    );
  }
}
