import React, { useEffect, useState } from "react";
import { productApi } from "../../services/api";
import { useParams } from "react-router-dom";

import DetailPresenter from "./DetailPresenter";

const DetailContainer = ({ pathname }) => {
  let { id } = useParams();

  const [detail, setDetail] = useState({});

  const getData = async () => {
    const productDetail = await productApi.getDetail(id);
    // setDetail(allProducts.data.products);
    setDetail(productDetail.data.productInfo);
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

  return <DetailPresenter {...detail} />;
};

export default DetailContainer;
