import React, { ChangeEvent, useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { ResponsiveRadar } from "@nivo/radar";

//comp
import { Section } from "../../../components/container/Section";
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import Slider from "../../../components/Slider";

//redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../redux/store";
import { addNote } from "../../../redux/collectionRedux";

//interface
import { Bean } from "../../../interfaces/interface";

const AddNote = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { beanId } = useParams<{ beanId: string }>();
  const beans = useSelector((state: RootState) => state.collection.beans);
  const thisBean: Bean = beans.find(
    (bean: { id: string }) => bean.id === beanId
  )!;
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ [key: string]: string }>({
    id: new Date().valueOf().toString(),
    roastDate: "",
    dose: "",
    size: "",
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...data };
    userInput[name] = value;
    setData(userInput);
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
      setPage(page + 1);
    } else {
      let newNote = { ...data, features };
      dispatch(addNote({ newNote, beanId }));
      history.push(`/note/${beanId}/${data.id}`);
    }
  };

  return (
    <div>
      <Header title={thisBean.name} subtitle="Add note" />
      {page === 1 && (
        <>
          <Section>
            <Input
              label="Roast Date"
              name="roastDate"
              type="date"
              onChange={handleChange}
            />
            <Input
              label="Dose"
              name="dose"
              suffix="grams"
              onChange={handleChange}
            />
            <Input
              label="Grind Size"
              name="size"
              type="number"
              onChange={handleChange}
            />
            <Input
              label="Brew Time"
              name="time"
              suffix="seconds"
              onChange={handleChange}
            />
            <Input
              label="Shot"
              name="shot"
              suffix="grams"
              onChange={handleChange}
            />
          </Section>
          <Link to="/brew">Go Back</Link>
          <button onClick={() => handleNext(1)}>next</button>
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
                  margin={`2rem 0`}
                  handleChange={handleSliderChange(idx)}
                />
              ))}
          </Section>
          <button onClick={() => handleNext(2)}>next</button>
        </>
      )}
    </div>
  );
};

export default AddNote;
