import React, { Component } from "react";
import "./App.css";
import { InputNumber, Button } from "antd";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: 0,
      hundred: 0,
      fifty: 0,
      twenty: 0,
      ten: 0,
      five: 0,
      one: 0,
      quarter: 0,
      dime: 0,
      nickel: 0,
      penny: 0
    };
  }

  onChange = value => {
    this.setState({ input: value });
  };

  calRemainingValue = ({remainingValue, type, state}) => {
    const computed = ~~(remainingValue / type);
    this.setState({ [state]: computed });
    return remainingValue - (computed * type)
  }

  calculating = value => {
    let remainingValue = value
    if (remainingValue > 100) { remainingValue = this.calRemainingValue({ remainingValue, type: 100, state: 'hundred' }) }
    if (remainingValue > 50) { remainingValue = this.calRemainingValue({ remainingValue, type: 50, state: 'fifty' }) }
    if (remainingValue > 20) { remainingValue = this.calRemainingValue({ remainingValue, type: 20, state: 'twenty' }) }
    if (remainingValue > 10) { remainingValue = this.calRemainingValue({ remainingValue, type: 10, state: 'ten' }) }
    if (remainingValue > 5) { remainingValue = this.calRemainingValue({ remainingValue, type: 5, state: 'five' }) }
    if (remainingValue > 1) { remainingValue = this.calRemainingValue({ remainingValue, type: 1, state: 'one' }) }
    if (remainingValue > 0.25) { remainingValue = this.calRemainingValue({ remainingValue, type: 0.25, state: 'quarter' }) }
    if (remainingValue > 0.1) { remainingValue = this.calRemainingValue({ remainingValue, type: 0.1, state: 'dime' }) }
    if (remainingValue > 0.05) { remainingValue = this.calRemainingValue({ remainingValue, type: 0.05, state: 'nickel' }) }
    if (remainingValue > 0.01) { remainingValue = this.calRemainingValue({ remainingValue, type: 0.01, state: 'penny' }) }
  };

  render() {
    console.log(this.state)
    return (
      <div className="App">
        <InputNumber
          defaultValue={this.state.input}
          formatter={value =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={value => value.replace(/\$\s?|(,*)/g, "")}
          onChange={this.onChange}
        />
        <Button onClick={() => this.calculating(this.state.input)}>
          Calculate
        </Button>
      </div>
    );
  }
}

export default App;
