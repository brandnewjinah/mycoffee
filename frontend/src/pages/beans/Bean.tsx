import React, { FC, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

//comp
import { Flex } from "../../components/container/Div";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";
import Chips from "../../components/Chips";
import ImageContainer from "../../components/ImageContainer";
import { Ul } from "../../components/Lists";
import { ListItem } from "../../components/ListItem";
import { Body } from "../../components/Text";
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
          {beanDetails.flavor &&
            beanDetails.flavor.length > 0 &&
            beanDetails.flavor.map((item) => (
              <Chips key={item.id} label={item.value} display />
            ))}
        </div>
      </Section>
      {beanDetails.description && (
        <Section>
          <Body variant="body_small">{beanDetails.description}</Body>
        </Section>
      )}
      <Ul width="100%">
        <ListItem title="Roast Level" value={beanDetails.level} />

        {beanDetails.region && beanDetails.region.length > 0 && (
          <ListItem title="Region" value={beanDetails.region?.join()} />
        )}
        {beanDetails.variety && beanDetails.variety.length > 0 && (
          <ListItem title="Variety" value={beanDetails.variety?.join()} />
        )}
        {beanDetails.process && (
          <ListItem title="Process" value={beanDetails.process} />
        )}
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
