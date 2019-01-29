import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new Adapter() });

describe("<App />", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  describe("onChange function", () => {
    it("should call function onChange and setState correct", () => {
      const value = { target: { value: 112.67 }};
      const expectedValueInState = 112.67;
  
      wrapper.instance().onChange(value);
      expect(wrapper.state("input")).toEqual(expectedValueInState);
    });
  });

  describe("onKeyPress function", () => {
    it("should call function onKeyPress and call function calculating", () => {
      const e = { key: "Enter", target: {value: 12} };      
      const spy = jest.spyOn(wrapper.instance(), 'calculating');
      wrapper.instance().onKeyPress(e);
      expect(spy).toHaveBeenCalledWith(e.target.value);
    });
  });

  describe("onClear function", () => {
    it("should call function onClear and setState correct", () => {
      wrapper.instance().onClear();
      expect(wrapper.state("input")).toEqual("")
      expect(wrapper.state("hundred")).toEqual(0)
      expect(wrapper.state("fifty")).toEqual(0)
      expect(wrapper.state("twenty")).toEqual(0)
      expect(wrapper.state("ten")).toEqual(0)
      expect(wrapper.state("five")).toEqual(0)
      expect(wrapper.state("one")).toEqual(0)
      expect(wrapper.state("quarter")).toEqual(0)
      expect(wrapper.state("dime")).toEqual(0)
      expect(wrapper.state("nickel")).toEqual(0)
      expect(wrapper.state("penny")).toEqual(0)
      expect(wrapper.state("errors")).toEqual([])
    });
  });
  

  describe("validateValue function", () => {
    it("should call function validateValue with correct params and return true", () => {
      const value = 128.56
  
      const expectedOutput = true;
      const expectedValueInState = [];
  
      const actual = wrapper.instance().validateValue(value);
  
      expect(actual).toEqual(expectedOutput);
      expect(wrapper.state("errors")).toEqual(expectedValueInState);
    });
  
    it("should call function validateValue with incorrect params (with string) and return false", () => {
      const value = "rockyou"
  
      const expectedOutput = false;
      const expectedValueInState = ["VALUE MUST BE NUMBER"];
  
      const actual = wrapper.instance().validateValue(value);
  
      expect(actual).toEqual(expectedOutput);
      expect(wrapper.state("errors")).toEqual(expectedValueInState);
    });
  
    it("should call function validateValue with incorrect params (minus value) and return false", () => {
      const value = -1
  
      const expectedOutput = false;
      const expectedValueInState = ["VALUE MUST BE GRATHER THAN 0"];
  
      const actual = wrapper.instance().validateValue(value);
  
      expect(actual).toEqual(expectedOutput);
      expect(wrapper.state("errors")).toEqual(expectedValueInState);
    });
  });


  describe("calRemainingValue function", () => {
    it("should call function calRemainingValue with correct params", () => {
      const params = {
        remainingValue: 150,
        currencyType: 100,
        state: "hundred"
      };
  
      const expectedOutput = 50;
      const expectedValueInState = 1;
  
      const actual = wrapper.instance().calRemainingValue(params);
  
      expect(actual).toEqual(expectedOutput);
      expect(wrapper.state("hundred")).toEqual(expectedValueInState);
    });
  
    it("should call function calRemainingValue with string (number)", () => {
      const params = {
        remainingValue: '23',
        currencyType: 20,
        state: "twenty"
      };
  
      const expectedOutput = 3;
      const expectedValueInState = 1;
  
      const actual = wrapper.instance().calRemainingValue(params);
  
      expect(actual).toEqual(expectedOutput);
      expect(wrapper.state("twenty")).toEqual(expectedValueInState);
    });
  });



  describe("calculating function", () => {
    it("should call function calculating with correct params (127.67)", () => {
      const value = 127.67

      const mockValidateFn = jest.fn(wrapper.instance().validateValue());
      mockValidateFn.mockReturnValue(true);

      wrapper.instance().calculating(value)
      expect(wrapper.state("hundred")).toEqual(1);
      expect(wrapper.state("fifty")).toEqual(0);
      expect(wrapper.state("twenty")).toEqual(1);
      expect(wrapper.state("ten")).toEqual(0);
      expect(wrapper.state("five")).toEqual(1);
      expect(wrapper.state("one")).toEqual(2);
      expect(wrapper.state("quarter")).toEqual(2);
      expect(wrapper.state("dime")).toEqual(1);
      expect(wrapper.state("nickel")).toEqual(1);
      expect(wrapper.state("penny")).toEqual(2);
    });

    it("should call function calculating with correct params (1)", () => {
      const value = 1

      const mockValidateFn = jest.fn(wrapper.instance().validateValue());
      mockValidateFn.mockReturnValue(true);

      wrapper.instance().calculating(value)
      expect(wrapper.state("hundred")).toEqual(0);
      expect(wrapper.state("fifty")).toEqual(0);
      expect(wrapper.state("twenty")).toEqual(0);
      expect(wrapper.state("ten")).toEqual(0);
      expect(wrapper.state("five")).toEqual(0);
      expect(wrapper.state("one")).toEqual(1);
      expect(wrapper.state("quarter")).toEqual(0);
      expect(wrapper.state("dime")).toEqual(0);
      expect(wrapper.state("nickel")).toEqual(0);
      expect(wrapper.state("penny")).toEqual(0);
    });

    it("should call function calculating with incorrect params must do nothing", () => {
      const value = "ABCD"

      const mockValidateFn = jest.fn(wrapper.instance().validateValue());
      mockValidateFn.mockReturnValue(false);

      wrapper.instance().calculating(value)
      expect(wrapper.state("hundred")).toEqual(0);
      expect(wrapper.state("fifty")).toEqual(0);
      expect(wrapper.state("twenty")).toEqual(0);
      expect(wrapper.state("ten")).toEqual(0);
      expect(wrapper.state("five")).toEqual(0);
      expect(wrapper.state("one")).toEqual(0);
      expect(wrapper.state("quarter")).toEqual(0);
      expect(wrapper.state("dime")).toEqual(0);
      expect(wrapper.state("nickel")).toEqual(0);
      expect(wrapper.state("penny")).toEqual(0);
    });
  });
});
