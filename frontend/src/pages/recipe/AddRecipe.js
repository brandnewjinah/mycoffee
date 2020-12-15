import React, { useState } from "react";
import { useHistory } from "react-router-dom";

//import components
import { Input } from "../../components/Input";
import { BtnClose, BtnText, Button } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { addTool } from "../../reducers/toolReducer";

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
    ratio: [{ id: 1, name: "", value: "" }],
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

  const handleRatioChange = ({ currentTarget: input }) => {
    let index = data.ratio.findIndex((i) => i.id === parseInt(input.id));
    let newData = { ...data };
    let newRatio = [...newData.ratio];
    let currentItem = { ...newRatio[index] };
    currentItem[input.name] = input.value;
    newRatio[index] = currentItem;
    newData = { ...newData, ratio: newRatio };

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

  const handleRatioAdd = () => {
    let newRatio = [...data.ratio];
    let id = newRatio[newRatio.length - 1].id + 1;

    newRatio = [...newRatio, { id: id, name: "", value: "" }];

    setData({ ...data, ratio: newRatio });
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

  const handleRatioDelete = (id) => {
    let newRatio = [...data.ratio];
    newRatio = newRatio.filter((i) => i.id !== id);

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
      props.tools.length === 0 ? 1 : props.tools[props.tools.length - 1].id + 1;

    let newData = { ...data, id: id };
    // // props.postData(data); //post to server
    props.addTool(newData); //add to redux
    history.push("/tools");
  };

  console.log(data);

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
                  placeholder="Amout with unit"
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
          <p>RATIO</p>
          {data.ratio.map((i, idx) => (
            <div className="item">
              <div style={{ width: `70%` }}>
                <Input
                  id={i.id}
                  placeholder="Liquid"
                  name="name"
                  handleChange={handleRatioChange}
                />
              </div>
              <div style={{ width: `26%` }}>
                <Input
                  id={i.id}
                  placeholder="Ratio"
                  name="value"
                  handleChange={handleRatioChange}
                />
              </div>
              {idx === 0 ? (
                <div style={{ width: `2%` }}></div>
              ) : (
                <div style={{ width: `2%` }}>
                  <BtnClose handleClick={() => handleRatioDelete(i.id)} />
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
    tools: state.tools.tools,
  };
};

export default connect(mapStateToProps, { addTool })(AddTools);
