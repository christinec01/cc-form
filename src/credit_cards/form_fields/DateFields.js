// @flow
import React from "react";
import InputField from "../../base_components/InputField";
import { isDate } from "util";
import InlineErrors from "../../base_components/InlineErrors";

type Props = {
  onMonthChange: string => void,
  onYearChange: string => void,
  month: string | null,
  year: string | null,
  errors: Array<string>
};
type State = {};
export default class DateFields extends React.Component<Props, State> {
  handleMonthChange = (month: string) => {
    const newMonth = restrictedDateInput(processMonth(month));
    this.props.onMonthChange(newMonth);
  };
  handleYearChange = (year: string) => {
    const newYear = restrictedDateInput(year);
    this.props.onYearChange(newYear);
  };
  render() {
    const { onYearChange, month, year, errors } = this.props;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between"
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <InputField
            type="number"
            value={month}
            onChange={this.handleMonthChange}
            placeholder="month"
          />
          <InlineErrors errors={errors} />
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <InputField
            value={year}
            type="number"
            onChange={this.handleYearChange}
            placeholder="year"
          />
          <InlineErrors errors={errors} />
          {!isDateValid(month, year) ? "Invalid date" : null}
        </div>
      </div>
    );
  }
}

function restrictedDateInput(dateInput: string): string {
  if (dateInput.length > 2) {
    return dateInput.slice(0, 2);
  }
  return dateInput;
}

function processMonth(month: string): string {
  if (month.length === 1 && /^[2-9]$/.test(month[0])) {
    return "0".concat(month);
  }
  if (month[0] !== "0" && /^[3-9]$/.test(month[1])) {
    return month[0];
  }
  return month;
}

function isDateValid(month: string | null, year: string | null): boolean {
  if (!year || (year && year.length < 2)) {
    return true;
  }
  // note to self - this will break on Jan 1, 2100
  const inputYearValue = parseInt("20" + year, 10);
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();

  // basic year check
  if (inputYearValue < currentYear) {
    return false;
  }

  // month check
  if (!month || (month && month.length < 2)) {
    return true;
  }
  const inputMonthValue = parseInt(month, 10);
  if (
    inputYearValue === currentYear &&
    inputMonthValue < currentDate.getMonth()
  ) {
    return false;
  }
  return true;
}
