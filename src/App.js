import React, { Component } from "react";
import logo from "./logo.svg";
import CreditCardForm from "./credit_cards/CreditCardForm";
import "./App.css";

class App extends Component {
  handleSubmit = formValue => {
    // convert month and year to date time object
    // submit all form values to backend using
    // endpoint that is user specific OR pass along user id
  };

  render() {
    return (
      <div
        className="App"
        style={{ display: "flex", justifyContent: "center" }}
      >
        <div style={{ padding: 40 }}>
          <CreditCardForm onSubmit={this.handleSubmit} />
        </div>
      </div>
    );
  }
}

export default App;
