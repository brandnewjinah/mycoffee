import React from "react";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

//comp
import { Container } from "../../components/container/Container";
import Header from "../../components/Header";
import { Section } from "../../components/container/Section";
import { Card } from "../../components/Cards";
import { Button } from "../../components/Buttons";
import { Plus } from "../../assets/Icons";
import { Input } from "../../components/Input";
import Text from "../../components/Text";
import { neutral, primaryColor, ratio } from "../../components/token";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

//interface
import { Bean, Initial } from "../../interfaces/interface";

export interface accTypes {
  [key: string]: Initial;
}

const Saved = () => {
  const history = useHistory();
  const beans = useSelector((state: RootState) => state.collection.beans);

  let alphabeticalGroups = beans.reduce((acc: accTypes, bean: Bean) => {
    let initial = bean.roaster[0];

    if (!acc[initial]) acc[initial] = { initial, beans: [bean] };
    else acc[initial].beans.push(bean);

    return acc;
  }, {});

  let result = Object.values(alphabeticalGroups);
  // let sorted = _.orderBy(result, ["initial"], ["asc"]);
  let sorted = _.orderBy(result, [(res) => res.initial.toLowerCase()], ["asc"]);

  const handleNew = () => {
    history.push("/beans/newbean");
  };

  const handleSearch = () => {};

  return (
    <>
      {sorted && sorted.length > 0 ? (
        <Container>
          <Header
            title="Beans"
            button
            btnLabel="New Bean"
            handleClick={handleNew}
          />
          {/* <Section>
            <Input name="search" type="search" onChange={handleSearch} />
          </Section> */}
          <Section>
            {sorted.map((item) => (
              <>
                <InitialHeader>{item.initial}</InitialHeader>
                {item.beans.map((bean) => (
                  <Card
                    // linkToBean={`/beans/b/${bean.id}`}
                    overline={bean.roaster}
                    header={bean.name}
                    caption={bean.level}
                    ratio={ratio.landscape_169}
                    margin="0 0 1rem 0"
                  />
                ))}
              </>
            ))}
          </Section>
        </Container>
      ) : (
        <>
          <Empty>
            <Header
              variant="small"
              title="No beans yet"
              subtitle="Add a bean to start recording brew notes."
            />
            <Button
              label="Add Bean"
              variant="primary"
              color={primaryColor.blue}
              icon={<Plus width="20" height="20" color="#fff" stroke="2" />}
              handleClick={handleNew}
            />
          </Empty>
        </>
      )}
    </>
  );
};

const InitialHeader = styled.header`
  text-transform: uppercase;
  font-weight: 700;
  color: ${neutral[300]};
`;

const Empty = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  height: 300px;
`;

export default Saved;
