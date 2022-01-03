import React, { ChangeEvent, useState } from "react";
import { useHistory } from "react-router-dom";

//comp
import Header from "../../../components/Header";
import { Input } from "../../../components/Input";
import { Section } from "../../../components/container/Section";

const AddNote = () => {
  const history = useHistory();
  const [page, setPage] = useState(1);
  const [data, setData] = useState<{ [key: string]: string }>({
    date: "",
    dose: "",
    size: "",
    time: "",
    shot: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const userInput = { ...data };
    userInput[name] = value;
    setData(userInput);
  };

  const handleNext = (page: number) => {
    if (page === 1) {
      setPage(page + 1);
    } else {
      history.push("/brew/123/1");
    }
  };

  return (
    <div>
      <Header title="Bean Name" />
      {page === 1 && (
        <>
          <Section>
            <Input
              label="Roast Date"
              name="date"
              type="date"
              onChange={handleChange}
            />
            <Input
              label="Dose"
              name="dose"
              suffix="grams"
              onChange={handleChange}
            />
            <Input
              label="Grind Size"
              name="size"
              type="number"
              onChange={handleChange}
            />
            <Input
              label="Brew Time"
              name="time"
              suffix="seconds"
              onChange={handleChange}
            />
            <Input
              label="Shot"
              name="shot"
              suffix="grams"
              onChange={handleChange}
            />
          </Section>{" "}
          <button onClick={() => handleNext(1)}>next</button>
        </>
      )}

      {page === 2 && (
        <Section>
          <div>graph</div>
          <div>selectors</div>
          <button onClick={() => handleNext(2)}>next</button>
        </Section>
      )}
    </div>
  );
};

export default AddNote;
