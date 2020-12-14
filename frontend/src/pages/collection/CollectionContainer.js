import React, { useState, useEffect } from "react";
// import PropTypes from "prop-types";
import { productApi } from "../../services/api";

//import components
import CollectionPresenter from "./CollectionPresenter";

const CollectionContainer = (props) => {
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const allProducts = await productApi.getAll();
    setProducts(allProducts.data.products);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  return <CollectionPresenter roducts={products} />;
};

// CollectionContainer.propTypes = {
//   data: PropTypes.object.isRequired,
// };

export default CollectionContainer;
