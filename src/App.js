import React, { Component } from "react";
import { Row, Col } from "antd";
import styled from "styled-components";
import { DEFAULT_STATE } from "./constant";

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
  margin-right: 2px;
  border-color: #4CAF50;
  color: green;
  border-radius: 4px;
  &:hover {
    background-color: #4CAF50;
    color: white;
  }
  &:focus {
    outline:0;
  }
`;

const FormContainer = styled.div`
  display: flex;
  padding-top: 16px;
  width: 100%;
  justify-content: center;
`;

const Image = styled.div`
  opacity: ${props => props.opacity && '0.2' };
`;

const Content = styled.div`
  padding-top: 40px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
`;

const Text = styled.div`
  font-size: 11px;
  font-weight: ${props => props.bold ? 'bold' : 'lighter'};
`;

const Error = styled.div`
  color: red;
  font-size: 11px;
  padding: 8px;
`;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...DEFAULT_STATE
    };
  }

  onChange = e => {
    this.setState({ input: e.target.value });
  };

  onKeyPress = e => {
    if (e.key === "Enter") {
      this.calculating(e.target.value);
    }
  };

  onClear = () => {
    this.setState({
      ...DEFAULT_STATE
    });
  };

  computeChange = (changeArray, amount) => {
    const result = changeArray.map(val => {
      let changeAmount = +(~~(amount / val)).toFixed(2);
      amount -= (val * changeAmount);
      amount = +((amount * 100 ) / 100).toFixed(2);
      return changeAmount
    })
    return result;
  }

  calRemainingValue = ({ remainingValue, currencyType, state }) => {
    remainingValue = +remainingValue;
    const computed = ~~(remainingValue / currencyType);
    this.setState({ [state]: computed });
    return remainingValue - computed * currencyType;
  };

  validateValue = value => {
    const errors = [];
    if (isNaN(+value)) {
      errors.push("VALUE MUST BE NUMBER");
    } if (+value < 0) {
      errors.push("VALUE MUST BE GRATHER THAN 0");
    }

    if (errors.length > 0) {
      this.setState({ errors });
      return false;
    }
    return true;
  };

  calculating = value => {
    if (this.validateValue(value)) {
      this.setState({ ...DEFAULT_STATE, input: +(+value).toFixed(2) });
      let remainingValue = +(+value).toFixed(2);
      const result = this.computeChange([100, 50, 20, 10, 5, 1, 0.25, 0.1, 0.05, 0.01] ,remainingValue)
      this.setState({ 
        hundred: result[0],
        fifty: result[1],
        twenty: result[2],
        ten: result[3],
        five: result[4],
        one: result[5],
        quarter: result[6],
        dime:  result[7],
        nickel: result[8],
        penny: result[9],
       })
    }
  };

  renderIcon = ({ path, name, count }) => {
    return (
      <Image opacity={count === 0}>
        <img src={path} alt={name} height="100" width="100" />
        <Text bold={count > 0}>
          {name}: {count}
        </Text>
      </Image>
    );
  };

  render() {
    const {
      input,
      hundred,
      fifty,
      twenty,
      ten,
      five,
      one,
      quarter,
      dime,
      nickel,
      penny,
      errors
    } = this.state;
    return (
      <Layout>
        <Header>Change Calculator</Header>
        <FormContainer>
          <Input
            value={input}
            onChange={this.onChange}
            onKeyPress={this.onKeyPress}
          />
          <Button onClick={() => this.calculating(input)}>
            Calculate
          </Button>

          <Button onClick={this.onClear}>Clear</Button>
        </FormContainer>

        <Error>{errors.length > 0 ? errors : ""}</Error>

        <Content>
          <Row>
            <Col span={8}>{this.renderIcon({ path: "./image/hundred.png", name: "hundred", count: hundred})}</Col>
            <Col span={8}>{this.renderIcon({ path: "./image/one.png", name: "one", count: one})}</Col>
          </Row>
          <Row>
            <Col span={8}>{this.renderIcon({ path: "./image/fifty.png", name: "fifty", count: fifty})}</Col>
            <Col span={8}>{this.renderIcon({ path: "./image/quarter.png", name: "quarter", count: quarter})}</Col>
          </Row>
          <Row>
            <Col span={8}>{this.renderIcon({ path: "./image/twenty.png", name: "twenty", count: twenty})}</Col>
            <Col span={8}>{this.renderIcon({ path: "./image/dime.png", name: "dime", count: dime})}</Col>
          </Row>
          <Row>
            <Col span={8}>{this.renderIcon({ path: "./image/ten.png", name: "ten", count: ten})}</Col>
            <Col span={8}>{this.renderIcon({ path: "./image/nickel.png", name: "nickel", count: nickel})}</Col>
          </Row>
          <Row>
            <Col span={8}>{this.renderIcon({ path: "./image/five.png", name: "five", count: five})}</Col>
            <Col span={8}>{this.renderIcon({ path: "./image/penny.png", name: "penny", count: penny})}</Col>
          </Row>
        </Content>
      </Layout>
    );
  }
}

export default App;
