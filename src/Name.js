import React from "react";

export default class Name extends React.Component {
  handleNameFieldChange = e => {
    this.props.onChange(e.target.value);
  };
  render() {
    const { value } = this.props;
    return (
      <form>
        <input
          type="text"
          value={value}
          placeholder="Your name as it appears on your credit card"
          onChange={this.handleNameFieldChange}
        />
      </form>
    );
  }
}
