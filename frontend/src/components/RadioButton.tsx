import React, { FC, ChangeEvent } from "react";

//import libraries
import styled from "styled-components";
import { neutral } from "./token";

interface Props {
  label?: string;
  value?: string;
  name?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Radio: FC<Props> = ({
  value,
  name,
  checked,
  onChange,
  label,
  disabled,
}) => {
  return (
    <Wrapper>
      <Input
        id={label}
        name={name}
        type="radio"
        checked={checked}
        onChange={onChange}
        value={value}
        disabled={disabled}
      />
      <label htmlFor={label}>
        {disabled ? (
          <span className="disabled">{label}</span>
        ) : (
          <span>{label}</span>
        )}
      </label>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;

  .disabled {
    color: ${neutral[300]};
  }
`;

const Input = styled.input`
  position: absolute;
  opacity: 0;

  + label {
    display: inline-block;
    width: 100%;
    padding: 1rem 0 1rem 2rem;
    cursor: pointer;
  }

  + label::before {
    position: absolute;
    /* top: calc(1rem - 2px); */
    top: 50%;
    left: 0;
    width: 20px;
    height: 20px;
    border: 2px solid #888;
    border-radius: 50%;
    transform: translateY(-50%);
    content: "";
    /* transition: all 0.1s ease-in-out; */
  }

  + label::after {
    content: "";
    /* border: 5px solid #ffcc00; */
    width: 10px;
    height: 10px;
    background-color: #ffffff;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    left: 7px;
    opacity: 0;
    transform: translateY(-50%);
    transition: opacity 0.2s ease-in-out;
  }

  &:checked + label::before {
    background-color: #0a3ddb;
    border-color: #0a3ddb;
  }

  &:checked + label::after {
    opacity: 1;
  }

  &:focus + label::before {
    box-shadow: 0 0 0 3px #c6d0f7;
    outline: 3px solid transparent;
  }

  &:disabled + label::before {
    background-color: #cdcdcd;
    border-color: #cdcdcd;
  }
`;
