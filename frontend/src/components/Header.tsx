import React, { FC } from "react";
import styled from "styled-components";

//comp
import Text from "./Text";
import { Button } from "./Buttons";
import { neutral, primaryColor } from "./token";

export interface Props {
  title: string;
  variant?: "small";
  subtitle?: string;
  overlay?: string;
  button?: boolean;
  btnLabel?: string;
  handleClick?: () => void;
  children?: any;
}

const Header: FC<Props> = ({
  overlay,
  title,
  variant,
  subtitle,
  button,
  btnLabel,
  handleClick,
  children,
}) => {
  return (
    <Wrapper>
      <div>
        {overlay && (
          <Text variant="caption" color={primaryColor.orange}>
            {overlay}
          </Text>
        )}
        {variant && variant === "small" ? (
          <Text bold>{title}</Text>
        ) : (
          <Text variant="h1" padding=".35rem 0">
            {title}
          </Text>
        )}
        {subtitle && <Text color={neutral[400]}>{subtitle}</Text>}
        {children && children}
      </div>
      {button && (
        <Button
          label={btnLabel}
          variant="secondary"
          color={primaryColor.blue}
          bgColor={primaryColor.lightBlue}
          small
          handleClick={handleClick}
        />
      )}
    </Wrapper>
  );
};

const Wrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  /* background-color: honeydew; */
`;

export default Header;
