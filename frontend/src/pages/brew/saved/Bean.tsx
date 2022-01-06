import React from "react";
import { Link, useParams } from "react-router-dom";

//comp
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

//interface
import { Bean } from "../../../interfaces/interface";
import { List } from "../../../components/List";

const BeanPage = () => {
  const { beanId } = useParams<{ beanId: string }>();
  const beans = useSelector((state: RootState) => state.collection.beans);
  const thisBean: Bean = beans.find(
    (bean: { id: string }) => bean.id === beanId
  )!;

  return (
    <div>
      <Header title={thisBean.name} />
      <Section>
        {thisBean.notes &&
          thisBean.notes.map((note, idx) => (
            <List
              key={idx}
              link={`/note/${beanId}/${note.id}`}
              date={note.roastDate}
              crema={note.features[0].value}
              aroma={note.features[1].value}
              body={note.features[2].value}
              flavor={note.features[3].value}
            />
          ))}
      </Section>
    </div>
  );
};

export default BeanPage;
