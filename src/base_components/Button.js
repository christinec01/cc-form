// @flow
import * as React from "react";

type Props = {
  children: React.Element<*> | string,
  onClick: () => void
};

const enabledStyle = {
  backgroundColor: "#00cb89",
  color: "#fff",
  border: "1px solid #c3c3c3",
  cursor: "pointer",
  paddingTop: 10,
  paddingBottom: 10
};

export default function Button({ children, onClick }: Props) {
  return (
    <div onClick={onClick} style={enabledStyle}>
      {children}
    </div>
  );
}
