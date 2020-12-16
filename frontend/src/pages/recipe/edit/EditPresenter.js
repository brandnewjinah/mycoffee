import React, { useState, useEffect } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";

//import components
import { Input } from "../../../components/Input";
import { BtnClose, BtnText, Button } from "../../../components/Button";
import CupInfo from "../../../components/CupInfo";
import Select from "react-select";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

//redux
import { connect } from "react-redux";
import {
  addRecipe,
  deleteRecipe,
  editRecipe,
} from "../../../reducers/recipeReducer";

//import styles and assets
import styled from "styled-components";
import { gray } from "../../../components/Colors";
import { Question } from "../../../assets/Icons";

const EditPresenter = (props) => {
  const [data, setData] = useState(props.data);
  const [errors, setErrors] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();
  let location = useLocation();
  let { id } = useParams();

  const getData = async () => {
    if (location.pathname.includes("/edit/")) {
      //from redux store
      const currentItem = await props.recipes.find(
        (r) => r.id === parseInt(id)
      );
      setData(currentItem);
    }
  };

  //common variables
  let newData = { ...data };
  let newIng = [...newData.ingredients];
  let newDir = [...newData.directions];
  let newRatio = [...newData.ratio];

  //basic input field
  const handleInput = ({ currentTarget: input }) => {
    newData[input.name] = input.value;
    setData(newData);
  };

  //ingredients input field
  const handleIngInput = ({ currentTarget: input }) => {
    let index = data.ingredients.findIndex((i) => i.id === parseInt(input.id));
    let currentItem = { ...newIng[index] };
    currentItem[input.name] = input.value;
    newIng[index] = currentItem;
    newData = { ...newData, ingredients: newIng };
    setData(newData);
  };

  const handleIngAdd = () => {
    let id = newIng[newIng.length - 1].id + 1;
    newIng = [...newIng, { id: id, ingredient: "", amount: "" }];
    setData({ ...data, ingredients: newIng });
  };

  const handleIngDelete = (id) => {
    newIng = newIng.filter((i) => i.id !== id);
    setData({ ...data, ingredients: newIng });
  };

  //directions input field
  const handleDirInput = ({ currentTarget: input }) => {
    let index = data.directions.findIndex((i) => i.id === parseInt(input.id));
    let currentItem = { ...newDir[index] };
    currentItem[input.name] = input.value;
    newDir[index] = currentItem;
    newData = { ...newData, directions: newDir };
    setData(newData);
  };

  const handleDirAdd = () => {
    let id = newDir[newDir.length - 1].id + 1;
    newDir = [...newDir, { id: id, text: "" }];
    setData({ ...data, directions: newDir });
  };

  const handleDirDelete = (id) => {
    newDir = newDir.filter((i) => i.id !== id);
    setData({ ...data, directions: newDir });
  };

  //ratio field
  const handleRatioSelect = (selected, item) => {
    let index = data.ratio.findIndex((i) => i.index === parseInt(item.index));
    let currentItem = {
      ...newRatio[index],
      name: selected.value,
      id: selected.id,
    };
    newRatio[index] = currentItem;
    setData({ ...data, ratio: newRatio });
  };

  const handleRatioInput = ({ currentTarget: input }) => {
    let index = data.ratio.findIndex((i) => i.index === parseInt(input.id));
    let currentItem = { ...newRatio[index] };
    currentItem[input.name] = input.value;
    newRatio[index] = currentItem;
    newData = { ...newData, ratio: newRatio };
    setData(newData);
  };

  const handleRatioAdd = () => {
    let index = newRatio[newRatio.length - 1].index + 1;
    newRatio = [...newRatio, { index: index, id: "", name: "", value: "" }];
    setData({ ...data, ratio: newRatio });
  };

  const handleRatioDelete = (index) => {
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
    history.push("/recipes");
  };

  const handleEdit = () => {
    const errors = validate();
    setErrors(errors || {});
    if (errors) return;

    props.editRecipe(data); //add to redux
    alert("Updated");
    history.push(`/recipe/${id}`);
  };

  const handleDelete = () => {
    props.deleteRecipe(data); //add to redux
    history.push("/recipes");
  };

  useEffect(() => {
    getData();
  }, [id]);

  return (
    <Wrapper>
      <Header>
        {location.pathname.includes("/edit/") ? (
          <h2>Edit Recipe</h2>
        ) : (
          <h2>Add Drink Recipe</h2>
        )}
      </Header>
      <Main>
        <Input
          label="Name"
          name="name"
          value={data.name}
          error={errors.name}
          handleChange={handleInput}
        />
        <Input
          label="Short Description"
          name="description"
          value={data.description}
          handleChange={handleInput}
        />

        <Input
          label="Image URL"
          name="image"
          value={data.image}
          handleChange={handleInput}
        />

        <Block>
          <p>ADD INGREDIENTS</p>
          {data.ingredients.map((i, idx) => (
            <div className="item" key={idx}>
              <div style={{ width: `70%` }}>
                <Input
                  id={i.id}
                  placeholder="Ingredient Name"
                  name="ingredient"
                  value={i.ingredient}
                  handleChange={handleIngInput}
                />
              </div>
              <div style={{ width: `26%` }}>
                <Input
                  id={i.id}
                  placeholder="Amount with unit"
                  name="amount"
                  value={i.amount}
                  handleChange={handleIngInput}
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
            <div className="item" key={idx}>
              <div style={{ width: `2%` }}>{`${idx + 1}.`}</div>
              <div style={{ width: `94%` }}>
                <Input
                  id={d.id}
                  name="text"
                  value={d.text}
                  handleChange={handleDirInput}
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
          <div style={{ display: `flex`, alignItems: `center` }}>
            <p style={{ marginRight: `.5em` }}>Add Ratio</p>
            <div
              style={{ display: `flex`, alignItems: `center` }}
              onClick={() => setModalOpen(true)}
            >
              <Question
                width="16"
                height="16"
                color={gray.darkergray}
                stroke="2"
              />
            </div>
            <Modal open={modalOpen} onClose={() => setModalOpen(false)} center>
              <CupInfo />
            </Modal>
          </div>
          {data.ratio.map((i, idx) => (
            <div className="item" key={idx}>
              <div style={{ width: `70%` }}>
                <Select
                  placeholder="Select"
                  options={
                    props.liquid &&
                    props.liquid.map((item) => ({
                      label: item.name,
                      value: item.name,
                      id: item.id,
                    }))
                  }
                  onChange={(event) => handleRatioSelect(event, i)}
                />
              </div>
              <div style={{ width: `26%` }}>
                <Input
                  id={i.index}
                  placeholder="value"
                  name="value"
                  error={errors.volume}
                  handleChange={handleRatioInput}
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
        <div style={{ margin: `2em`, textAlign: `center` }}>
          {location.pathname.includes("/edit/") ? (
            <>
              <Button label="Edit" handleClick={handleEdit} />
              <BtnText label="Delete" handleClick={handleDelete} />
            </>
          ) : (
            <Button label="Add" handleClick={handleSubmit} />
          )}
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

export default connect(mapStateToProps, {
  addRecipe,
  deleteRecipe,
  editRecipe,
})(EditPresenter);
