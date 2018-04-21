// @flow
import React from "react";
import InputField from "../../base_components/InputField";

type Props = {
  onMonthChange: string => void,
  onYearChange: string => void,
  month: string | null,
  year: string | null
};
type State = {};
export default class DateFields extends React.Component<Props, State> {
  render() {
    const { onMonthChange, onYearChange, month, year } = this.props;
    return (
      <div>
        <InputField
          type="number"
          value={month}
          onChange={onMonthChange}
          placeholder="month"
        />
        <InputField
          value={year}
          type="number"
          onChange={onYearChange}
          placeholder="year"
        />
      </div>
    );
  }
}
