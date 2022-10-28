import React, { FC, MouseEvent } from "react";

//comp
import { Button } from "./Buttons";
import { Section } from "./container/Section";
import { Header } from "./Header";

export interface Props {
  title: string;
  subtitle?: string;
  btnLabel?: string;
  handleButtonClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const Empty: FC<Props> = ({ title, subtitle, btnLabel, handleButtonClick }) => {
  return (
    <Section>
      <Header variant="small" title={title} subtitle={subtitle} />
      <Button
        label={btnLabel}
        variant="primary"
        fullWidth
        handleClick={handleButtonClick}
      />
    </Section>
  );
};

export default Empty;
