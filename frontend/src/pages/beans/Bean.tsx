import React, { FC, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

//comp
import { Flex } from "../../components/container/Div";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";
import Chips from "../../components/Chips";
import ImageContainer from "../../components/ImageContainer";
import { ListItem, Ul } from "../../components/Lists";
import Text from "../../components/Text";
import { Button, LinkButton } from "../../components/Buttons";

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
        <ImageContainer imgUrl={beanDetails.img} />
      </Section>
      <Section>
        <div>
          {extraDetails &&
            extraDetails.flavor &&
            extraDetails.flavor.map((item) => (
              <Chips key={item.id} label={item.flavor} display />
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
              handleClick={() => handleNote("view")}
            />
          </div>
          <div className="flexOne">
            <Button
              label="Add Note"
              variant="primary"
              fullWidth
              handleClick={() => handleNote("add")}
            />
          </div>
        </Flex>
      </Section>
      <LinkButton
        label="Edit This Bean"
        variant="tertiary"
        handleClick={() => history.push(`/beans/b/${beanId}/details`)}
      />
      <LinkButton
        label="Delete This Bean"
        variant="tertiary"
        handleClick={handleDelete}
      />
    </Flex>
  );
};

export default BeanPage;
