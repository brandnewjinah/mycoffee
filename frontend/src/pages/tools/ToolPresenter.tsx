import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

//import components
import Header from "../../components/Header";
import { ToolCard } from "../../components/Card";
import { BtnText } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { deleteTool } from "../../reducers/toolReducer";

//import styles and assets
import styled from "styled-components";

const ToolPresenter = () => {
  const history = useHistory();

  const handleAdd = () => {
    history.push("/tools/add");
  };

  // const handleDelete = (t) => {
  //   props.deleteTool(t);
  // };

  return (
    <Wrapper>
      <Header title="My Tools" />
      {/* <Main>
        {props.tools &&
          props.tools
            .filter((item) => item.essential === true)
            .map((t, idx) => (
              <div className="box span2" key={idx}>
                <ToolCard
                  imageUrl={t.image}
                  title={t.name}
                  sub={t.brand}
                  reference={t.instructions}
                  handleDelete={() => handleDelete(t)}
                />
              </div>
            ))}
        {props.tools &&
          props.tools
            .filter((item) => item.essential !== true)
            .map((t, idx) => (
              <div className="box" key={idx}>
                <ToolCard
                  imageUrl={t.image}
                  title={t.name}
                  sub={t.brand}
                  reference={t.instructions}
                  handleDelete={() => handleDelete(t)}
                />
              </div>
            ))}
      </Main> */}
    </Wrapper>
  );
};

const Flex = styled.div`
  display: flex;
  justify-content: flex;
  align-self: center;
`;

const Wrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 3em auto;
`;

const Main = styled(Flex)`
  position: relative;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: minmax(100px, auto);
  margin: 40px;
  grid-auto-flow: dense;
  grid-gap: 10px;

  .box {
    color: #929796;
    padding: 20px;
    display: grid;
    font-size: 20px;
    border: 1px solid #f7f1dc;
    place-items: center;
    text-align: center;

    img {
      position: relative;
      width: 100%;
      max-height: 300px;
      margin-bottom: 10px;
    }
  }

  .span2 {
    grid-column: span 2;
    grid-row: span 2;
  }

  @media (max-width: 991px) {
    grid-template-columns: repeat(auto-fill, minmax(50%, 1fr));
    grid-template-rows: minmax(auto, auto);

    .box {
      grid-column: unset !important;
      grid-row: unset !important;
    }
  }
`;

// const mapStateToProps = (state) => {
//   return {
//     tools: state.tools.tools,
//   };
// };

export default ToolPresenter;
