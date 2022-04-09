import React from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

//comp
import { Container } from "../../components/container/Container";
import Header from "../../components/Header";
import { List } from "../../components/List";
import { Button } from "../../components/Buttons";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteBean } from "../../redux/collectionRedux";

//interface
import { Bean } from "../../interfaces/interface";

const BeanPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { beanId } = useParams<{ beanId: string }>();
  const beans = useSelector((state: RootState) => state.collection.beans);
  // const thisBean: Bean = beans.find(
  //   (bean: { id: string }) => bean.id === beanId
  // )!;

  const handleNext = () => {
    history.push(`/notes/${beanId}/new`);
  };

  const handleDeleteBean = () => {
    if (window.confirm("Delete this bean?")) {
      dispatch(deleteBean(beanId));
      //for future api, when success deleting, then move to next page
      history.push("/brew");
    }
  };

  return (
    <Container gap="1.5rem">
      <Header
        // title={thisBean.name}
        title="Test"
        overlay="Notes for"
        button
        btnLabel="New Note"
        handleClick={handleNext}
      />
      {/* {thisBean.notes &&
        thisBean.notes.map((note, idx) => (
          <List
            key={idx}
            link={`/note/${beanId}/${note.id}`}
            date={moment(note.id).format("MM-DD-YYYY")}
            crema={note.features[0].value}
            aroma={note.features[1].value}
            body={note.features[2].value}
            flavor={note.features[3].value}
          />
        ))} */}
      {/* <Button
        label="Delete this bean"
        variant="tertiary"
        handleClick={handleDeleteBean}
      /> */}
    </Container>
  );
};

export default BeanPage;
