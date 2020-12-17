import React, { useState } from "react";
import Select from "react-select";

//import components
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";

//import data
import { groupedOptions } from "../../data/flavor";
import { roastLevel } from "../../data/data";

//redux
import { connect } from "react-redux";
import { addCoffee } from "../../reducers/collectionReducer";

//import styles and assets
import styled from "styled-components";
import { gray } from "../../components/Colors";

const AddPresenter = (props) => {
  const [data, setData] = useState({
    roaster: "",
    name: "",
    origin: "",
    roast: [],
    flavor: [],
    price: "",
    image: "",
    description: "",
    notes: [],
    comments: [],
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const formatGroupLabel = (data) => <span>{data.label}</span>;

  const handleRoast = (value) => {
    const coffee = { ...data, roast: value };
    setData(coffee);
  };

  const handleFlavor = (value) => {
    const coffee = { ...data, flavor: value };
    setData(coffee);
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

    let id = props.collection[props.collection.length - 1].id + 1;
    let newData = { ...data, id: id };
    // props.postData(data); //post to server
    props.addCoffee(newData); //add to redux
    window.location = "/collection";
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
          <Selector>
            <p>Roast Level</p>
            <Select
              isMulti
              placeholder="Select"
              defaultValue={[]}
              styles={customStyles}
              options={roastLevel.map((item) => ({
                label: item.name,
                value: item.name,
                id: item.id,
              }))}
              onChange={handleRoast}
            />
          </Selector>
          <Selector>
            <p>Flavor</p>
            <Select
              isMulti
              defaultValue={[]}
              styles={customStyles}
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              onChange={handleFlavor}
              name="flavor"
            />
          </Selector>

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
          <div style={{ margin: `2em 0` }}>
            <Button label="Add" />
          </div>
        </form>
      </Main>
    </Wrapper>
  );
};

const customStyles = {
  control: (styles) => ({
    ...styles,
    border: `1px solid #e4e4e4`,
  }),
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: gray.lightergray,
  }),
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
`;

const Selector = styled.div`
  margin: 1.125em 0;
  p {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    margin-bottom: 0.5em;
  }
`;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { addCoffee })(AddPresenter);
