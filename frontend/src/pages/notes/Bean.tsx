import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

//comp
import Loading from "../../components/Loading";
import { Container } from "../../components/container/Container";
import Header from "../../components/Header";
import { List } from "../../components/List";
import { Button } from "../../components/Buttons";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { getBeanDetails } from "../../redux/beanRedux";
import { deleteBean } from "../../redux/collectionRedux";

//interface
import { Bean } from "../../interfaces/interface";

const BeanPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { beanId } = useParams<{ beanId: string }>();

  //get this bean data
  useEffect(() => {
    dispatch(getBeanDetails(beanId));
  }, [dispatch, beanId]);

  const { isLoading, beanDetails } = useSelector(
    (state: RootState) => state.beans
  );

  const handleNewNote = () => {
    history.push(`/notes/b/${beanId}/new`);
  };

  const handleDeleteBean = () => {
    if (window.confirm("Delete this bean?")) {
      dispatch(deleteBean(beanId));
      //for future api, when success deleting, then move to next page
      history.push("/brew");
    }
  };

  return isLoading ? (
    <Loading />
  ) : (
    <Container gap="1.5rem">
      <Header
        title={beanDetails.name}
        overlay="Notes for"
        button
        btnLabel="New Note"
        handleClick={handleNewNote}
      />
      {beanDetails.notes &&
        beanDetails.notes.map((note, idx) => (
          <>
            <List
              key={idx}
              link={`/note/b/${beanId}/${note.date}`}
              // date={moment(note.id).format("MM-DD-YYYY")}
              date={note.date}
              crema={note.features[0].value}
              aroma={note.features[1].value}
              body={note.features[2].value}
              flavor={note.features[3].value}
            />
          </>
        ))}
      <Button
        label="Delete this bean"
        variant="tertiary"
        handleClick={handleDeleteBean}
      />
    </Container>
  );
};

export default BeanPage;
