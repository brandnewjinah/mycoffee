import React, { useEffect, useState } from "react";
import { productApi } from "../../services/api";
import { useParams, useLocation } from "react-router-dom";

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
  }, [id]);

  return <DetailPresenter {...detail} />;
};

export default DetailContainer;
