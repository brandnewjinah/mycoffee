import React, { useState, useEffect, ChangeEvent } from "react";
import { useParams, useHistory } from "react-router-dom";

//comp
import { Flex } from "../../components/container/Div";
import { Header } from "../../components/Header";
import { Section } from "../../components/container/Section";
import { TextArea } from "../../components/TextArea";
import { Input } from "../../components/Input";
import Modal from "../../components/Modal";
import Chips from "../../components/Chips";
import { Button } from "../../components/Buttons";

//interface
import { BaseObjectIF } from "../../interfaces/baseInterface";
import { BeanUpdates } from "../../interfaces/beanInterface";

//redux
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { updateBean, reset } from "../../redux/beanActionsRedux";

//data
import { beanFlavor } from "../../data/flavor";

const EditBeanDetails = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { beanId } = useParams<{ beanId: string }>();

  const [beanUpdates, setBeanUpdates] = useState<BeanUpdates>({
    process: "",
    description: "",
    region: "",
    variety: "",
  });

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const userInput = { ...beanUpdates };
    userInput[name as keyof BeanUpdates] = value;
    setBeanUpdates(userInput);
  };

  //modal
  const [showModal, setShowModal] = useState(false);

  //flavor
  const [flavor, setFlavor] = useState<BaseObjectIF[]>([]);

  const handleFlavorSelect = (selected: BaseObjectIF) => {
    let newFlavorArray = [...flavor];
    if (flavor.includes(selected)) {
      newFlavorArray = newFlavorArray.filter((item) => item.id !== selected.id);
      setFlavor(newFlavorArray);
    } else {
      newFlavorArray.push(selected);
      setFlavor(newFlavorArray);
    }
  };

  const handleNext = () => {
    let newRegion = beanUpdates.region?.split(",");
    let newVariety = beanUpdates.variety?.split(",");
    let newBeanDetails = {
      _id: beanId,
      process: beanUpdates.process,
      description: beanUpdates.description,
      region: newRegion,
      variety: newVariety,
      flavor: flavor,
    };
    dispatch(updateBean(newBeanDetails));
  };

  //actions after submitting data
  const { beanUpdated } = useSelector((state: RootState) => state.beanActions);

  useEffect(() => {
    if (beanUpdated.status === 200) {
      alert("Bean successfully updated!");
      history.push(`/beans/b/${beanId}`);
      dispatch(reset());
    } else if (beanUpdated.status !== 200 && beanUpdated.status !== 0) {
      alert("error");
    }
  }, [dispatch, beanUpdated.status, beanId]);
  return (
    <div>
      <Flex flexCol gap="2.5rem">
        <Header title="Add More Details" />
        <Section>
          <TextArea
            name="description"
            label="Description"
            onChange={handleInputChange}
          />
          <Input name="process" label="Process" onChange={handleInputChange} />
          <Input name="region" label="Region" onChange={handleInputChange} />
          <Input name="variety" label="Variety" onChange={handleInputChange} />
          <div>
            <p>flavor</p>
            {flavor &&
              flavor.length > 0 &&
              flavor.map((item) => (
                <Chips
                  key={item.id}
                  label={item.value}
                  enableDelete
                  handleSelect={() => handleFlavorSelect(item)}
                />
              ))}
            <button onClick={() => setShowModal!(true)}>Add Flavor</button>
            <Modal
              header="Add Flavor"
              open={showModal!}
              handleClose={() => setShowModal!(false)}
            >
              {beanFlavor &&
                beanFlavor.length > 0 &&
                beanFlavor.map((item) => (
                  <Chips
                    key={item.id}
                    label={item.value}
                    selected={flavor.includes(item)}
                    handleSelect={() => handleFlavorSelect(item)}
                  />
                ))}
            </Modal>
          </div>
        </Section>
        <Button
          label="Next"
          variant="primary"
          fullWidth
          handleClick={handleNext}
        />
      </Flex>
    </div>
  );
};

export default EditBeanDetails;
