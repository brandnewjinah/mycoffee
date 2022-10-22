import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

//comp
import Loading from "../../components/Loading";
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";
import { Section } from "../../components/container/Section";
import { Card } from "../../components/Cards";
import Empty from "../../components/EmptyPage";
import { neutral } from "../../components/token";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { getBeans } from "../../redux/beanRedux";

//interface
import { Initial } from "../../interfaces/beanInterface";

export interface accTypes {
  [key: string]: Initial;
}

const Saved = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  //get beans list
  useEffect(() => {
    dispatch(getBeans());
  }, [dispatch]);

  const { isLoading, beans } = useSelector((state: RootState) => state.beans);

  let alphabeticalGroups = beans.reduce((acc: accTypes, bean) => {
    let initial = bean.roaster[0];

    if (!acc[initial]) acc[initial] = { initial, beans: [bean] };
    else acc[initial].beans.push(bean);

    return acc;
  }, {});

  let result = Object.values(alphabeticalGroups);
  // let sorted = _.orderBy(result, ["initial"], ["asc"]);
  let sorted = _.orderBy(result, [(res) => res.initial.toLowerCase()], ["asc"]);

  const handleNewBean = () => {
    history.push("/notes/newbean");
  };

  return isLoading ? (
    <Loading />
  ) : (
    <>
      {sorted && sorted.length > 0 ? (
        <Flex flexCol gap="2.5rem">
          <Header
            title="Coffee Notes"
            subtitle="Bean not listed? Add bean first to start creating notes."
            button
            addIcon
            btnLabel="Add Bean"
            handleClick={() => history.push(`notes/newbean`)}
          />
          {/* <Section>
            <Input name="search" type="search" onChange={handleSearch} />
          </Section> */}
          <Section>
            {sorted.map((item, idx) => (
              <div key={idx}>
                <InitialHeader>{item.initial}</InitialHeader>
                {item.beans.map((bean) => (
                  <Card
                    key={bean._id}
                    linkToNote={`/notes/b/${bean._id}/new`}
                    linkToBean={`/notes/b/${bean._id}`}
                    imgsrc={bean.img}
                    overline={bean.roaster}
                    header={bean.name}
                    caption={bean.level}
                    // ratio={ratio.portrait_34}
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
          subtitle="Add a bean first to start recording your coffee notes."
          btnLabel="Add Bean"
          handleButtonClick={handleNewBean}
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

export default Saved;
