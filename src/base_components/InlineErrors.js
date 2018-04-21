// @flow
import * as React from "react";

type Props = {
  errors: Array<string>
};

export default class InlineErrors extends React.Component<Props> {
  render() {
    const { errors } = this.props;
    return <div>{errors.map(error => <div>{error}</div>)}</div>;
  }
}
