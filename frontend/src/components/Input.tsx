import React, { ChangeEvent, FC, useState, FocusEvent } from "react";
import styled from "styled-components";

//layout component
import { fontSize, neutral } from "./token";
import { Eye, EyeOff, SearchIcon } from "../assets/Icons";
import Text from "./Text";

export interface Props {
  label?: string;
  name: string;
  type?: "text" | "password" | "search" | "number" | "email" | "date";
  maxLength?: number;
  value?: string;
  prefix?: string;
  suffix?: string;
  error?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: FocusEvent<HTMLInputElement>) => void;
}

export const Input: FC<Props> = ({
  name,
  label,
  maxLength,
  type,
  prefix,
  suffix,
  error,
  onChange,
  ...rest
}) => {
  const [isPassword, setIsPassword] = useState(true);

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      {type === "search" ? (
        <form action=".">
          <InputTag
            name={name}
            type={type}
            maxLength={maxLength}
            onChange={onChange}
            {...rest}
          />
          <div className="search" aria-hidden="true">
            <SearchIcon
              width={20}
              height={20}
              color="#000"
              stroke={1}
              fill={undefined}
            />
          </div>
        </form>
      ) : type === "number" ? (
        <>
          <InputTag
            name={name}
            type="text"
            inputMode="decimal"
            pattern="[0-9]*"
            maxLength={maxLength}
            onChange={onChange}
            {...rest}
          />
          {error && (
            <Text variant="caption" color="red">
              {error}
            </Text>
          )}
        </>
      ) : prefix || suffix ? (
        <>
          <InputContainer prefix={prefix}>
            {prefix && (
              <div className="prefix" aria-hidden="true">
                {prefix}
              </div>
            )}
            <input
              name={name}
              type="text"
              inputMode="decimal"
              maxLength={maxLength}
              onChange={onChange}
              {...rest}
            />
            {suffix && (
              <div className="suffix" aria-hidden="true">
                {suffix}
              </div>
            )}
          </InputContainer>
          {error && (
            <Text variant="caption" color="red">
              {error}
            </Text>
          )}
        </>
      ) : (
        <>
          <InputTag
            name={name}
            type={
              type === "password" && isPassword
                ? "password"
                : type === "password" && !isPassword
                ? "text"
                : type
            }
            maxLength={maxLength}
            onChange={onChange}
            {...rest}
          />
          {error && (
            <Text variant="caption" color="red">
              {error}
            </Text>
          )}
          {type === "password" && (
            <button
              type="button"
              role="switch"
              className="pw"
              aria-pressed={!isPassword}
              onClick={() => setIsPassword(!isPassword)}
            >
              {isPassword ? (
                <Eye width={20} height={20} color="#000" stroke={1} />
              ) : (
                <EyeOff width={20} height={20} color="#000" stroke={1} />
              )}
            </button>
          )}
        </>
      )}
    </Container>
  );
};

export interface CCProps {
  label?: string;
  name: string;
  mask: string;
  value: string;
  placeholder?: string;
  onChange: (cleanValue: string, name: string) => void;
}

export const InputMask: FC<CCProps> = ({
  value,
  mask,
  label,
  name,
  placeholder,
  onChange,
  ...rest
}) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    const cleanValue = value.replace(/[^\d]/g, "");
    onChange(cleanValue, name);
  };

  const formatValue = (value: string, mask: string) => {
    let i = 0;
    let lastReplacedIndex = -1;
    const filledMask = mask.replace(/#/g, (_, j) => {
      if (i >= value.length) {
        return "#";
      }
      lastReplacedIndex = j;
      return value[i++];
    });
    return filledMask.substring(0, lastReplacedIndex + 1);
  };

  return (
    <Container>
      {label && <label htmlFor={name}>{label}</label>}
      <InputTag
        value={formatValue(value, mask)}
        name={name}
        placeholder={placeholder ? placeholder : mask}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        onChange={handleChange}
        {...rest}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  position: relative;

  label {
    display: inline-block;
    font-size: ${fontSize.base};
    padding: 0 0 0.5rem;
  }

  button {
    background: transparent;
    display: flex;
    align-items: center;
    border: none;
  }

  .pw {
    position: absolute;
    bottom: calc(1.5rem - 10px);
    right: 0.75rem;
    cursor: pointer;
  }

  form {
    display: flex;
    align-items: center;
  }

  .search {
    position: absolute;
    left: 0.75rem;
  }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  height: 3rem;
  border-radius: 0.35rem;
  border: 1px solid #d2d2d7;

  &:focus-within {
    box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
    border-radius: 0.35rem;
  }

  input {
    width: 100%;
    border: none;
    font-size: ${fontSize.base};
    text-align: ${(props) => (props.prefix ? "left" : "right")};
    padding: ${(props) => (props.prefix ? "0 0.25rem 0 0" : "0 1rem")};

    &:focus {
      outline: none;
    }
  }

  .prefix,
  .suffix {
    font-size: ${fontSize.sm2};
    padding: 0.75rem;
  }
`;

const InputTag = styled.input`
  width: 100%;
  font-size: ${fontSize.base};
  height: 3rem;
  border-radius: 0.35rem;
  border: 1px solid #d2d2d7;
  padding: ${(props) =>
    props.type === "search" ? "0 0.875rem 0 2.5rem" : "0 0.875rem"};
  background-color: #fff;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;

  &:focus {
    box-shadow: 0 0 0 4px rgba(0, 125, 250, 0.6);
    border-radius: 0.35rem;
    outline: none;
  }

  ::placeholder,
  ::-webkit-input-placeholder {
    font-size: ${fontSize.base};
    color: ${neutral[200]};
  }
`;
