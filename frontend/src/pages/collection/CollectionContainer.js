import React, { useState, useEffect } from "react";
import { productApi } from "../../services/api";

//import components
import CollectionPresenter from "./CollectionPresenter";

const CollectionContainer = (props) => {
  // const products = useState([]);
  const [products, setProducts] = useState([]);

  const getData = async () => {
    const allProducts = await productApi.getAll();
    setProducts(allProducts.data.products);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(products);

  return <CollectionPresenter products={products} />;
};

export default CollectionContainer;
