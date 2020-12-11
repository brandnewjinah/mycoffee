import React, { useState } from "react";

//import components
import Input from "../../components/Input";
import { Button } from "../../components/Button";

//import styles and assets
import styled from "styled-components";

const AddPresenter = (props) => {
  const [data, setData] = useState({
    roaster: "",
    name: "",
    origin: "",
    roast: "",
    taste: "",
    price: "",
    image: "",
    description: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const validate = () => {
    const errors = {};
    if (data.roaster === "") {
      errors.roaster = "Roaster is required";
    }
    if (data.name === "") {
      errors.name = "Name is required";
    }
    if (data.price === "") {
      errors.price = "Price is required";
    }

    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;
    props.postData(data);
  };

  return (
    <Wrapper>
      <Header>
        <h2>Add coffee</h2>
      </Header>
      <Main>
        <form onSubmit={handleSubmit}>
          <Input
            label="Roaster"
            name="roaster"
            error={errors.roaster}
            handleChange={handleChange}
          />
          <Input
            label="Name"
            name="name"
            error={errors.name}
            handleChange={handleChange}
          />
          <Input
            label="Origin"
            name="origin"
            error={errors.origin}
            handleChange={handleChange}
          />
          <Input
            label="Roast"
            name="roast"
            error={errors.roast}
            handleChange={handleChange}
          />
          <Input
            label="Taste"
            name="taste"
            error={errors.taste}
            handleChange={handleChange}
          />
          <Input
            label="Price"
            name="price"
            prefix="$"
            value={data.price}
            error={errors.price}
            handleChange={handleChange}
          />
          <Input
            label="Image URL"
            name="image"
            value={data.image}
            error={errors.image}
            handleChange={handleChange}
          />
          <Input
            label="Description"
            name="description"
            value={data.description}
            error={errors.description}
            handleChange={handleChange}
          />
          <Button label="Add" />
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

  h4 {
    font-size: 1.5rem;
    line-height: 2.8rem;
    letter-spacing: 0.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }

  span {
    position: relative;
    text-transform: lowercase;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 3px solid #e89161;
    }
  }
`;

export default AddPresenter;
