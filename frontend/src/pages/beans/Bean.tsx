import React, { FC, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import styled from "styled-components";

//comp
import { Flex } from "../../components/container/Div";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";
import { Coffee } from "../../assets/Icons";
import Chips from "../../components/Chips";
import { ListItem, Ul } from "../../components/Lists";
import Text from "../../components/Text";
import { Button, LinkButton } from "../../components/Buttons";
import { neutral, primaryColor, ratio } from "../../components/token";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { getBeanDetails } from "../../redux/beanDetailsRedux";
import { deleteBean, reset } from "../../redux/beanActionsRedux";

export interface Props {
  ratio?: string;
}

const BeanPage: FC<Props> = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { beanId } = useParams<{ beanId: string }>();

  // get this bean data
  useEffect(() => {
    dispatch(getBeanDetails(beanId));
  }, [dispatch, beanId]);

  const { beanDetails } = useSelector((state: RootState) => state.beanDetails);

  const handleDelete = () => {
    dispatch(deleteBean(beanId));
  };

  //actions after submitting button
  const { beanDeleted } = useSelector((state: RootState) => state.beanActions);

  useEffect(() => {
    if (beanDeleted.status === 200) {
      alert("Bean successfully deleted");
      history.push(`/beans`);
      dispatch(reset());
    } else if (beanDeleted.status !== 200 && beanDeleted.status !== 0) {
      alert("error");
    }
  });

  const extraDetails = {
    flavor: [
      { id: 1, flavor: "Nutty" },
      { id: 2, flavor: "Chocolatey" },
      { id: 3, flavor: "Roasted" },
    ],
    details: [
      { id: 1, key: "Country", value: "Ethiopia" },
      { id: 2, key: "Producer", value: "Smallholder Growers" },
      { id: 3, key: "Elevation Range", value: "1900-2100 m" },
      { id: 4, key: "Processing Method", value: "Washed" },
      { id: 5, key: "Drying Method", value: "Raised Bed" },
    ],
  };

  const handleNote = (action: string) => {
    action === "view"
      ? history.push(`../../notes/b/${beanId}`)
      : history.push(`../../notes/b/${beanId}/new`);
  };

  return (
    <Flex flexCol gap="1.5rem">
      <Header title={beanDetails.name} overlay={beanDetails.roaster} />
      <Section>
        {beanDetails.img && beanDetails.img ? (
          <Preview ratio={ratio.portrait_23}>
            <img src={beanDetails.img} alt="" />
          </Preview>
        ) : (
          <Preview ratio={ratio.landscape_169}>
            <Coffee width="24" height="24" color="#000" stroke="1" />
          </Preview>
        )}
      </Section>
      <Section>
        <div>
          {extraDetails &&
            extraDetails.flavor &&
            extraDetails.flavor.map((item) => (
              <Chips key={item.id} label={item.flavor} />
            ))}
        </div>
      </Section>
      <Ul width="100%">
        {extraDetails &&
          extraDetails.details &&
          extraDetails.details.map((item) => (
            <ListItem
              key={item.id}
              display="flex"
              justifyContent="space-between"
              padding=".65rem"
              line
            >
              <Text variant="caption" spacing=".1rem" uppercase bold>
                {item.key}
              </Text>
              <Text variant="body_demi" spacing=".05rem">
                {item.value}
              </Text>
            </ListItem>
          ))}
      </Ul>
      <Section>
        <Flex>
          <div className="flexOne">
            <Button
              label="View Notes"
              variant="secondary"
              fullWidth
              color={primaryColor.brickRed}
              handleClick={() => handleNote("view")}
            />
          </div>
          <div className="flexOne">
            <Button
              label="Add Note"
              variant="primary"
              fullWidth
              color={primaryColor.brickRed}
              handleClick={() => handleNote("add")}
            />
          </div>
        </Flex>
      </Section>
      <LinkButton
        label="Delete This Bean"
        variant="tertiary"
        color={primaryColor.blue}
        handleClick={handleDelete}
      />
    </Flex>
  );
};

const Preview = styled.div<Props>`
  position: relative;
  display: block;
  max-width: 100%;
  border: 1px solid ${neutral[100]};
  margin-bottom: 0.75rem;

  &:before {
    content: "";
    display: block;
    padding-bottom: 100%;
    width: 100%;
  }

  img {
    border: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    max-width: 100%;
  }

  svg {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
`;

export default BeanPage;
