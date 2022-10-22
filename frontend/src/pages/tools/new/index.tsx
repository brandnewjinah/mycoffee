import React, { ChangeEvent, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//comp
import { Flex } from "../../../components/container/Div";
import { Article, Section } from "../../../components/container/Section";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Button } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";

//interface
import { Tool, ToolErrors } from "../../../interfaces/toolInterface";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addTool, reset } from "../../../redux/toolActionsRedux";

const AddTool = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [tool, setTool] = useState<Tool>({
    name: "",
    brand: "",
    description: "",
    instructionsUrl: "",
    img: "",
  });

  const [errors, setErrors] = useState<ToolErrors>({});

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...tool };
    userInput[name as keyof Tool] = value;
    setTool(userInput);
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

  const handleNext = () => {
    const newToolData = { ...tool, img: previewSource };
    dispatch(addTool(newToolData));
  };

  //actions after submitting data
  const { toolAdded } = useSelector((state: RootState) => state.toolActions);

  useEffect(() => {
    if (toolAdded.status === 201) {
      alert("Tool successfully added!");
      history.push(`/tool/${toolAdded.toolDetails._id}`);
      dispatch(reset());
    } else if (toolAdded.status !== 201 && toolAdded.status !== 0) {
      alert("error");
    }
  }, [dispatch, toolAdded.status, toolAdded.toolDetails._id, history]);

  return (
    <Flex flexCol gap="2.5rem">
      <Header title="Add New Tool" />
      <Section gap="1.625rem">
        <Input
          name="name"
          label="Name"
          error={errors.name}
          onChange={handleInputChange}
        />
        <Input name="brand" label="Brand" onChange={handleInputChange} />
        <Input
          name="description"
          label="Description"
          error={errors.description}
          onChange={handleInputChange}
        />
        <Input
          name="instructionsUrl"
          label="Instructions URL"
          onChange={handleInputChange}
        />
        <Article gap=".75rem">
          <h4>Tool Image (optional)</h4>
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
      <Button label="Next" variant="primary" handleClick={handleNext} />
    </Flex>
  );
};

export default AddTool;
