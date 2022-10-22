import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { ResponsiveRadar } from "@nivo/radar";
import moment from "moment";
import styled from "styled-components";

//comp
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";
import { Section } from "../../components/container/Section";
import { ListItem } from "../../components/ListItem";
import { LinkButton } from "../../components/Buttons";

//redux
import { RootState } from "../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getBeanDetails } from "../../redux/beanDetailsRedux";
import { deleteNote, reset } from "../../redux/noteActionsRedux";

//interface
import { Note } from "../../interfaces/noteInterface";

const NotePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  let { noteId, beanId } = useParams<{ beanId: string; noteId: string }>();

  // get this bean data
  useEffect(() => {
    dispatch(getBeanDetails(beanId));
  }, [dispatch, beanId]);

  const { beanDetails } = useSelector((state: RootState) => state.beanDetails);

  //this note
  const thisNote: Note = beanDetails.notes.find(
    (note: { date: string }) => note.date === noteId
  )!;

  const features = [
    {
      feature: "crema",
      value: thisNote && thisNote.features && thisNote.features[0].value,
    },
    {
      feature: "aroma",
      value: thisNote && thisNote.features && thisNote.features[1].value,
    },
    {
      feature: "body",
      value: thisNote && thisNote.features && thisNote.features[2].value,
    },
    {
      feature: "flavor",
      value: thisNote && thisNote.features && thisNote.features[3].value,
    },
  ];

  const getFreshness = () => {
    let recordDate = moment(parseInt(thisNote && thisNote.date));
    let roastDate = moment(thisNote && thisNote.roastDate);
    return `${recordDate.diff(roastDate, "days")} days`;
  };

  const handlePrev = () => {
    history.push(`/notes`);
  };

  const handleDelete = () => {
    dispatch(deleteNote({ beanId, noteId }));
  };

  //after delete
  const { noteDeleted } = useSelector((state: RootState) => state.noteActions);

  useEffect(() => {
    if (noteDeleted.status === 200) {
      alert("Note successfully deleted");
      history.push(`/notes/b/${beanId}`);
      dispatch(reset());
    }
  }, [dispatch, noteDeleted.status, beanId, history]);

  return (
    <Flex flexCol gap="1rem">
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
        <ListItem
          title="Recorded on"
          value={moment(parseInt(thisNote && thisNote.date)).format(
            "MM-DD-YYYY"
          )}
        />
        <ListItem title="Freshness" value={getFreshness()} />
        <ListItem title="Dose" value={`${thisNote && thisNote.dose} grams`} />
        <ListItem title="Grind Level" value={thisNote && thisNote.grind} />
        <ListItem title="Time" value={`${thisNote && thisNote.time} seconds`} />
        <ListItem title="Shot" value={`${thisNote && thisNote.shot} grams`} />
      </Section>
      <LinkButton
        label="Delete this note"
        variant="tertiary"
        handleClick={handleDelete}
      />
      <LinkButton
        label="Back to Notes"
        variant="tertiary"
        handleClick={handlePrev}
      />
    </Flex>
  );
};

export default NotePage;
