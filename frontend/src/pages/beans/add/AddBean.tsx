import React, { useState, useEffect, ChangeEvent, SyntheticEvent } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { nanoid } from "nanoid";

//comp
import { Container } from "../../../components/container/Container";
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Article, Section } from "../../../components/container/Section";
import { Radio } from "../../../components/RadioButton";
import { Button } from "../../../components/Buttons";
import { neutral, primaryColor } from "../../../components/token";

//util
import { beanValidate } from "../../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addBean } from "../../../redux/collectionRedux";
import { getRoasters } from "../../../redux/roastersRedux";
import { getBeans } from "../../../redux/beansRedux";

//interface
import { Bean, BeanErrors, Duplicate } from "../../../interfaces/interface";

export interface StateProps {
  id: number;
  name: string;
}

const AddBean = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [data, setData] = useState<Bean>({
    id: nanoid(),
    roaster: "",
    name: "",
    level: "light",
    img: "",
    notes: [],
  });

  const [suggestions, setSuggestions] = useState<StateProps[]>([]);

  const [duplicate, setDuplicate] = useState<Duplicate>({});

  const [errors, setErrors] = useState<BeanErrors>({});

  //get roasters list from data for suggestions
  useEffect(() => {
    dispatch(getRoasters());
  }, [dispatch]);

  const { roasters } = useSelector((state: RootState) => state.roasters);

  // //get beans list to check duplicate
  // useEffect(() => {
  //   dispatch(getBeans());
  // }, [dispatch]);

  const beans = useSelector((state: RootState) => state.beans.beans);

  //get roasters suggestions as user types
  const handleRoasterChange = (value: string) => {
    let matches: { id: number; name: string }[] = [];
    if (value.length > 0) {
      matches = roasters.filter((roaster) => {
        const regex = new RegExp(`${value}`, "gi");
        return roaster.name.match(regex);
      });
    }
    setSuggestions(matches);
    setData({ ...data, roaster: value });
  };

  //user clicks on a suggestion
  const handleSuggestClick = (value: string) => {
    setData({ ...data, roaster: value });
    setSuggestions([]);
  };

  //set bean name
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const userInput = { ...data };
    userInput.name = value;
    setData(userInput);
  };

  //select roast level
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, level: value });
  };

  //upload image from file
  const [previewSource, setPreviewSource] = useState("");

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: File | null) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);
    reader.onload = () => {
      setPreviewSource(reader.result!.toString());
    };
  };

  //submit data
  const handleNext = () => {
    const errors = beanValidate(data);

    setErrors(errors || {});
    if (errors) return;

    const hasDuplicate = beans.filter(
      (bean) =>
        bean.roaster === data.roaster &&
        bean.name === data.name &&
        bean.level === data.level
    );

    if (hasDuplicate.length > 0) {
      setDuplicate(hasDuplicate[0]);
    }

    if (!previewSource) return;
    const newBeanData = { ...data, img: previewSource };
    console.log(newBeanData);
    // dispatch(addBean(newBeanData));
    // history.push(`/beans/b/${data.id}/details`);
  };

  return (
    <Container gap="2.5rem">
      <Header title="Add New Bean" />
      <Section gap="1.625rem">
        <Input
          name="roaster"
          label="Roaster"
          value={data.roaster}
          error={errors.roaster}
          onChange={(e) => handleRoasterChange(e.target.value)}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 100);
          }}
        />
        {suggestions && suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((suggestion, i) => (
              <Suggestion
                key={i}
                onClick={() => handleSuggestClick(suggestion.name)}
              >
                {suggestion.name}
              </Suggestion>
            ))}
          </Suggestions>
        )}
        <Input
          name="name"
          label="Name"
          error={errors.name}
          onChange={handleInputChange}
        />
        <article>
          <h4>Roast Level</h4>
          <div>
            <Radio
              label="Light"
              name="group"
              value="light"
              checked={data.level === "light"}
              onChange={handleSelect}
            />
            <Radio
              label="Medium"
              name="group"
              value="medium"
              checked={data.level === "medium"}
              onChange={handleSelect}
            />
            <Radio
              label="Dark"
              name="group"
              value="dark"
              checked={data.level === "dark"}
              onChange={handleSelect}
            />
          </div>
        </article>
        <Article gap=".75rem">
          <h4>Bean Image (optional)</h4>
          <input
            type="file"
            name="img"
            // value={data.img}
            onChange={handleImageFile}
          />
          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ width: "100%" }} />
          )}
        </Article>
      </Section>
      <Button
        label="Next"
        variant="primary"
        color={primaryColor.blue}
        handleClick={handleNext}
      />
      {duplicate && Object.keys(duplicate).length !== 0 && (
        <>
          <p>{`${duplicate.name} from ${duplicate.roaster} already exists.`}</p>
          <Link to={`/note/${duplicate.id}`}>Go to Bean</Link>
        </>
      )}
    </Container>
  );
};

const Suggestions = styled.ul`
  background-color: yellow;
`;

const Suggestion = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1.35rem 0;
  border-bottom: 1px solid ${neutral[200]};

  &:hover {
    background-color: ${neutral[100]};
  }
`;

export default AddBean;
