import React, { ChangeEvent, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { ResponsiveRadar } from "@nivo/radar";

//comp
import { Flex } from "../../../components/container/Div";
import { Section } from "../../../components/container/Section";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";
import Slider from "../../../components/Range";
import { Button } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";

//util
import { noteValidate } from "../../../utils/validate";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { getBeanDetails } from "../../../redux/beanDetailsRedux";
import { addNote, reset } from "../../../redux/noteActionsRedux";

//interface
import { NewNote, NoteErrors } from "../../../interfaces/noteInterface";

const AddNote = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { beanId } = useParams<{ beanId: string }>();

  //get this bean data
  useEffect(() => {
    dispatch(getBeanDetails(beanId));
  }, [dispatch, beanId]);

  const { beanDetails } = useSelector((state: RootState) => state.beanDetails);

  const [page, setPage] = useState(1);

  const [noteData, setNoteData] = useState<NewNote>({
    date: new Date().valueOf().toString(),
    roastDate: "",
    dose: "",
    grind: "",
    time: "",
    shot: "",
  });
  const [features, setFeatures] = useState([
    {
      feature: "crema",
      value: 5,
    },
    {
      feature: "aroma",
      value: 5,
    },
    {
      feature: "body",
      value: 5,
    },
    {
      feature: "flavor",
      value: 5,
    },
  ]);
  const [errors, setErrors] = useState<NoteErrors>({});

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...noteData };
    userInput[name as keyof NewNote] = value;
    setNoteData(userInput);
  };

  const handleSliderChange =
    (idx: number) => (e: ChangeEvent<HTMLInputElement>) => {
      let featureCopy = [...features];
      let thisFeature = featureCopy[idx];
      thisFeature.value = e.target.valueAsNumber;
      featureCopy[idx] = thisFeature;
      setFeatures(featureCopy);
    };

  const handleNext = (page: number) => {
    if (page === 1) {
      const errors = noteValidate(noteData);
      setErrors(errors || {});
      if (errors) return;
      setPage(page + 1);
    } else {
      let newNote = { ...noteData, features };

      dispatch(addNote({ newNote, beanId }));
      // history.push(`/note/b/${beanId}/${data.id}`);
    }
  };

  //actions after submitting data
  const { noteAdded } = useSelector((state: RootState) => state.noteActions);

  useEffect(() => {
    if (noteAdded.status === 200) {
      alert("Note successfully added!");
      history.push(
        `/note/b/${noteAdded.beanDetails._id}/${
          noteAdded.beanDetails.notes[noteAdded.beanDetails.notes.length - 1]
            .date
        }`
      );
      dispatch(reset());
    }
  }, [
    dispatch,
    noteAdded.status,
    history,
    noteAdded.beanDetails._id,
    noteAdded.beanDetails.notes,
  ]);

  return (
    <Flex flexCol>
      <Header overlay={beanDetails.roaster} title={beanDetails.name} />
      {page === 1 && (
        <>
          <Section gap="2rem" margin="2rem 0">
            <Input
              label="Roast Date"
              name="roastDate"
              type="date"
              error={errors.roastDate}
              onChange={handleChange}
            />
            <Input
              label="Dose"
              name="dose"
              suffix="grams"
              error={errors.dose}
              onChange={handleChange}
            />
            <Input
              label="Grind Size"
              name="grind"
              type="number"
              error={errors.grind}
              onChange={handleChange}
            />
            <Input
              label="Brew Time"
              name="time"
              suffix="seconds"
              error={errors.time}
              onChange={handleChange}
            />
            <Input
              label="Shot"
              name="shot"
              suffix="grams"
              error={errors.shot}
              onChange={handleChange}
            />
          </Section>
          {/* <Link to="/brew">Go Back</Link> */}
          <Button
            label="Next"
            variant="primary"
            fullWidth
            handleClick={() => handleNext(1)}
          />
        </>
      )}

      {page === 2 && (
        <>
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
          <Section gap="2rem" padding="0 0 3rem">
            {features &&
              features.map((item, idx) => (
                <Slider
                  key={idx}
                  initialSize={5}
                  minSize={1}
                  maxSize={10}
                  step={1}
                  name={item.feature}
                  value={item.value}
                  linearColor={primaryColor.brickRed}
                  rangeColor="#d7dcdf"
                  thumbColor={primaryColor.brickRed}
                  margin={`2rem 0`}
                  handleSliderValue={handleSliderChange(idx)}
                />
              ))}
          </Section>
          <Button
            label="Next"
            variant="primary"
            fullWidth
            handleClick={() => handleNext(2)}
          />
        </>
      )}
    </Flex>
  );
};

export default AddNote;
