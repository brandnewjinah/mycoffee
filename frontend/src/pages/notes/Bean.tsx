import React from "react";
import { useParams, useHistory } from "react-router-dom";
import moment from "moment";

//comp
import Header from "../../components/Header";
import { Button } from "../../components/Buttons";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteBean } from "../../redux/collectionRedux";

//interface
import { Bean } from "../../interfaces/interface";
import { List } from "../../components/List";

const BeanPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { beanId } = useParams<{ beanId: string }>();
  const beans = useSelector((state: RootState) => state.collection.beans);
  const thisBean: Bean = beans.find(
    (bean: { id: string }) => bean.id === beanId
  )!;

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
    <div>
      <Header title={thisBean.name} overlay="Notes for" />
      <button onClick={handleNext}>add new note</button>
      {thisBean.notes &&
        thisBean.notes.map((note, idx) => (
          <List
            key={idx}
            link={`/note/${beanId}/${note.id}`}
            date={moment(note.roastDate).format("MM-DD-YYYY")}
            crema={note.features[0].value}
            aroma={note.features[1].value}
            body={note.features[2].value}
            flavor={note.features[3].value}
          />
        ))}
      <Button
        label="Delete this bean"
        handleClick={handleDeleteBean}
        variant="tertiary"
      />
    </div>
  );
};

export default BeanPage;
