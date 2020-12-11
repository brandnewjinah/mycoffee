import React, { useState, useEffect } from "react";
import axios from "axios";
import { productApi } from "../../services/api";

//import components
import ProductPresenter from "./ProductPresenter";

const ProductContainer = () => {
  const [data, setData] = useState({});

  const [products, setProducts] = useState([]);

  const getData = async () => {
    const token = localStorage.getItem("token");

    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    await axios
      .get("http://localhost:5000/profile", options)
      .then((res) => {
        if (res.status === 200) {
          setData(res.data);
        }
      })
      .catch((err) => {
        alert(err);
      });

    const allProducts = await productApi.getAll();
    setProducts(allProducts.data.products);
  };

  console.log(products);
  useEffect(() => {
    getData();
  }, []);

  return <ProductPresenter {...data} products={products} />;
};

export default ProductContainer;
