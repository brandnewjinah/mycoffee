import React from "react";
import { Link, useHistory } from "react-router-dom";
import _, { divide } from "lodash";
import styled from "styled-components";

//comp
import Header from "../../components/Header";
import { Section } from "../../components/container/Section";
import { Card } from "../../components/Cards";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

//interface
import { Bean, Initial } from "../../interfaces/interface";
import { neutral, primaryColor, ratio } from "../../components/token";
import { Button } from "../../components/Buttons";

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
    <div>
      <Header title="Notes" />
      <button onClick={handleNew}>New Bean</button>
      <Section>
        {sorted &&
          sorted.map((item, idx) => (
            <div>
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
            </div>
          ))}
      </Section>
    </div>
  );
};

const InitialHeader = styled.header`
  text-transform: uppercase;
  font-weight: 700;
  color: ${neutral[300]};
`;

export default Saved;
