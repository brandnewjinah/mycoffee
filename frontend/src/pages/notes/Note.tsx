import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { ResponsiveRadar } from "@nivo/radar";
import moment from "moment";
import styled from "styled-components";

//comp
import Header from "../../components/Header";
import { Section } from "../../components/container/Section";
import { neutral } from "../../components/token";

//redux
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

//interface
import { Bean, Note } from "../../interfaces/interface";
import Text from "../../components/Text";

const NotePage = () => {
  let { beanId, noteId } = useParams<{ beanId: string; noteId: string }>();
  const beans = useSelector((state: RootState) => state.collection.beans);
  const thisBean: Bean = beans.find(
    (bean: { id: string }) => bean.id === beanId
  )!;
  const thisNote: Note = thisBean.notes.find((note) => note.id === noteId)!;

  const [data, setData] = useState([
    {
      feature: "crema",
      value: thisNote.features[0].value,
    },
    {
      feature: "aroma",
      value: thisNote.features[1].value,
    },
    {
      feature: "body",
      value: thisNote.features[2].value,
    },
    {
      feature: "flavor",
      value: thisNote.features[3].value,
    },
  ]);

  const getFreshness = () => {
    let recordDate = moment(thisNote.today);
    let roastDate = moment(thisNote.roastDate);
    return `${recordDate.diff(roastDate, "days")} days`;
  };

  return (
    <div>
      <Header title={`Note for ${thisBean.name}`} />
      <Section>
        <div style={{ height: `350px` }}>
          <ResponsiveRadar
            data={data}
            keys={["value"]}
            indexBy="feature"
            maxValue={10}
            margin={{ top: 30, right: 60, bottom: 30, left: 60 }}
            curve="cardinalClosed"
            borderWidth={2}
            borderColor={{ from: "color" }}
            gridLevels={5}
            gridShape="circular"
            gridLabelOffset={24}
            enableDots={false}
            colors={{ scheme: "accent" }}
            fillOpacity={0.35}
            blendMode="multiply"
            animate={true}
            motionConfig="stiff"
            isInteractive={true}
          />
        </div>
      </Section>
      <Section>
        <Item>
          <Text variant="caption" bold>
            Recorded on
          </Text>
          <Text variant="caption">
            {moment(thisNote.today).format("MM-DD-YYYY")}
          </Text>
        </Item>
        <Item>
          <Text variant="caption" bold>
            Freshness
          </Text>
          <Text variant="caption">{getFreshness()}</Text>
        </Item>
        <Item>
          <Text variant="caption" bold>
            Dose
          </Text>
          <Text variant="caption">{`${thisNote.dose} grams`}</Text>
        </Item>
        <Item>
          <Text variant="caption" bold>
            Grind Level
          </Text>
          <Text variant="caption">{thisNote.grind}</Text>
        </Item>
        <Item>
          <Text variant="caption" bold>
            Time
          </Text>
          <Text variant="caption">{`${thisNote.time} seconds`}</Text>
        </Item>
        <Item>
          <Text variant="caption" bold>
            Shot
          </Text>
          <Text variant="caption">{`${thisNote.shot} grams`}</Text>
        </Item>
      </Section>
    </div>
  );
};

const Item = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${neutral[100]};
  padding: 0.875rem 0;
`;

export default NotePage;
