import React, { useState } from "react";

//import components
import { BtnText } from "./Button";
import { SmallInput } from "./Input";

//import styles and assets
import styled from "styled-components";

const Table = (props) => {
  const [note, setNote] = useState({
    date: "",
    freshness: "",
    temp: "",
    grind: "",
    gram: "",
    time: "",
    ml: "",
    taste: "",
  });

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...note };
    userInput[input.name] = input.value;
    setNote(userInput);
  };

  const handleClick = () => {
    props.postNote(note);
  };

  const handleDelete = (t) => {
    props.deleteNote(t);
  };

  return (
    <Wrapper>
      <table>
        <thead>
          <tr>
            <th>Roasted On</th>
            <th>Freshness</th>
            <th>Temp</th>
            <th>Grind</th>
            <th>g</th>
            <th>Time</th>
            <th>ml</th>
            <th>Taste</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {props.data &&
            props.data.map((t, idx) => (
              <tr key={idx}>
                <td>{t.date}</td>
                <td>{t.freshness}</td>
                <td>{t.temp}</td>
                <td>{t.grind}</td>
                <td>{t.gram}</td>
                <td>{t.time}</td>
                <td>{t.ml}</td>
                <td>{t.taste}</td>
                <td onClick={() => handleDelete(t)}>x</td>
              </tr>
            ))}
          <tr>
            <td>
              <input
                name="date"
                value={note.date}
                type="date"
                onChange={handleChange}
              />
            </td>
            <td>
              <SmallInput
                name="freshness"
                value={note.freshness}
                handleChange={handleChange}
              />
            </td>
            <td>
              <SmallInput
                name="temp"
                value={note.temp}
                handleChange={handleChange}
              />
            </td>
            <td>
              <SmallInput
                name="grind"
                value={note.grind}
                handleChange={handleChange}
              />
            </td>
            <td>
              <SmallInput
                name="gram"
                value={note.gram}
                handleChange={handleChange}
              />
            </td>
            <td>
              <SmallInput
                name="time"
                value={note.time}
                handleChange={handleChange}
              />
            </td>
            <td>
              <SmallInput
                name="ml"
                value={note.ml}
                handleChange={handleChange}
              />
            </td>
            <td>
              <SmallInput
                name="taste"
                value={note.taste}
                handleChange={handleChange}
              />
            </td>
            <td>
              <BtnText label="post" handleClick={handleClick} />
            </td>
          </tr>
        </tbody>
      </table>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  table {
    width: 100%;
    border-collapse: collapse;
  }

  th {
    text-align: left;
    font-size: 0.875rem;
    font-weight: 500;
    color: #808080;
  }

  td,
  th {
    border-top: 1px solid #dedede;
    padding: 0.5em 0;
  }

  td {
    font-size: 0.875rem;
    color: #3e3a41;
    padding: 0.25em;
  }

  input {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 0.25em;
    outline: transparent;
    padding: 0.16em;
  }
`;

export default Table;
