import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

//comp
import Loading from "../../components/Loading";
import { Container } from "../../components/container/Div";
import { Header } from "../../components/Header";
import { List } from "../../components/List";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { getBeanDetails } from "../../redux/beanDetailsRedux";

//interface
import Empty from "../../components/EmptyPage";

const BeanPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { beanId } = useParams<{ beanId: string }>();

  //get this bean data
  useEffect(() => {
    dispatch(getBeanDetails(beanId));
  }, [dispatch, beanId]);

  const { isLoading, beanDetails } = useSelector(
    (state: RootState) => state.beanDetails
  );

  const handleNewNote = () => {
    history.push(`/notes/b/${beanId}/new`);
  };

  // const handleDeleteBean = () => {
  //   if (window.confirm("Delete this bean?")) {
  //     dispatch(deleteBean(beanId));
  //     //for future api, when success deleting, then move to next page
  //     history.push("/brew");
  //   }
  // };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {beanDetails.notes && beanDetails.notes.length > 0 ? (
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
            ))}
        </Container>
      ) : (
        <>
          <Header title={beanDetails.name} overlay="Notes for" />
          <Empty
            title="No notes yet"
            subtitle="Add a note to blah balh"
            btnLabel="Add Note"
          />
        </>
      )}
    </>
  );
};

export default BeanPage;
