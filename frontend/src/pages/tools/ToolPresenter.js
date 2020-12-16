import React from "react";
import { useHistory } from "react-router-dom";

//import components
import { ToolCard } from "../../components/Card";
import { BtnText } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { deleteTool } from "../../reducers/toolReducer";

//import styles and assets
import styled from "styled-components";

const ToolPresenter = (props) => {
  const history = useHistory();

  const handleAdd = () => {
    history.push("/tools/add");
  };

  const handleDelete = (t) => {
    props.deleteTool(t);
  };

  return (
    <Wrapper>
      <Header>
        <h2>My Tools</h2>
        <h4>Coffee tools I own</h4>
        <BtnText label="Add" handleClick={handleAdd} />
      </Header>
      <Main>
        {/* { if essential, <div className="box span2"></div>} */}
        {props.tools &&
          props.tools
            .filter((item) => item.essential === true)
            .map((t, idx) => (
              <div className="box span2">
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
              <div className="box">
                <ToolCard
                  imageUrl={t.image}
                  title={t.name}
                  sub={t.brand}
                  reference={t.instructions}
                  handleDelete={() => handleDelete(t)}
                />
              </div>
            ))}
      </Main>
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

const Header = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }

  h4 {
    font-size: 1.5rem;
    line-height: 2.8rem;
    letter-spacing: 0.125rem;
    margin: 1.5em 0 0.75em;
    text-rendering: optimizeLegibility;
  }
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
    border: 1px solid #d3b88c;
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

const mapStateToProps = (state) => {
  return {
    tools: state.tools.tools,
  };
};

export default connect(mapStateToProps, { deleteTool })(ToolPresenter);
