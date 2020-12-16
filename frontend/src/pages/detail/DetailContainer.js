import React, { useEffect, useState } from "react";
// import { productApi } from "../../services/api";
import { useParams } from "react-router-dom";

//import redux
import { connect } from "react-redux";

//import components
import DetailPresenter from "./DetailPresenter";

const DetailContainer = (props) => {
  let { id } = useParams();
  const [item, setItem] = useState({});

  const getData = async () => {
    //from redux store
    const currentItem = props.collection.find((c) => c.id === parseInt(id));
    setItem(currentItem);

    // //connect to server
    // const productDetail = await productApi.getDetail(id);
    // setDetail(productDetail.data.productInfo);
  };

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // const postComment = async (comment) => {
  //   const token = localStorage.getItem("token");

  //   const options = {
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   };

  //   await axios
  //     .post(`http://localhost:5000/product/comment/${id}`, comment, options)
  //     .then((res) => {
  //       if (res.status === 200) {
  //         window.location = "/home";
  //       }
  //     })
  //     .catch((err) => {
  //       alert(err);
  //     });
  // };

  return <DetailPresenter item={item} />;
};

const mapStateToProps = (state) => {
  return {
    collection: state.collection.collection,
  };
};

export default connect(mapStateToProps, null)(DetailContainer);
