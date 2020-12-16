import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Select from "react-select";

//import components
import { Input } from "../../components/Input";
import { BtnClose, BtnText, Button } from "../../components/Button";

//import data
import { liquidOptions } from "../../data/data";

//redux
import { connect } from "react-redux";
import { addRecipe } from "../../reducers/recipeReducer";

//import styles and assets
import styled from "styled-components";
import { gray } from "../../components/Colors";

const AddTools = (props) => {
  const history = useHistory();
  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    ingredients: [{ id: 1, ingredient: "", amount: "" }],
    directions: [{ id: 1, text: "" }],
    ratio: [{ index: 1, id: "", name: "", value: "" }],
  });

  const [errors, setErrors] = useState({});

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...data };
    userInput[input.name] = input.value;
    setData(userInput);
  };

  const handleIngChange = ({ currentTarget: input }) => {
    let index = data.ingredients.findIndex((i) => i.id === parseInt(input.id));
    let newData = { ...data };
    let newIng = [...newData.ingredients];
    let currentItem = { ...newIng[index] };
    currentItem[input.name] = input.value;
    newIng[index] = currentItem;
    newData = { ...newData, ingredients: newIng };

    setData(newData);
  };

  const handleDirChange = ({ currentTarget: input }) => {
    let index = data.directions.findIndex((i) => i.id === parseInt(input.id));
    let newData = { ...data };
    let newDir = [...newData.directions];
    let currentItem = { ...newDir[index] };
    currentItem[input.name] = input.value;
    newDir[index] = currentItem;
    newData = { ...newData, directions: newDir };

    setData(newData);
  };

  const handleIngAdd = () => {
    let newIng = [...data.ingredients];
    let id = newIng[newIng.length - 1].id + 1;

    newIng = [...newIng, { id: id, ingredient: "", amount: "" }];

    setData({ ...data, ingredients: newIng });
  };

  const handleDirAdd = () => {
    let newDir = [...data.directions];
    let id = newDir[newDir.length - 1].id + 1;

    newDir = [...newDir, { id: id, text: "" }];

    setData({ ...data, directions: newDir });
  };

  const handleIngDelete = (id) => {
    let newIng = [...data.ingredients];
    newIng = newIng.filter((i) => i.id !== id);

    setData({ ...data, ingredients: newIng });
  };

  const handleDirDelete = (id) => {
    let newDir = [...data.directions];
    newDir = newDir.filter((i) => i.id !== id);

    setData({ ...data, directions: newDir });
  };

  const handleLiquidChange = (a, b) => {
    let index = data.ratio.findIndex((i) => i.index === parseInt(b.index));

    let newData = { ...data };
    let newRatio = [...newData.ratio];
    let currentItem = { ...newRatio[index], name: a.value, id: a.id };
    newRatio[index] = currentItem;
    setData({ ...data, ratio: newRatio });
  };

  const handleRatioChange = ({ currentTarget: input }) => {
    let index = data.ratio.findIndex((i) => i.index === parseInt(input.id));
    let newData = { ...data };
    let newRatio = [...newData.ratio];
    let currentItem = { ...newRatio[index] };
    currentItem[input.name] = input.value;
    newRatio[index] = currentItem;
    newData = { ...newData, ratio: newRatio };

    setData(newData);
  };

  const handleRatioAdd = () => {
    let newRatio = [...data.ratio];
    let index = newRatio[newRatio.length - 1].index + 1;

    newRatio = [...newRatio, { index: index, id: "", name: "", value: "" }];
    setData({ ...data, ratio: newRatio });
  };

  const handleRatioDelete = (index) => {
    let newRatio = [...data.ratio];
    newRatio = newRatio.filter((i) => i.index !== index);

    setData({ ...data, ratio: newRatio });
  };

  const validate = () => {
    const errors = {};
    if (data.name === "") {
      errors.name = "Name is required";
    }
    return Object.keys(errors).length === 0 ? null : errors;
  };

  const handleSubmit = (e) => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    let id =
      props.recipes.length === 0
        ? 1
        : props.recipes[props.recipes.length - 1].id + 1;

    let newData = { ...data, id: id };
    // // props.postData(data); //post to server
    props.addRecipe(newData); //add to redux
    history.push("/receipes");
  };

  return (
    <Wrapper>
      <Header>
        <h2>Add Drink Recipe</h2>
      </Header>

      <Main>
        <Input
          label="Name"
          name="name"
          error={errors.name}
          handleChange={handleChange}
        />
        <Input
          label="Short Description"
          name="description"
          value={data.description}
          handleChange={handleChange}
        />
        <Input
          label="Image URL"
          name="image"
          value={data.image}
          handleChange={handleChange}
        />

        <Block>
          <p>ADD INGREDIENTS</p>
          {data.ingredients.map((i, idx) => (
            <div className="item">
              <div style={{ width: `70%` }}>
                <Input
                  id={i.id}
                  placeholder="Ingredient Name"
                  name="ingredient"
                  error={errors.volume}
                  handleChange={handleIngChange}
                />
              </div>
              <div style={{ width: `26%` }}>
                <Input
                  id={i.id}
                  placeholder="Amount with unit"
                  name="amount"
                  error={errors.volume}
                  handleChange={handleIngChange}
                />
              </div>
              {idx === 0 ? (
                <div style={{ width: `2%` }}></div>
              ) : (
                <div style={{ width: `2%` }}>
                  <BtnClose handleClick={() => handleIngDelete(i.id)} />
                </div>
              )}
            </div>
          ))}
          <div className="add">
            <BtnText label="More" handleClick={handleIngAdd} />
          </div>
        </Block>
        <Block>
          <p>Add Directions</p>
          {data.directions.map((d, idx) => (
            <div className="item">
              <div style={{ width: `2%` }}>{`${idx + 1}.`}</div>
              <div style={{ width: `94%` }}>
                <Input
                  id={d.id}
                  name="text"
                  error={errors.brand}
                  handleChange={handleDirChange}
                />
              </div>
              {idx === 0 ? (
                <div style={{ width: `2%` }}></div>
              ) : (
                <div style={{ width: `2%` }}>
                  <BtnClose handleClick={() => handleDirDelete(d.id)} />
                </div>
              )}
            </div>
          ))}
          <div className="add">
            <BtnText label="More" handleClick={handleDirAdd} />
          </div>
        </Block>
        <Block>
          <p>Add Ratio</p>
          {data.ratio.map((i, idx) => (
            <div className="item">
              <div style={{ width: `70%` }}>
                <Select
                  placeholder="Select"
                  options={liquidOptions.map((item) => ({
                    label: item.name,
                    value: item.name,
                    id: item.id,
                  }))}
                  onChange={(event) => handleLiquidChange(event, i)}
                />
              </div>
              <div style={{ width: `26%` }}>
                <Input
                  id={i.index}
                  placeholder="value"
                  name="value"
                  error={errors.volume}
                  handleChange={handleRatioChange}
                />
              </div>
              {idx === 0 ? (
                <div style={{ width: `2%` }}></div>
              ) : (
                <div style={{ width: `2%` }}>
                  <BtnClose handleClick={() => handleRatioDelete(i.index)} />
                </div>
              )}
            </div>
          ))}
          <div className="add">
            <BtnText label="More" handleClick={handleRatioAdd} />
          </div>
        </Block>
        <div style={{ margin: `2em` }}>
          <Button label="Add" handleClick={handleSubmit} />
        </div>
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
  width: 100%;
  margin: 2em auto;

  span {
    font-size: 0.875rem;
  }
`;

const Block = styled.div`
  border-top: 1px solid ${gray.lightgray};
  /* background-color: #fff;
  border-radius: 0.5em;
  box-shadow: 0 0 3px 1px rgba(229, 227, 225, 0.3); */
  padding: 2em 0;
  margin: 3em 0;

  .item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    font-size: 0.875rem;
    font-weight: 500;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
  }

  .add {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
`;

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, { addRecipe })(AddTools);
