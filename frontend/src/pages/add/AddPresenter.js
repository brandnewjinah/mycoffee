import React, { useState } from "react";
import Select from "react-select";

//import components
import Input from "../../components/Input";
import { Button } from "../../components/Button";

//import data
import { groupedOptions } from "../../data/flavor";

//redux
import { connect } from "react-redux";
import { addCoffee } from "../../reducers/collectionReducer";

//import styles and assets
import styled from "styled-components";

const AddPresenter = (props) => {
  const [data, setData] = useState({
    //id automatically create an id
    //connect to the collection array in redux
    //find the length
    //id = length + 1
    roaster: "",
    name: "",
    origin: "",
    roast: "",
    flavor: [],
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

  const formatGroupLabel = (data) => <span>{data.label}</span>;

  const handleSelect = (value) => {
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

    let id = props.collection.length + 1;
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
          <Input
            label="Roast Level"
            name="roast"
            error={errors.roast}
            handleChange={handleChange}
          />
          <div>
            <p>Flavor</p>
            <Select
              isMulti
              defaultValue={[]}
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              onChange={handleSelect}
            />
          </div>

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
`;

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { addCoffee })(AddPresenter);
