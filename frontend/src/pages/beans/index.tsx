import React, { useEffect } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import _ from "lodash";

//comp
import Loading from "../../components/Loading";
import Empty from "../../components/EmptyPage";
import { Flex } from "../../components/container/Div";
import { Section } from "../../components/container/Section";
import { Header } from "../../components/Header";
import { Card } from "../../components/Cards";
import { neutral } from "../../components/token";

//interface
import { Bean, Initial } from "../../interfaces/interface";

//redux
import { useDispatch, useSelector } from "react-redux";
import { getBeans } from "../../redux/beanRedux";
import { RootState } from "../../redux/store";

export interface accTypes {
  [key: string]: Initial;
}

const BeansList = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  //01. beans data API call
  useEffect(() => {
    dispatch(getBeans());
  }, [dispatch]);

  //02. get beans data from redux
  const { isLoading, beans } = useSelector((state: RootState) => state.beans);

  //03. sort beans list alphabetically
  let alphabeticalGroups =
    beans &&
    beans.length > 0 &&
    beans.reduce((acc: accTypes, bean: Bean) => {
      let initial = bean.roaster[0];

      if (!acc[initial]) acc[initial] = { initial, beans: [bean] };
      else acc[initial].beans.push(bean);

      return acc;
    }, {});

  let result = Object.values(alphabeticalGroups);
  let sorted = _.orderBy(result, [(res) => res.initial.toLowerCase()], ["asc"]);

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
      {sorted && sorted.length > 0 ? (
        <Flex flexCol gap="2.5rem">
          <Header
            title="Beans"
            subtitle="Bean not listed? Add bean first to start creating notes."
            button
            btnLabel="New Bean"
            handleClick={handleNew}
          />
          <Section>
            {sorted.map((item) => (
              <div key={item.initial}>
                <InitialHeader>{item.initial}</InitialHeader>
                {item.beans.map(
                  (bean: {
                    _id: any;
                    img: string | undefined;
                    roaster: string | undefined;
                    name: string | undefined;
                    level: string | undefined;
                  }) => (
                    <Card
                      key={bean._id}
                      linkToBean={`/beans/b/${bean._id}`}
                      imgsrc={bean.img}
                      overline={bean.roaster}
                      header={bean.name}
                      caption={bean.level}
                      // ratio={ratio.portrait_34}
                      margin="0 0 1rem 0"
                    />
                  )
                )}
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
