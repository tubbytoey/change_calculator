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

  computeValue = (value, currencyType) => {
    return ~~(value / currencyType);
  };

  calculating = value => {
    let remainingValue = value;
    console.log(value);
    

    if (remainingValue > 100) {
      console.log(remainingValue)
      const computed = this.computeValue(remainingValue, 100);
      this.setState({ hundred: computed });
      remainingValue = remainingValue - (computed * 100);
    }
    
    if (remainingValue > 50) {
      const computed = this.computeValue(remainingValue, 50);
      this.setState({ fifty: computed });
      remainingValue = remainingValue - (computed * 50);
    }

    if (remainingValue > 20) {
      const computed = this.computeValue(remainingValue, 20);
      this.setState({ twenty: computed });
      remainingValue = remainingValue - (computed * 20);   
    }
   
    if (remainingValue > 10) {
      const computed = this.computeValue(remainingValue, 10);
      this.setState({ ten: computed });
      remainingValue = remainingValue - (computed * 10);   
    }

    if (remainingValue > 5) {
      const computed = this.computeValue(remainingValue, 5);
      this.setState({ five: computed });
      remainingValue = remainingValue - (computed * 5);  
    }

    if (remainingValue > 1) {
      const computed = this.computeValue(remainingValue, 1);
      this.setState({ one: computed });
      remainingValue = remainingValue - (computed * 1);  
    }

    if (remainingValue > 0.25) {
      const computed = this.computeValue(remainingValue, 0.25);
      this.setState({ quarter: computed });
      remainingValue = remainingValue - (computed * 0.25); 
    }

    if (remainingValue > 0.1) {
      const computed = this.computeValue(remainingValue, 0.1);
      this.setState({ dime: computed });
      remainingValue = remainingValue - (computed * 0.1);   
    }

    if (remainingValue > 0.05) {
      const computed = this.computeValue(remainingValue, 0.05);
      this.setState({ nickel: computed });
      remainingValue = remainingValue - (computed * 0.05);    
    }

    if (remainingValue > 0.01) {
      const computed = this.computeValue(remainingValue, 0.01);
      this.setState({ penny: computed });
      remainingValue = remainingValue - (computed * 0.01);      

    }

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


// calculating = value => {
//   let remainingValue = value;

//   const calRemainingValue = ({remainingValue, type, state}) => {
//     const computed = ~~(value / type);
//     this.setState({ [state]: computed });
//     remainingValue = remainingValue - (computed * 100);
//   }

//   if (remainingValue > 100) calRemainingValue({ remainingValue, type: 100, state: 'hundred' })
//   if (remainingValue > 50) calRemainingValue({ remainingValue, type: 50, state: 'fifty' })
//   if (remainingValue > 20) calRemainingValue({ remainingValue, type: 20, state: 'twenty' })
//   if (remainingValue > 10) calRemainingValue({ remainingValue, type: 10, state: 'ten' })
//   if (remainingValue > 5) calRemainingValue({ remainingValue, type: 5, state: 'five' })
//   if (remainingValue > 1) calRemainingValue({ remainingValue, type: 1, state: 'one' })
//   if (remainingValue > 0.25) calRemainingValue({ remainingValue, type: 0.25, state: 'quarter' })
//   if (remainingValue > 0.1) calRemainingValue({ remainingValue, type: 0.1, state: 'dime' })
//   if (remainingValue > 0.05) calRemainingValue({ remainingValue, type: 0.05, state: 'nickel' })
//   if (remainingValue > 0.01) calRemainingValue({ remainingValue, type: 0.01, state: 'penny' })

// };
