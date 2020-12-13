import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
// import { productApi } from "../../services/api";

//import components
import CollectionPresenter from "./CollectionPresenter";

//redux
import { connect } from "react-redux";

const CollectionContainer = (props) => {
  const data = useState({});

  const products = useState([]);

  const getData = async () => {
    // const token = localStorage.getItem("jwtToken");
    // const options = {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // };
    // await axios
    //   .get("http://localhost:5000/profile", options)
    //   .then((res) => {
    //     if (res.status === 200) {
    //       // setData(res.data);
    //       console.log("+++++++++++", res.data);
    //     }
    //   })
    //   .catch((err) => {
    //     alert(err);
    //   });
    // const allProducts = await productApi.getAll();
    // setProducts(allProducts.data.products);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <CollectionPresenter {...data} products={products} />;
};

CollectionContainer.propTypes = {
  getCollection: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, null)(CollectionContainer);
