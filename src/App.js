import React, { Component } from "react";
import _ from "lodash";
import "./App.css";
import { Row, Col } from "antd";
import styled from "styled-components";
// import { Dime } from './Image'
const CURRENCY_TYPE = {
  hundred: 100,
  fifty: 50,
  twenty: 20,
  ten: 10,
  five: 5,
  one: 1,
  quarter: 0.25,
  dime: 0.1,
  nickel: 0.05,
  penny: 0.01
};

const Layout = styled.div`
  padding: 40px 160px 40px 160px;
  text-align: center;
`;

const Header = styled.div`
  font-size: 48px;
  font-weight: lighter;
  padding: 16px;
`;

const Input = styled.input`
  padding: 8px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 4px;
`;

const Button = styled.button`
  padding: 8px;
  background-color: #c9a;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const FormContainer = styled.div`
  display: flex;
  padding-top: 16px;
  width: 100%;
  justify-content: center;
`;

const Image = styled.div``;

const Content = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
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

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onClear = () => {
    this.setState({
      input: "",
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
    })
  }

  calRemainingValue = ({ remainingValue, currencyType, state }) => {
    if (!_.values(CURRENCY_TYPE).find(c => c === currencyType)) {
      throw new Error("NOT FOUND CURRENCY TYPE");
    }
    if (!_.keys(CURRENCY_TYPE).find(c => c === state)) {
      throw new Error("NOT FOUND STATE");
    }
    remainingValue = +remainingValue;
    const computed = ~~(remainingValue / currencyType);
    this.setState({ [state]: computed });
    return remainingValue - computed * currencyType;
  };

  calculating = value => {
    if (value < 0) {
      throw new Error("VALUE MUST BE GRATHER THAN 0");
    }
    if (isNaN(+value)) {
      throw new Error("VALUE MUST BE NUMBER");
    }
    // this.setState({ input: +value.toFixed(2) });
    console.log(">>>>>", value);
    let remainingValue = +(+value).toFixed(2);
    if (remainingValue > CURRENCY_TYPE["hundred"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["hundred"],
        state: "hundred"
      });
    }
    if (remainingValue > CURRENCY_TYPE["fifty"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["fifty"],
        state: "fifty"
      });
    }
    if (remainingValue > CURRENCY_TYPE["twenty"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["twenty"],
        state: "twenty"
      });
    }
    if (remainingValue > CURRENCY_TYPE["ten"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["ten"],
        state: "ten"
      });
    }
    if (remainingValue > CURRENCY_TYPE["five"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["five"],
        state: "five"
      });
    }
    if (remainingValue > CURRENCY_TYPE["one"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["one"],
        state: "one"
      });
    }
    if (remainingValue > CURRENCY_TYPE["quarter"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["quarter"],
        state: "quarter"
      });
    }
    if (remainingValue > CURRENCY_TYPE["dime"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["dime"],
        state: "dime"
      });
    }
    if (remainingValue > CURRENCY_TYPE["nickel"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["nickel"],
        state: "nickel"
      });
    }
    if (remainingValue > CURRENCY_TYPE["penny"]) {
      remainingValue = this.calRemainingValue({
        remainingValue,
        currencyType: CURRENCY_TYPE["penny"],
        state: "penny"
      });
    }
  };

  renderIcon = ({ path, count }) => {
    return (
      <Image>
        <img src={path} alt="Smiley face" height="80" width="80" />
        <div>{count}</div>
      </Image>
    );
  };

  render() {
    console.log(this.state);
    return (
      <Layout>
        <Header>Change Calculator</Header>
        <FormContainer>
          <Input value={this.state.input} onChange={this.onChange} />
          <Button onClick={() => this.calculating(this.state.input)}>
            Calculate
          </Button>

          <Button onClick={this.onClear}>
            Clear
          </Button>
        </FormContainer>
        

        <Content>
          <Row>
            <Col span={8}>{this.renderIcon({path: "./image/hundred.png", count: this.state.hundred})}</Col>
            <Col span={8}>{this.renderIcon({path: "./image/fifty.png", count: this.state.fifty})}</Col>
            <Col span={8}>{this.renderIcon({path: "./image/twenty.png", count: this.state.twenty})}</Col>
          </Row>
          <Row>
            <Col span={8}>{this.renderIcon({path: "./image/ten.png", count: this.state.ten})}</Col>
            <Col span={8}>{this.renderIcon({path: "./image/one.png", count: this.state.one})}</Col>
            <Col span={8}>{this.renderIcon({path: "./image/quarter.png", count: this.state.quarter})}</Col>
          </Row>
          <Row>
            <Col span={8}>{this.renderIcon({path: "./image/dime.png", count: this.state.dime})}</Col>
            <Col span={8}>{this.renderIcon({path: "./image/nickel.png", count: this.state.nickel})}</Col>
            <Col span={8}>{this.renderIcon({path: "./image/penny.png", count: this.state.penny})}</Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
