// @flow
import React from "react";
import InputField from "../../base_components/InputField";
import InlineErrors from "../../base_components/InlineErrors";

type Props = {
  name: string | null,
  onChange: string => void,
  errors: Array<string>
};

type State = {};
export default class CreditCardNameField extends React.Component<Props, State> {
  render() {
    const { name, onChange, errors } = this.props;
    return (
      <div>
        <InputField
          type="text"
          value={name}
          placeholder="Your name as it appears on your credit card"
          onChange={onChange}
        />
        <InlineErrors errors={errors} />
      </div>
    );
  }
}
