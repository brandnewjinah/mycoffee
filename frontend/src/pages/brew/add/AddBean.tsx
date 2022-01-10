import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { nanoid } from "nanoid";

//comp
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Section } from "../../../components/container/Section";
import { Radio } from "../../../components/RadioButton";

//util
import { beanValidate } from "../../../utils/validate";

//redux
import { useDispatch } from "react-redux";
import { addBean } from "../../../redux/collectionRedux";

//interface
import { Bean, BeanErrors } from "../../../interfaces/interface";

export interface StateProps {
  id: number;
  name: string;
}

const AddBean = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [roasters, setRoasters] = useState<StateProps[]>([]);
  const [suggestions, setSuggestions] = useState<StateProps[]>([]);
  const [data, setData] = useState<Bean>({
    id: nanoid(),
    roaster: "",
    name: "",
    level: "light",
    notes: [],
  });
  const [errors, setErrors] = useState<BeanErrors>({});

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

  const handleSuggestClick = (value: string) => {
    setData({ ...data, roaster: value });
    setSuggestions([]);
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const userInput = { ...data };
    userInput.name = value;
    setData(userInput);
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, level: value });
  };

  const handleNext = () => {
    const errors = beanValidate(data);

    setErrors(errors || {});
    if (errors) return;

    dispatch(addBean(data));
    history.push(`/brew/${data.id}/note`);
  };

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("/data/coffeeData.json");
      setRoasters(response.data.roasters);
    };

    loadData();
  }, []);

  return (
    <Container>
      <Header title="Add New Bean" />
      <Section>
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
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <Sug key={i} onClick={() => handleSuggestClick(suggestion.name)}>
              {suggestion.name}
            </Sug>
          ))}
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
      </Section>
      <button onClick={handleNext}>next</button>
    </Container>
  );
};

const Container = styled.div``;

const Sug = styled.div`
  cursor: pointer;
  border-right: 1px solid black;
  border-left: 1px solid black;
  border-bottom: 1px solid black;

  &:hover {
    background-color: gray;
  }
`;

export default AddBean;
