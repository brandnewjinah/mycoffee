import React, { useState } from "react";

//import components
import { BtnText } from "./Button";
import { Input } from "./Input";

//import styles and assets
import styled from "styled-components";
import { yellow, gray } from "../components/Colors";

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
                <td
                  onClick={() => handleDelete(t)}
                  style={{
                    color: `#a8a8a8`,
                    cursor: `pointer`,
                  }}
                >
                  x
                </td>
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
              <Input
                name="freshness"
                value={note.freshness}
                handleChange={handleChange}
              />
            </td>
            <td>
              <Input
                name="temp"
                value={note.temp}
                handleChange={handleChange}
              />
            </td>
            <td>
              <Input
                name="grind"
                value={note.grind}
                handleChange={handleChange}
              />
            </td>
            <td>
              <Input
                name="gram"
                value={note.gram}
                handleChange={handleChange}
              />
            </td>
            <td>
              <Input
                name="time"
                value={note.time}
                handleChange={handleChange}
              />
            </td>
            <td>
              <Input name="ml" value={note.ml} handleChange={handleChange} />
            </td>
            <td>
              <Input
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
    padding: 0.75em 0;
    border-bottom: 1px solid ${gray.lightgray};
  }

  td {
    font-size: 0.875rem;
    color: #3e3a41;
    padding: 1em 0.25em;

    &:last-child {
      text-align: center;
    }
  }

  input {
    width: 100%;
    border: 1px solid #e4e4e4;
    border-radius: 0.25em;
    outline: transparent;
    /* padding: 0.1em; */
  }

  @media (max-width: 980px) {
    table,
    thead,
    tbody,
    th,
    td,
    tr {
      display: block;
    }

    thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
    }

    tr {
      margin: 0 0 1rem 0;
    }

    tr:nth-child(even) {
      background: ${yellow.dark};
    }

    td {
      /* Behave  like a "row" */
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 40%;

      &:last-child {
        text-align: left;
      }

      &:before {
        position: absolute;
        top: 25%;
        left: 6px;
        width: 30%;
        padding-right: 10px;
        white-space: nowrap;
      }
    }

    td:nth-of-type(1):before {
      content: "Roasted On";
    }
    td:nth-of-type(2):before {
      content: "Freshness";
    }
    td:nth-of-type(3):before {
      content: "Temp";
    }
    td:nth-of-type(4):before {
      content: "Grind";
    }
    td:nth-of-type(5):before {
      content: "g";
    }
    td:nth-of-type(6):before {
      content: "Time";
    }
    td:nth-of-type(7):before {
      content: "ml";
    }
    td:nth-of-type(8):before {
      content: "Taste";
    }
    td:nth-of-type(9):before {
      content: "Action";
    }
  }
`;

export default Table;
