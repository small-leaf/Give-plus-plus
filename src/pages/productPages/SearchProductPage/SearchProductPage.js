import React, { useEffect } from "react";
import { Navbar } from "../../../components";
import { StandardNavPage } from "../../../components/Page";
import { COLOR, FONT } from "../../../constants/style";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import useProduct from "../../../hooks/productHooks/useProduct";
import {
  Products,
  MoreButton,
  ProductSort,
} from "../../../components/productSystem";
import {
  setProducts,
  setErrorMessage,
  setHasMoreProducts,
} from "../../../redux/slices/productSlice/productSlice";

const SearchTitleContainer = styled.section`
  margin-top: 220px;
  display: flex;
  justify-content: space-between;
  color: ${COLOR.text_2};
`;

const SearchKeyword = styled.div`
  font-weight: bold;
  font-size: ${FONT.lg};
`;

const SearchTitle = ({ keyword, handleChangeProductSort }) => {
  return (
    <SearchTitleContainer>
      <SearchKeyword>"{keyword}" 相關的商品</SearchKeyword>
      <ProductSort
        id={keyword}
        handleChangeProductSort={handleChangeProductSort}
      />
    </SearchTitleContainer>
  );
};

const SearchProductPage = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { keyword } = useParams();
  const {
    products,
    category,
    hasMoreProducts,
    productErrorMessage,
    handleClickSearchMoreButton,
    handleChangeProductSort,
    handleGetSearchProduct,
  } = useProduct();

  useEffect(() => {
    handleGetSearchProduct(keyword);
    return () => {
      dispatch(setProducts([]));
      dispatch(setErrorMessage(null));
      dispatch(setHasMoreProducts(true));
    };
  }, []);
  return (
    <>
      <Navbar />
      <StandardNavPage>
        <SearchTitle
          keyword={keyword}
          handleChangeProductSort={handleChangeProductSort}
        />
        <Products products={products} />
        <MoreButton
          id={keyword}
          products={products}
          hasMoreProducts={hasMoreProducts}
          handler={handleClickSearchMoreButton}
          productErrorMessage={productErrorMessage}
        />
      </StandardNavPage>
    </>
  );
};

export default SearchProductPage;
