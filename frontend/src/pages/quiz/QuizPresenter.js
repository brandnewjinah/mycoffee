import React, { useState } from "react";

//import styles and assets
import styled from "styled-components";
import { BtnArrow } from "../../components/Button";
import { Check } from "../../assets/Icons";
import { Input } from "../../components/Input";
import { Selector } from "../../components/Selector";

//redux
import { connect } from "react-redux";
import { addProfile } from "../../reducers/quizReducer";

const QuizPresenter = (props) => {
  console.log(props);
  const quiz = props.quiz && props.quiz;
  const page = props.quiz && props.quiz.page;
  const name = quiz && quiz.name;
  const [profile, setProfile] = useState({
    method: props.method,
    roast: props.roast,
    beans: props.beans,
    taste: props.taste,
  });

  const handleSelection = (option) => {
    let newOption = [...profile[name]];
    let duplicate = newOption.find((item) => item.id === option.id);

    if (duplicate) {
      newOption = newOption.filter((f) => f.id !== option.id);
    } else {
      newOption = [...profile[name], option];
    }

    setProfile({ ...profile, [name]: newOption });
  };

  const handleChange = ({ currentTarget: input }) => {
    const userInput = { ...profile[input.name], value: input.value };
    setProfile({ ...profile, [input.name]: userInput });
  };

  const handleToggle = (a, b) => {
    let newPro = { ...profile[a], unit: b };
    setProfile({ ...profile, [a]: newPro });
  };

  const handleNext = () => {
    props.addProfile(profile);
    props.handleNext(profile);
  };

  const handlePrev = () => {
    props.handlePrev();
  };

  return (
    <Wrapper>
      <Header>
        <h3>{quiz && quiz.header}</h3>
        <p>{quiz && quiz.sub}</p>
      </Header>

      {quiz && quiz.type === "selection" && (
        <Grid>
          {quiz &&
            quiz.selections.map((option, idx) => (
              <Selection key={idx} onClick={() => handleSelection(option)}>
                {profile[name].find((f) => f.id === option.id) && (
                  <div>
                    <Check width="20" height="20" color="#d46f4a" stroke="3" />
                  </div>
                )}
                {option.title}
              </Selection>
            ))}
        </Grid>
      )}

      {quiz && quiz.type === "input" && (
        <Section>
          {quiz &&
            quiz.selections.map((option, idx) => (
              <Flex key={idx}>
                <div style={{ marginRight: `1em` }}>
                  <Input
                    placeholder={option.label}
                    type="text"
                    name={option.name}
                    handleChange={handleChange}
                  />
                </div>
                <Flex>
                  {option.options &&
                    option.options.map((o, idx) => (
                      <Selector
                        key={idx}
                        label={o.label}
                        direction={o.id}
                        selected={
                          profile[option.name] &&
                          profile[option.name].unit === o.label
                            ? true
                            : false
                        }
                        handleToggle={() => handleToggle(option.name, o.label)}
                      />
                    ))}
                </Flex>
              </Flex>
            ))}
        </Section>
      )}
      <Buttons>
        {page !== 1 && <BtnArrow direction="left" handleClick={handlePrev} />}
        <BtnArrow direction="right" handleClick={handleNext} />
      </Buttons>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin: 3em auto;
`;

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Header = styled.div`
  text-align: center;

  h3 {
    font-weight: 600;
  }

  p {
    margin: 1em 0;
  }
`;

const Grid = styled.div`
  margin: 2em 8em 2em;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 1em;
  justify-items: center;
`;

const Section = styled(Flex)`
  flex-direction: column;
  margin: 2em 0;
`;

const Selection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #d3b88c;
  width: 20em;
  padding: 2em;
  text-align: center;
  margin: 1em 0;
  cursor: pointer;
  transition: all 0.09s linear;

  &:hover {
    transform: scale(1.02);
  }

  div {
    display: flex;
    align-items: center;
    margin: 0 1em;
  }
`;

const Buttons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 2em 0;

  button {
    margin: 0 1.5em;
  }
`;

const mapStateToProps = (state) => {
  return {
    method: state.quiz.method,
    roast: state.quiz.roast,
    beans: state.quiz.beans,
    taste: state.quiz.taste,
  };
};

export default connect(mapStateToProps, { addProfile })(QuizPresenter);
