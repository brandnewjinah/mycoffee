import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
// import axios from "axios";
// import { productApi } from "../../services/api";

//import components
import HomePresenter from "./HomePresenter";

//redux
import { connect } from "react-redux";
import { getCollection } from "../../actions/collectActions";

const HomeContainer = (props) => {
  const data = useState({});

  const products = useState([]);

  const getData = async () => {
    props.getCollection();
    console.log(props);

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

  return <HomePresenter {...data} products={products} />;
};

HomeContainer.propTypes = {
  getCollection: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  data: state.data,
});

export default connect(mapStateToProps, { getCollection })(HomeContainer);
