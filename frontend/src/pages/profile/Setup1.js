import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

import { colourOptions } from "../../data/data";

//import styles and assets
import styled from "styled-components";
import { Button } from "../../components/Button";

const Setup1 = () => {
  const [user, setUser] = useState({});
  const [profile, setProfile] = useState({
    interests: [],
  });

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const token = localStorage.getItem("token");
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get("http://localhost:5000/user/current", options)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const handleChange = (value) => {
    const result = value.map((o) => o.value);
    setProfile({ ...profile, interests: result });
  };

  const postData = async () => {
    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .post("http://localhost:5000/profile", profile, options)
      .then((res) => {
        if (res.status === 200) {
          alert("Interest saved");
        }
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <Wrapper>
      <Header>
        <h4>Welcome, {user.name}</h4>
        <p>Fill out your profile for a match</p>
        <Select
          defaultValue={[]}
          isMulti
          name="colors"
          options={colourOptions}
          onChange={handleChange}
        />
      </Header>
      <Button label="Next" handleClick={postData} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  padding: 0 4em;
  background-color: yellow;
`;

const Header = styled.div`
  text-align: center;
`;

export default Setup1;
