import React, { useState, useEffect } from "react";
import axios from "axios";

//import styles and assets
import styled from "styled-components";

const Suggested = () => {
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    await axios
      //   .get("https://restcountries.eu/rest/v2/all")
      .get("/data/data.json")
      .then((res) => {
        setData(res.data.title);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const newdata = data.map((c, idx) => c.label);
    if (selected.length > 0) {
      setFiltered(newdata.filter((data) => !selected.includes(data)));
    } else {
      setFiltered(newdata);
    }
  }, [selected, data]);

  const handleSelection = (n) => {
    setSelected([...selected, n]);
  };

  const removeSelection = (n) => {
    console.log("remove", n);
    const test = selected.filter((f) => f !== n);
    setSelected(test);
  };

  return (
    <div>
      <form>
        <input placeholder="Search Countries" />
      </form>
      <div>
        selected
        <List>
          {selected.map((title, idx) => (
            <Pill key={idx} onClick={() => removeSelection(title)}>
              {title}
            </Pill>
          ))}
        </List>
      </div>
      <div>
        <p>filtered</p>
        <List>
          {filtered.map((title, idx) => (
            <Pill key={idx} onClick={() => handleSelection(title)}>
              {title}
            </Pill>
          ))}
        </List>
      </div>
    </div>
  );
};

const List = styled.ul`
  /* list-style-type: none; */
  margin: 0;
  padding: 0;
`;

const Pill = styled.li`
  width: 100%;
  display: inline;
  background-color: yellow;
  border: 1px solid black;
  border-radius: 25px;
  padding: 0 1em;
  margin: 0 0.5em;
  cursor: pointer;
`;

export default Suggested;
