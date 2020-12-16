import React, { useState } from "react";
// import PropTypes from "prop-types";
// import { productApi } from "../../services/api";

//import components
import RecipesPresenter from "./RecipesPresenter";

const RecipesContainer = (props) => {
  const products = useState([]);
  // const [products, setProducts] = useState([]);

  // const getData = async () => {
  //   const allProducts = await productApi.getAll();
  //   setProducts(allProducts.data.products);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return <RecipesPresenter roducts={products} />;
};

// CollectionContainer.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default RecipesContainer;
