// @flow
import * as React from "react";

type Props = {
  onChange: (value: *) => void,
  placeholder: string | null,
  value: string | null,
  type: "text" | "number"
};

type State = {
  showList: boolean
};

export default class InputField extends React.Component<Props, State> {
  handleInputChange = (e: { target: { value: string } }) => {
    this.props.onChange(e.target.value);
  };

  render() {
    const { value, placeholder, type } = this.props;
    return (
      <input
        type={type}
        style={{ fontSize: 14, width: "-webkit-fill-available" }}
        value={value}
        placeholder={placeholder}
        onChange={this.handleInputChange}
      />
    );
  }
}
