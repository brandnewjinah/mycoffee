import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";

//import components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { addTool } from "../../reducers/toolReducer";

//import styles and assets
import styled from "styled-components";

const AddTools = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    brand: "",
    description: "",
    instructions: "",
    image: "",
    essential: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] =
      input.type === "checkbox" ? input.checked : input.value;
    setData(userInput);
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (data.image === "") {
      errors.image = "Image URL is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    let id =
      props.tools.length === 0 ? 1 : props.tools[props.tools.length - 1].id + 1;

    let newData = { ...data, id: id };
    // // props.postData(data); //post to server
    props.addTool(newData); //add to redux
    history.push("/tools");
  };

  return (
    <Wrapper>
      <Header>
        <h2>Add Tools</h2>
      </Header>

      <Main>
        <form onSubmit={handleSubmit}>
          <Input
            label="Name"
            name="name"
            error={errors.name}
            handleChange={handleChange}
          />
          <Input
            label="Brand"
            name="brand"
            error={errors.brand}
            handleChange={handleChange}
          />
          <Input
            label="Description"
            name="description"
            value={data.description}
            error={errors.description}
            handleChange={handleChange}
          />
          <Input
            label="Instructions URL"
            name="instructions"
            error={errors.instructions}
            handleChange={handleChange}
          />
          <Input
            label="Image URL"
            name="image"
            value={data.image}
            error={errors.image}
            handleChange={handleChange}
          />

          <span
            style={{
              textTransform: `uppercase`,
              fontWeight: 500,
              letterSpacing: `0.05rem`,
            }}
          >
            Essential?{" "}
          </span>
          <span style={{ color: `#a8a8a8` }}>
            (mark only your primary coffee maker and grinder as essential)
          </span>
          <span style={{ display: `inline-block`, marginLeft: `.5em` }}>
            <input
              type="checkbox"
              name="essential"
              style={{ verticalAlign: `middle` }}
              checked={data.essential}
              onChange={handleChange}
            />
          </span>
          <div style={{ margin: `2em 0` }}>
            <Button label="Add" />
          </div>
        </form>
      </Main>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 3em auto;
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  h2 {
    font-size: 2.8rem;
    font-weight: 500;
  }
`;

const Main = styled.div`
  margin: 2em auto;
  width: 100%;
  max-width: 960px;

  span {
    font-size: 0.875rem;
  }
`;

AddTools.propTypes = {
  addTool: PropTypes.func,
  tools: PropTypes.array,
  data: PropTypes.object,
};

const mapStateToProps = (state) => {
  return {
    tools: state.tools.tools,
  };
};

export default connect(mapStateToProps, { addTool })(AddTools);
