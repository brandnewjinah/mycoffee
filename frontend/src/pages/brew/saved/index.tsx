import React from "react";
import { Link } from "react-router-dom";
import _, { divide } from "lodash";

//comp
import Header from "../../../components/Header";
import { Section } from "../../../components/container/Section";
import { Card } from "../../../components/Cards";

//redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";

//interface
import { Bean, Initial } from "../../../interfaces/interface";

export interface accTypes {
  [key: string]: Initial;
}

const Saved = () => {
  const beans = useSelector((state: RootState) => state.collection.beans);

  let alphabeticalGroups = beans.reduce((acc: accTypes, bean: Bean) => {
    let initial = bean.roaster[0];

    if (!acc[initial]) acc[initial] = { initial, beans: [bean] };
    else acc[initial].beans.push(bean);

    return acc;
  }, {});

  let result = Object.values(alphabeticalGroups);
  let sorted = _.orderBy(result, ["initial"], ["asc"]);
  console.log(sorted);
  return (
    <div>
      <Header title="Beans" />
      <Section>
        {sorted &&
          sorted.map((item, idx) => (
            <div>
              <header>{item.initial}</header>
              {item.beans.map((bean) => (
                <Card
                  key={bean.id}
                  link={`/note/${bean.id}`}
                  overline={bean.roaster}
                  name={bean.name}
                />
              ))}
            </div>
          ))}
      </Section>
    </div>
  );
};

export default Saved;
