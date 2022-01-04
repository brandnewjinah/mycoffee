import React from "react";
import { Link } from "react-router-dom";

//import components
import Header from "../../components/Header";
import { EmptyCard, Card } from "../../components/Card";
import { Section } from "../../components/Section";
// import { BtnText } from "../../components/Button";

//redux
import { connect } from "react-redux";
import { resetCoffee } from "../../reducers/collectionReducer";

//import styles and assets
import styled from "styled-components";

const CollectionPresenter = () => {
  // const handleReset = () => {
  //   props.resetCoffee(1);
  // };

  return (
    <Wrapper>
      <Header title="My Collection" />
      {/* <Analyser>
        {Object.values(props.quiz).every((q) => !q.length) ? (
          <h4>
            <Link to="/quiz">
              <span className="btn">Take Quiz</span> to get your coffee
              analyzer.
            </Link>
          </h4>
        ) : (
          <h4>
            {props.products.method && props.products.method.length > 0 && (
              <>
                I brew my coffee with{" "}
                {props.products.method.map((m, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <span key={idx}>
                      and <Underline>{m.title}</Underline>
                    </span>
                  ) : idx === arr.length - 1 ? (
                    <Underline key={idx}>{m.title}</Underline>
                  ) : (
                    <span key={idx}>
                      <Underline>{m.title}</Underline>,{" "}
                    </span>
                  )
                )}
                .{" "}
              </>
            )}
            {props.products.roast && props.products.roast.length > 0 && (
              <>
                I enjoy{" "}
                {props.products.roast.map((r, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <span key={idx}>
                      and <Underline>{r.title}</Underline>
                    </span>
                  ) : idx === arr.length - 1 ? (
                    <Underline key={idx}>{r.title}</Underline>
                  ) : (
                    <span>
                      <Underline key={idx}>{r.title}</Underline>,{" "}
                    </span>
                  )
                )}
                .{" "}
              </>
            )}
            {props.products.beans && props.products.beans.length > 0 && (
              <>
                I usually buy{" "}
                {props.products.beans.map((b, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <span key={idx}>
                      and <Underline>{b.title}</Underline>
                    </span>
                  ) : idx === arr.length - 1 ? (
                    <Underline key={idx}>{b.title}</Underline>
                  ) : (
                    <span key={idx}>
                      <Underline>{b.title}</Underline>,{" "}
                    </span>
                  )
                )}
                .{" "}
              </>
            )}
            {props.products.taste && props.products.taste.length > 0 && (
              <>
                I like{" "}
                {props.products.taste.map((t, idx, arr) =>
                  arr.length > 1 && idx === arr.length - 1 ? (
                    <span key={idx}>
                      and <Underline>{t.title}</Underline>
                    </span>
                  ) : idx === arr.length - 1 ? (
                    <Underline key={idx}>{t.title}</Underline>
                  ) : (
                    <span key={idx}>
                      <Underline>{t.title}</Underline>,{" "}
                    </span>
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
          {props.products.collection &&
            props.products.collection.map((p, idx) => (
              <Card
                key={idx}
                id={p.id}
                imageUrl={p.image}
                overline={p.roaster}
                name={p.name}
                caption={p.roast}
                toDetail={true}
              />
            ))}
        </Section>
      </Collection> */}
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

const Underline = styled.span`
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
`;

const Collection = styled.div`
  width: 100%;
  margin: 3em auto;
`;

// const mapStateToProps = (state) => {
//   return {
//     quiz: state.quiz,
//     method: state.quiz.method,
//     roast: state.quiz.roast,
//     beans: state.quiz.beans,
//     taste: state.quiz.taste,
//     collection: state.collection.collection,
//   };
// };

export default CollectionPresenter;