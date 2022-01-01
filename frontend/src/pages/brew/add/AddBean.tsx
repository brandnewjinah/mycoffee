import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";

//comp
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Section } from "../../../components/container/Section";

export interface StateProps {
  id: number;
  name: string;
}

const AddBean = () => {
  const history = useHistory();
  const [roasters, setRoasters] = useState<StateProps[]>([]);
  const [suggestions, setSuggestions] = useState<StateProps[]>([]);
  const [text, setText] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("/data/coffeeData.json");

      setRoasters(response.data.roasters);
    };

    loadData();
  }, []);

  const handleChange = (text: string) => {
    let matches: { id: number; name: string }[] = [];
    if (text.length > 0) {
      matches = roasters.filter((roaster) => {
        const regex = new RegExp(`${text}`, "gi");
        return roaster.name.match(regex);
      });
    }
    setSuggestions(matches);
    setText(text);
  };

  const onSuggest = (text: string) => {
    setText(text);
    setSuggestions([]);
  };

  const handleClick = () => {
    history.push("/brew/note");
  };

  return (
    <Container>
      <Header title="What are you brewing today?" />
      <Section>
        <input
          value={text}
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
        {/* <Input label="Roaster" name="roaster" onChange={handleChange} />
        <Input label="Name" name="name" onChange={handleChange} /> */}
        <span>roast level: light, medium, dark</span>
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
