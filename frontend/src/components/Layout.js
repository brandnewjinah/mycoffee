import React, { useEffect, useState } from "react";
import axios from "axios";

//import components

//import styles and assets
import styled from "styled-components";
import Header from "./Header";

const Layout = ({ children }) => {
  const [user, setUser] = useState();

  // useEffect(() => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     console.log(token);
  //     const user = jwtDecode(token);
  //     setUser(user);
  //   } catch (ex) {
  //     setUser(null);
  //   }
  // }, []);

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
        // console.log(res.data);
        setUser(res.data);
      });
    // .catch((err) => {
    //   alert(err);
    // });
  };

  return (
    <Wrapper>
      <Header user={user} />
      <Container>
        <div>{children}</div>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  background-color: #fffcf3;
  min-height: 100vh;
`;

const Container = styled.main`
  width: 100%;
  max-width: 1040px;
  padding: 2em;
  margin: 0 auto;
`;

export default Layout;
