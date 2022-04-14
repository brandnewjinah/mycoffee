import React, { FC } from "react";
import styled from "styled-components";

//comp
import { neutral } from "./token";

//interface
import { SelectProps } from "../interfaces/interface";

const Select: FC<SelectProps> = ({
  options,
  onChange,
  selected,
  fullWidth,
}) => {
  return (
    <SelectWrapper>
      <SelectInput
        fullWidth={fullWidth}
        // defaultValue={selected}
        onChange={onChange}
      >
        <option disabled selected>
          ---select options---
        </option>
        {options &&
          options.map((option, idx) => (
            <>
              <option key={idx} disabled>
                {`-${option.label}-`}
              </option>
              {option.selections.map((item, i) => (
                <option
                  key={i}
                  value={item.value}
                  selected={selected === item.value}
                >
                  {item.label}
                </option>
              ))}
            </>
          ))}
      </SelectInput>
    </SelectWrapper>
  );
};

const SelectWrapper = styled.div`
  position: relative;

  &:after {
    content: "⌄";
    font-size: 1rem;
    top: 7px;
    right: 0.875rem;
    position: absolute;
  }
`;

const SelectInput = styled.select<SelectProps>`
  -webkit-appearance: none;
  appearance: none;
  font-size: 1rem;
  border-color: ${neutral[200]};
  border-radius: 0.25rem;
  padding: 0.875rem 0.75rem;
  width: ${(props) => props.fullWidth && "100%"};
`;

export default Select;
