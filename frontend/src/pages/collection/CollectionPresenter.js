import React from "react";
import { Link } from "react-router-dom";

//import components
import { EmptyCard, Card } from "../../components/Card";
import { Section } from "../../components/Section";
import { BtnText } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { resetCoffee } from "../../reducers/collectionReducer";

//import styles and assets
import styled from "styled-components";

const CollectionPresenter = (props) => {
  const handleReset = () => {
    props.resetCoffee(1);
  };

  return (
    <Wrapper>
      <Header>
        <h2>My Collection</h2>
      </Header>
      <Analyser>
        {Object.values(props.quiz).every((q) => !q.length) ? (
          <h4>
            <Link to="/quiz">
              <span className="btn">Take Quiz</span> to get your coffee
              analyzer.
            </Link>
          </h4>
        ) : (
          <h4>
            {props.method && props.method.length > 0 && (
              <>
                I brew my coffee with{" "}
                {props.method.map((m, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <>
                      and <span key={idx}>{m.title}</span>
                    </>
                  ) : idx === arr.length - 1 ? (
                    <span key={idx}>{m.title}</span>
                  ) : (
                    <>
                      <span key={idx}>{m.title}</span>,{" "}
                    </>
                  )
                )}
                .{" "}
              </>
            )}
            {props.roast && props.roast.length > 0 && (
              <>
                I enjoy{" "}
                {props.roast.map((r, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <>
                      and <span key={idx}>{r.title}</span>
                    </>
                  ) : idx === arr.length - 1 ? (
                    <span key={idx}>{r.title}</span>
                  ) : (
                    <>
                      <span key={idx}>{r.title}</span>,{" "}
                    </>
                  )
                )}
                .{" "}
              </>
            )}
            {props.beans && props.beans.length > 0 && (
              <>
                I usually buy{" "}
                {props.beans.map((b, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <>
                      and <span key={idx}>{b.title}</span>
                    </>
                  ) : idx === arr.length - 1 ? (
                    <span key={idx}>{b.title}</span>
                  ) : (
                    <>
                      <span key={idx}>{b.title}</span>,{" "}
                    </>
                  )
                )}
                .{" "}
              </>
            )}
            {props.taste && props.taste.length > 0 && (
              <>
                I like{" "}
                {props.taste.map((t, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <>
                      and <span key={idx}>{t.title}</span>
                    </>
                  ) : idx === arr.length - 1 ? (
                    <span key={idx}>{t.title}</span>
                  ) : (
                    <>
                      <span key={idx}>{t.title}</span>,{" "}
                    </>
                  )
                )}{" "}
                tastes.
              </>
            )}
          </h4>
        )}
      </Analyser>

      <Collection>
        <Section>
          <EmptyCard label="Add Coffee" path="/add" />
          {props.collection &&
            props.collection.map((p, idx) => (
              <Card
                key={idx}
                id={p.id}
                imageUrl={p.image}
                roaster={p.roaster}
                name={p.name}
                roast={p.roast}
                toDetail={true}
              />
            ))}
        </Section>
      </Collection>
      {/* <BtnText label="Delete All" handleClick={handleReset} /> */}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  margin: 3em auto;

  @media (max-width: 980px) {
    margin: 1em auto;
  }
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

const Analyser = styled.div`
  margin: 2em auto;
  width: 100%;
  max-width: 960px;
  text-align: center;

  h4 {
    font-size: 1.5rem;
    line-height: 2.8rem;
    letter-spacing: 0.125rem;
    margin: 1.5em 0;
    text-rendering: optimizeLegibility;
  }

  span {
    position: relative;
    text-transform: lowercase;
    cursor: pointer;

    &:after {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      border-bottom: 3px solid #e89161;
    }
  }

  .btn {
    text-transform: none;
  }

  @media (max-width: 980px) {
    h4 {
      line-height: 2.4rem;
    }
  }
`;

const Collection = styled.div`
  width: 100%;
  margin: 3em auto;
`;

const mapStateToProps = (state) => {
  return {
    quiz: state.quiz,
    method: state.quiz.method,
    roast: state.quiz.roast,
    beans: state.quiz.beans,
    taste: state.quiz.taste,
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, { resetCoffee })(CollectionPresenter);
