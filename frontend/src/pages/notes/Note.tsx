import React, { useState, FC } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ResponsiveRadar } from "@nivo/radar";
import moment from "moment";
import styled from "styled-components";

//comp
import { Header } from "../../components/Header";
import { Section } from "../../components/container/Section";
import { neutral, primaryColor } from "../../components/token";
import Text from "../../components/Text";
import { Container } from "../../components/container/Container";

//redux
import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";

//interface
import { Bean, Note } from "../../interfaces/interface";
import { Button, LinkButton } from "../../components/Buttons";

export interface Props {
  title: string;
  value: string;
}

const NotePage = () => {
  const history = useHistory();
  let { noteId } = useParams<{ beanId: string; noteId: string }>();
  const { beanDetails } = useSelector((state: RootState) => state.beans);

  //this note
  const thisNote: Note = beanDetails.notes.find(
    (note: { date: string }) => note.date === noteId
  )!;

  const features = [
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
  ];

  const getFreshness = () => {
    let recordDate = moment(parseInt(thisNote.date));
    let roastDate = moment(thisNote.roastDate);
    return `${recordDate.diff(roastDate, "days")} days`;
  };

  const handlePrev = () => {
    history.push(`/notes`);
  };

  const Items = ({ title, value }: Props) => {
    return (
      <ItemWrapper>
        <Text variant="caption" bold>
          {title}
        </Text>
        <Text variant="caption">{value}</Text>
      </ItemWrapper>
    );
  };

  const ItemWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${neutral[100]};
    padding: 0.875rem 0;
  `;

  return (
    <Container gap="1rem">
      <Header
        overlay={`Note for ${beanDetails.roaster}`}
        title={beanDetails.name}
      />
      <Section>
        <div style={{ height: `350px` }}>
          <ResponsiveRadar
            data={features}
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
            colors={{ scheme: "nivo" }}
            fillOpacity={0.35}
            blendMode="multiply"
            animate={true}
            motionConfig="stiff"
            isInteractive={true}
          />
        </div>
      </Section>
      <Section>
        <Items
          title="Recorded on"
          value={moment(parseInt(thisNote.date)).format("MM-DD-YYYY")}
        />
        <Items title="Freshness" value={getFreshness()} />
        <Items title="Dose" value={`${thisNote.dose} grams`} />
        <Items title="Grind Level" value={thisNote.grind} />
        <Items title="Time" value={`${thisNote.time} seconds`} />
        <Items title="Shot" value={`${thisNote.shot} grams`} />
      </Section>
      <LinkButton
        label="Back to Notes"
        variant="tertiary"
        color={primaryColor.blue}
        handleClick={handlePrev}
      />
    </Container>
  );
};

export default NotePage;
