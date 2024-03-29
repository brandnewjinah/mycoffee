import React, { useState, useEffect, ChangeEvent } from "react";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import * as api from "../../../api";

//comp
import { Flex } from "../../../components/container/Div";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Article, Section } from "../../../components/container/Section";
import { Radio } from "../../../components/RadioButton";
import { Button } from "../../../components/Buttons";
import Toast from "../../../components/Toast";
import { neutral } from "../../../components/token";

//util
import { beanValidate } from "../../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addBean, reset } from "../../../redux/beanActionsRedux";

//interface
import {
  Beans,
  NewBean,
  Duplicate,
  BeanErrors,
  NewBeanTest,
} from "../../../interfaces/beanInterface";

const AddBean = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

  const [newBean, setNewBean] = useState<NewBean>({
    roaster: "",
    name: "",
    level: "light",
    img: "",
  });

  const [suggestions, setSuggestions] = useState<Beans>([]);
  const [duplicate, setDuplicate] = useState<Duplicate>({});
  const [errors, setErrors] = useState<BeanErrors>({});

  //get beans list from data for suggestions and duplicates
  useEffect(() => {
    const fetchRoaster = async () => {
      const res = await api.publicRequest.get(
        `/search?roaster=${newBean.roaster}`
      );
      setSuggestions(res.data);
    };

    if (newBean.roaster.length > 0) {
      fetchRoaster();
    } else {
      setSuggestions([]);
    }
  }, [newBean.roaster]);

  //user clicks on a suggestion
  const handleSuggestClick = (value: string) => {
    setSuggestions([]);
    setNewBean({ ...newBean, roaster: value });
  };

  //set bean name
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...newBean };
    userInput[name as keyof NewBeanTest] = value;
    setNewBean(userInput);
  };

  //select roast level
  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setNewBean({ ...newBean, level: value });
  };

  //upload image from file
  const [previewSource, setPreviewSource] = useState("");

  const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    previewFile(file);
  };

  const previewFile = (file: File | null) => {
    const reader = new FileReader();
    reader.readAsDataURL(file as Blob);

    reader.onload = () => {
      setPreviewSource(reader.result!.toString());
    };
  };

  //submit data
  const handleNext = () => {
    const errors = beanValidate(newBean);

    setErrors(errors || {});
    if (errors) return;

    const checkDuplicate = async () => {
      const res = await api.publicRequest.get(
        `/search?roaster=${newBean.roaster}&beanName=${newBean.name}`
      );
      if (res.data.length > 0) {
        setDuplicate(res.data[0]);
      } else {
        const newBeanData = { ...newBean, img: previewSource };
        dispatch(addBean(newBeanData));
      }
    };

    checkDuplicate();
  };

  const clearDuplicate = () => {
    setDuplicate({});
  };

  //actions after submitting data
  const { beanAdded } = useSelector((state: RootState) => state.beanActions);

  useEffect(() => {
    if (beanAdded.status === 201 && location.pathname === "/beans/newbean") {
      alert("Bean successfully created!");
      history.push(`/beans/b/${beanAdded.beanDetails._id}`);
      dispatch(reset());
    } else if (
      beanAdded.status === 201 &&
      location.pathname === "/notes/newbean"
    ) {
      alert("Bean successfully created!");
      history.push(`/notes/b/${beanAdded.beanDetails._id}/new`);
      dispatch(reset());
    } else if (beanAdded.status !== 201 && beanAdded.status !== 0) {
      alert("error");
    }
  }, [
    dispatch,
    beanAdded.status,
    beanAdded.beanDetails._id,
    history,
    location.pathname,
  ]);

  return (
    <Flex flexCol gap="2.5rem">
      <Header title="Add New Bean" />
      <Section>
        <Input
          name="roaster"
          label="Roaster"
          value={newBean.roaster}
          error={errors.roaster}
          onChange={handleInputChange}
          onBlur={() => {
            setTimeout(() => {
              setSuggestions([]);
            }, 100);
          }}
        />
        {suggestions && suggestions.length > 0 && (
          <Suggestions>
            {suggestions.map((suggestion, i) => (
              <Suggestion
                key={i}
                onClick={() => handleSuggestClick(suggestion.roaster)}
              >
                {suggestion.roaster}
              </Suggestion>
            ))}
          </Suggestions>
        )}
        <Input
          name="name"
          label="Name"
          margin="1.625rem 0"
          error={errors.name}
          onChange={handleInputChange}
        />
        <Article margin="0 0 1.625rem">
          <h4>Roast Level</h4>
          <div>
            <Radio
              label="Light"
              name="group"
              value="light"
              checked={newBean.level === "light"}
              onChange={handleSelect}
            />
            <Radio
              label="Medium"
              name="group"
              value="medium"
              checked={newBean.level === "medium"}
              onChange={handleSelect}
            />
            <Radio
              label="Dark"
              name="group"
              value="dark"
              checked={newBean.level === "dark"}
              onChange={handleSelect}
            />
          </div>
        </Article>
        <Article gap=".75rem">
          <h4>Bean Image (optional)</h4>
          <input
            type="file"
            name="img"
            // value={data.img}
            onChange={handleImageFile}
          />
          {previewSource && (
            <img src={previewSource} alt="chosen" style={{ width: "100%" }} />
          )}
        </Article>
      </Section>
      <Button
        label="Add"
        variant="primary"
        fullWidth
        handleClick={handleNext}
      />
      {duplicate && Object.keys(duplicate).length !== 0 && (
        <Toast
          message={`${duplicate.name} from ${duplicate.roaster} already exists.`}
          btnLabel="Go to Bean"
          linkUrl={`/beans/b/${duplicate._id}`}
          handleCloseBtn={clearDuplicate}
        />
      )}
    </Flex>
  );
};

const Suggestions = styled.ul`
  background-color: ${neutral[10]};
  border-left: 1px solid ${neutral[200]};
  border-right: 1px solid ${neutral[200]};
`;

const Suggestion = styled.li`
  cursor: pointer;
  display: flex;
  align-items: center;
  padding: 1rem;
  border-bottom: 1px solid ${neutral[200]};

  &:hover {
    background-color: ${neutral[100]};
  }
`;

export default AddBean;
