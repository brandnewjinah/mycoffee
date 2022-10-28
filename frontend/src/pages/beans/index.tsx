import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";

//comp
import Loading from "../../components/Loading";
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";
import { Section } from "../../components/container/Section";
import { Card } from "../../components/Cards";
import { neutral } from "../../components/token";
import Empty from "../../components/EmptyPage";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getBeans } from "../../redux/beanRedux";
import { RootState } from "../../redux/store";

// export interface accTypes {
//   [key: string]: Initial;
// }

const BeansList = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [currentPage, setCurrentPage] = useState(1);

  //01. beans data API call
  useEffect(() => {
    dispatch(getBeans({ category: "beansList", page: currentPage }));
  }, [dispatch, currentPage]);

  //02. get beans data from redux
  const { isLoading, list } = useSelector(
    (state: RootState) => state.beansList
  );

  const handleButtonClick = () => {
    history.push("/beans/newbean");
  };

  const handleNew = () => {
    history.push("/beans/newbean");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {list && list.length > 0 ? (
        <Flex flexCol gap="2.5rem">
          <Header
            title="Beans"
            subtitle="Bean not listed? Add bean first to start creating notes."
            button
            addIcon
            btnLabel="Add Bean"
            handleClick={handleNew}
          />
          <Section>
            {list.map((item) => (
              <div key={item.initial}>
                <InitialHeader>{item.initial}</InitialHeader>
                {item &&
                  item.beans &&
                  item.beans.map((bean) => (
                    <Card
                      key={bean._id}
                      linkToBean={`/beans/b/${bean._id}`}
                      imgsrc={bean.img}
                      overline={bean.roaster}
                      header={bean.name}
                      caption={bean.level}
                      margin="0 0 1rem 0"
                    />
                  ))}
              </div>
            ))}
          </Section>
        </Flex>
      ) : (
        <Empty
          title="No Beans Yet"
          subtitle="Add a new bean and start making your collection."
          btnLabel="Add Bean"
          handleButtonClick={handleButtonClick}
        />
      )}
    </>
  );
};

const InitialHeader = styled.header`
  text-transform: uppercase;
  font-weight: 700;
  color: ${neutral[300]};
`;

export default BeansList;
