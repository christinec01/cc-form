// @flow
import * as React from "react";

type Props = {
  children: React.Element<*> | string,
  onClick: () => void,
  disabled?: boolean
};

const disabledStyle = {
  backgroundColor: "#d8d8d8",
  color: "#c4c4c4",
  borderColor: "#d8d8d8",
  borderSize: "1px",
  borderStyle: "solid"
};

const enabledStyle = {
  backgroundColor: "lightGray",
  color: "#fff",
  borderColor: "black",
  borderSize: "1px",
  borderStyle: "solid",
  cursor: "pointer"
};

export default function Button({ children, onClick, disabled }: Props) {
  return (
    <div
      onClick={!disabled ? onClick : () => {}}
      style={!disabled ? enabledStyle : disabledStyle}
    >
      {children}
    </div>
  );
}
