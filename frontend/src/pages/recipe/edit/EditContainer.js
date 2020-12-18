import React, { useState } from "react";

//import components
import EditPresenter from "./EditPresenter";

//import data
import { liquidOptions } from "../../../data/data";

//import redux
import { connect } from "react-redux";

const EditContainer = (props) => {
  const liquid = liquidOptions;

  const [data, setData] = useState({
    name: "",
    description: "",
    image: "",
    ingredients: [{ id: 1, ingredient: "", amount: "" }],
    directions: [{ id: 1, text: "" }],
    ratio: [{ index: 1, id: "", name: "", value: "" }],
    comments: [],
  });

  // const getData = async () => {
  //   if (location.pathname.includes("/edit/")) {
  //     //from redux store
  //     const currentItem = await props.recipes.find(
  //       (r) => r.id === parseInt(id)
  //     );
  //     setData(currentItem);
  //     // //connect to server
  //     // const productDetail = await productApi.getDetail(id);
  //     // setDetail(productDetail.data.productInfo);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, [id]);

  return <EditPresenter data={data} liquid={liquid} />;
};

const mapStateToProps = (state) => {
  return {
    recipes: state.recipes.recipes,
  };
};

export default connect(mapStateToProps, null)(EditContainer);
