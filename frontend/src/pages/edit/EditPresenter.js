import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useHistory } from "react-router-dom";

//import components
import { Input } from "../../components/Input";
import { BtnText, Button } from "../../components/Button";

//import data
import { groupedOptions } from "../../data/flavor";
import { roastLevel } from "../../data/data";

//redux
import { connect } from "react-redux";
import {
  addCoffee,
  editCoffee,
  deleteCoffee,
} from "../../reducers/collectionReducer";

//import styles and assets
import styled from "styled-components";

const EditPresenter = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    roaster: "",
    name: "",
    origin: "",
    roast: [],
    flavor: [],
    price: "",
    image: "",
    description: "",
    id: "",
    notes: [],
  });

  useEffect(() => {
    const currentItem = props.collection.find(
      (c) => c.id === parseInt(props.id)
    );
    setData(currentItem);
  }, []);

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

    // props.postData(data); //post to server

    props.editCoffee(data); //add to redux
    alert("Updated");
    history.push(`/products/${data.id}`);
  };

  const handleDelete = (e) => {
    props.deleteCoffee(data); //add to redux
    alert("Deleted");
    history.push(`/collection`);
  };

  return (
    <Wrapper>
      <Header>
        <h2>Edit coffee</h2>
      </Header>

      <Main>
        <form onSubmit={handleSubmit}>
          <Input
            label="Roaster"
            name="roaster"
            value={data.roaster}
            error={errors.roaster}
            handleChange={handleChange}
          />
          <Input
            label="Name"
            name="name"
            value={data.name}
            error={errors.name}
            handleChange={handleChange}
          />
          <Input
            label="Origin"
            name="origin"
            value={data.origin}
            error={errors.origin}
            handleChange={handleChange}
          />
          <div>
            <p>Roast Level</p>
            <Select
              isMulti
              placeholder="Select"
              defaultValue={[]}
              options={roastLevel.map((item) => ({
                label: item.name,
                value: item.name,
                id: item.id,
              }))}
              onChange={handleRoast}
            />
          </div>
          <div>
            <p>Flavor</p>
            <Select
              isMulti
              defaultValue={[]}
              options={groupedOptions}
              formatGroupLabel={formatGroupLabel}
              onChange={handleFlavor}
              name="flavor"
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

          <Button label="Edit" />
        </form>
        <BtnText label="Delete" handleClick={handleDelete} />
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

export default connect(mapStateToProps, {
  addCoffee,
  editCoffee,
  deleteCoffee,
})(EditPresenter);
