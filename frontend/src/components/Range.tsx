import React, { FC, ChangeEvent, useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { fontSize, neutral } from "./token";

interface Props {
  initialSize?: number;
  minSize?: number;
  maxSize?: number;
  step?: number;
  value?: number;
  name?: string;
  linearColor?: string;
  rangeColor?: string;
  thumbColor?: string;
  margin?: string;
  handleSliderValue: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Slider: FC<Props> = ({
  minSize,
  maxSize,
  step,
  value,
  name,
  linearColor,
  rangeColor,
  thumbColor,
  margin,
  handleSliderValue,
}) => {
  const sliderRef = useRef<HTMLInputElement>(null);
  const [range, setRange] = useState<number>();

  useEffect(() => {
    const rangeValue = parseInt(sliderRef.current!.value, 10);
    rangeLinear(rangeValue, minSize!, maxSize!);
  }, [sliderRef, minSize, maxSize]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    handleSliderValue(e);
    setRange(e.target.valueAsNumber);

    rangeLinear(e.target.valueAsNumber, minSize!, maxSize!);
  };

  const calculatePercentage = (value: number, min: number, max: number) => {
    return ((value - min) / (max - min)) * 100 + "%";
  };

  const rangeLinear = (value: number, min: number, max: number) => {
    const percentage = calculatePercentage(value, min, max);
    const newBackground = `linear-gradient(90deg, ${linearColor} 0% ${percentage}, ${rangeColor} ${percentage} 100%)`;
    if (sliderRef.current) sliderRef.current.style.background = newBackground;
  };

  return (
    <Wrapper>
      <Label>{name}</Label>
      <InputContainer>
        <Input
          ref={sliderRef}
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

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  height: 7px;
  border-radius: 5px;
  background: #d7dcdf;
  outline: none;
  padding: 0;
  margin: 0;

  &::-webkit-slider-thumb {
    appearance: none;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    cursor: pointer;
    background: #fff;
    border: 1px solid ${neutral[200]};
    box-shadow: 0 0 3px rgba(0, 0, 0, 0.1);
    transition: background 0.15s ease-in-out;
  }

  &::-moz-range-thumb {
    width: 24px;
    height: 24px;
    border: 0;
    border-radius: 50%;
    cursor: pointer;
    background: #fff;
    border: 1px solid ${neutral[200]};
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
    transition: background 0.15s ease-in-out;
  }
`;

const Value = styled.div`
  width: 6%;
  font-size: ${fontSize.sm1};
  font-weight: 600;
  text-align: right;
`;

export default Slider;
