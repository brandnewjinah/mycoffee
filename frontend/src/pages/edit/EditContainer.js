import React from "react";
import { useParams } from "react-router-dom";

//import components
import EditPresenter from "./EditPresenter";

//redux
import { connect } from "react-redux";

const EditContainer = (props) => {
  let { id } = useParams();

  return <EditPresenter id={id} />;
};

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, null)(EditContainer);
