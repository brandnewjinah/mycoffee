import React, { useState, ChangeEvent } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { nanoid } from "nanoid";

//comp
import { Container } from "../../../components/container/Container";
import { Header } from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Section } from "../../../components/container/Section";
import { Radio } from "../../../components/RadioButton";

//util
import { beanValidate } from "../../../utils/validate";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { addBean } from "../../../redux/collectionRedux";

//interface
import { Bean, BeanErrors, Duplicate } from "../../../interfaces/interface";
import { Button } from "../../../components/Buttons";
import { primaryColor } from "../../../components/token";

export interface StateProps {
  id: number;
  name: string;
}

const AddBeanDetails = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { beanId } = useParams<{ beanId: string }>();
  const beans = useSelector((state: RootState) => state.collection.beans);
  // const thisBean: Bean = beans.find(
  //   (bean: { id: string }) => bean.id === beanId
  // )!;
  const [duplicate, setDuplicate] = useState<Duplicate>({});
  const [data, setData] = useState<Bean>({
    roaster: "",
    name: "",
    level: "light",
    img: "",
    notes: [],
  });

  const [productInfo, setProductInfo] = useState({
    img: "",
  });

  const [errors, setErrors] = useState<BeanErrors>({});

  const [previewSource, setPreviewSource] = useState("");

  // const handleImageFile = (e: ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files![0];
  //   previewFile(file);
  // };

  // const previewFile = (file: File) => {
  //   const reader = new FileReader();
  //   reader.readAsDataURL(file);
  //   reader.onload = () => {
  //     setPreviewSource(reader.result);
  //   };
  // };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    const userInput = { ...data };
    userInput.name = value;
    setData(userInput);
  };

  const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setData({ ...data, level: value });
  };

  const handleNext = () => {
    const errors = beanValidate(data);

    setErrors(errors || {});
    if (errors) return;

    const hasDuplicate = beans.filter(
      (bean) =>
        bean.roaster === data.roaster &&
        bean.name === data.name &&
        bean.level === data.level
    );

    if (hasDuplicate.length > 0) {
      setDuplicate(hasDuplicate[0]);
    } else {
      dispatch(addBean(data));
      // history.push(`/notes/b/${data.id}/new`);
    }
  };

  return (
    <Container gap="2.5rem">
      {/* <Header overlay={thisBean.roaster} title={thisBean.name} /> */}
      <Section gap="1.625rem">
        <input
          type="file"
          name="img"
          value={productInfo.img}
          // onChange={handleImageFile}
        />

        <Input
          name="name"
          label="Name"
          error={errors.name}
          onChange={handleInputChange}
        />
        <article>
          <h4>Roast Level</h4>
          <div>
            <Radio
              label="Light"
              name="group"
              value="light"
              checked={data.level === "light"}
              onChange={handleSelect}
            />
            <Radio
              label="Medium"
              name="group"
              value="medium"
              checked={data.level === "medium"}
              onChange={handleSelect}
            />
            <Radio
              label="Dark"
              name="group"
              value="dark"
              checked={data.level === "dark"}
              onChange={handleSelect}
            />
          </div>
        </article>
      </Section>
      <Button
        label="Next"
        variant="primary"
        color={primaryColor.blue}
        handleClick={handleNext}
      />
      {duplicate && Object.keys(duplicate).length !== 0 && (
        <>
          <p>{`${duplicate.name} from ${duplicate.roaster} already exists.`}</p>
          <Link to={`/note/${duplicate.id}`}>Go to Bean</Link>
        </>
      )}
    </Container>
  );
};

export default AddBeanDetails;
