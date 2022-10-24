import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

//comp
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";
import Loading from "../../components/Loading";
import Empty from "../../components/EmptyPage";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getTools } from "../../redux/toolRedux";
import { RootState } from "../../redux/store";
import { Section } from "../../components/container/Section";
import { Card } from "../../components/Cards";
import { toolOptions } from "../../data/data";

const Tools = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //01. tools data API call
  useEffect(() => {
    dispatch(getTools());
  }, [dispatch]);

  //02. get tools data from redux
  const { isLoading, tools } = useSelector((state: RootState) => state.tools);

  const handleNew = () => {
    history.push("/tools/new");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <Flex flexCol gap="2.5rem">
        <Header
          title="Tools"
          subtitle="Access manuals and tutorials."
          button
          addIcon
          btnLabel="Add Tool"
          handleClick={handleNew}
        />
        <Section>
          {tools && tools.length > 0 ? (
            tools.map((tool) => (
              <Card
                key={tool._id}
                linkToBean={`/tool/${tool._id}`}
                imgsrc={tool.img}
                overline={tool.brand}
                header={tool.name}
              />
            ))
          ) : (
            <Empty
              title="No Tools Yet"
              subtitle="Add a new tool"
              btnLabel="Add Tool"
              handleButtonClick={handleNew}
            />
          )}
        </Section>
      </Flex>
    </>
  );
};

export default Tools;
