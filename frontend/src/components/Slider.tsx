import React, { FC, ChangeEvent } from "react";
import styled from "styled-components";
import { fontSize, primaryColor } from "./token";

interface Props {
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  step?: number;
  value?: number;
  name?: string;
  margin?: string;
  handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Slider: FC<Props> = ({
  minSize,
  maxSize,
  step,
  value,
  name,
  margin,
  handleChange,
}) => {
  return (
    <Wrapper margin={margin}>
      <Label>{name}</Label>
      <InputContainer>
        <Input
          type="range"
          name={name}
          min={minSize}
          max={maxSize}
          step={step}
          value={value}
          onChange={handleChange}
        />
      </InputContainer>
      <Value>{value}</Value>
    </Wrapper>
  );
};

const Wrapper = styled.div<Props>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: ${(props) => (props.margin ? props.margin : 0)};
`;

const Label = styled.div`
  width: 26%;
  font-size: ${fontSize.base};
  font-weight: 600;
`;
const InputContainer = styled.div`
  width: 68%;
`;

const Input = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 10px;
  border-radius: 5px;
  background-color: #eee;
  outline: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: white;
    border: 2px solid ${primaryColor.gold};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }

  &::-moz-range-thumb {
    appearance: none;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    background-color: white;
    border: 2px solid ${primaryColor.gold};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
  }
`;

const Value = styled.div`
  width: 6%;
  font-size: ${fontSize.sm1};
  font-weight: 600;
  text-align: right;
`;

export default Slider;
