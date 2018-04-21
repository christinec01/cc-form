// @flow
import React from "react";
import InputField from "../../base_components/InputField";

type Props = {
  number: string | null,
  onChange: string => void
};
type State = {};
export default class CVV2Field extends React.Component<Props, State> {
  render() {
    const { number, onChange } = this.props;
    return (
      <InputField
        type="number"
        placeholder="CVV2"
        onChange={onChange}
        value={number}
      />
    );
  }
}
