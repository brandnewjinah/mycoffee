import React from "react";
import { Link, useHistory } from "react-router-dom";
import _ from "lodash";
import styled from "styled-components";

//comp
import Header from "../../components/Header";
import { Section } from "../../components/container/Section";
import { Card } from "../../components/Cards";
import { Button } from "../../components/Buttons";
import { Plus } from "../../assets/Icons";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

//interface
import { Bean, Initial } from "../../interfaces/interface";
import { neutral, primaryColor, ratio } from "../../components/token";
import Text from "../../components/Text";

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
    history.push("/beans/new");
  };

  return (
    <>
      {sorted && sorted.length > 0 ? (
        <>
          <Header title="Notes">
            <div className="flex">
              {/* <Text>Bean not listed?</Text> */}
              <Button
                label="Add New Bean"
                variant="tertiary"
                color="#3883E5"
                // icon={<Plus width="20" height="20" color="#3883E5" stroke="2" />}
                handleClick={handleNew}
              />
            </div>
          </Header>
          <Section>
            {sorted.map((item) => (
              <>
                <InitialHeader>{item.initial}</InitialHeader>
                {item.beans.map((bean) => (
                  <Card
                    key={bean.id}
                    linkToNote={`/notes/${bean.id}/new`}
                    linkToBean={`/notes/${bean.id}`}
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
        </>
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
              color="#3883E5"
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
