// @flow
import React from "react";
import InputField from "../../base_components/InputField";

type Props = {
  name: string | null,
  onChange: string => void
};

type State = {};
export default class CreditCardNameField extends React.Component<Props, State> {
  render() {
    const { name, onChange } = this.props;
    return (
      <InputField
        type="text"
        value={name}
        placeholder="Your name as it appears on your credit card"
        onChange={onChange}
      />
    );
  }
}
