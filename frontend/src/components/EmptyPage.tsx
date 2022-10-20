import React, { FC, MouseEvent } from "react";
import styled from "styled-components";

//comp
import { Button } from "./Buttons";
import { Header } from "./Header";
import { primaryColor } from "./token";
import { Plus } from "../assets/Icons";

export interface Props {
  title: string;
  subtitle?: string;
  btnLabel?: string;
  handleButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Empty: FC<Props> = ({ title, subtitle, btnLabel, handleButtonClick }) => {
  return (
    <Wrapper>
      <Header variant="small" title={title} subtitle={subtitle} />
      <Button
        label={btnLabel}
        variant="primary"
        addIcon
        handleClick={handleButtonClick}
      />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 300px;
`;

export default Empty;
