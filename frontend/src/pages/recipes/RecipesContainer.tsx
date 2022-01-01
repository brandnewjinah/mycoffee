import React, { useState } from "react";
// import { productApi } from "../../services/api";

//import components
import RecipesPresenter from "./RecipesPresenter";

const RecipesContainer = () => {
  const products = useState([]);
  // const [products, setProducts] = useState([]);

  // const getData = async () => {
  //   const allProducts = await productApi.getAll();
  //   setProducts(allProducts.data.products);
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  return <RecipesPresenter />;
};

export default RecipesContainer;
