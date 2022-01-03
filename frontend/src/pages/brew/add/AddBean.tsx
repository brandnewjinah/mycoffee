import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

//comp
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Section } from "../../../components/container/Section";
import { Radio } from "../../../components/RadioButton";

export interface StateProps {
  id: number;
  name: string;
}

const AddBean = () => {
  const history = useHistory();
  const [roasters, setRoasters] = useState<StateProps[]>([]);
  const [data, setData] = useState<{ [key: string]: string }>({
    roaster: "",
    name: "",
    level: "light",
  });
  const [suggestions, setSuggestions] = useState<StateProps[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("/data/coffeeData.json");
      setRoasters(response.data.roasters);
    };

    loadData();
  }, []);

  const handleChange = (value: string) => {
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

  const onSuggest = (value: string) => {
    setData({ ...data, roaster: value });
    setSuggestions([]);
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...data };
    userInput[name] = value;
    setData(userInput);
  };

  const handleClick = () => {
    history.push("/brew/note");
  };

  const handleSelection = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, level: value });
  };

  return (
    <Container>
      <Header title="What are you brewing today?" />
      <Section>
        <Input
          name="roaster"
          label="Roaster"
          value={data.roaster}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 100);
          }}
        />
        {suggestions &&
          suggestions.map((suggestion, i) => (
            <Sug key={i} onClick={() => onSuggest(suggestion.name)}>
              {suggestion.name}
            </Sug>
          ))}
        <Input name="name" label="Name" onChange={onChange} />
        <article>
          <h4>Roast Level</h4>
          <div>
            <Radio
              label="Light"
              name="group"
              value="light"
              checked={data.level === "light"}
              onChange={handleSelection}
            />
            <Radio
              label="Medium"
              name="group"
              value="medium"
              checked={data.level === "medium"}
              onChange={handleSelection}
            />
            <Radio
              label="Dark"
              name="group"
              value="dark"
              checked={data.level === "dark"}
              onChange={handleSelection}
            />
          </div>
        </article>
      </Section>
      <button onClick={handleClick}>next</button>
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
