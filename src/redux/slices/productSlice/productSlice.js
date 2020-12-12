import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import {
  getProductsAPI,
  getProductCategoriesAPI,
  getProductsFromCategoryAPI,
  getProductsFromVendorAPI,
  searchProductAPI,
  getProductAPI,
  postProductAPI,
  updateProductAPI,
  deleteProductAPI,
} from "../../../webAPI/productAPI";

export const productSlice = createSlice({
  name: "product",
  initialState: {
    page: 1,
    sort: "latest",
    product: [],
    products: [],
    productCount: 0,
    hasMoreProducts: true,
    category: [],
    categories: [],
    isLoading: false,
    errorMessage: null,
  },
  reducers: {
    setSort: (state, action) => {
      state.sort = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    pushProducts: (state, action) => {
      console.log("action:", action);
      state.products.push(...action.payload);
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
    setHasMoreProducts: (state, action) => {
      state.hasMoreProducts = action.payload;
    },
    setProductCount: (state, action) => {
      state.productCount = action.payload;
    },
    setProduct: (state, action) => {
      state.product = action.payload;
    },
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setCategory: (state, action) => {
      state.category = action.payload;
    },
    setErrorMessage: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const {
  setSort,
  setPage,
  pushProducts,
  setProducts,
  setProductCount,
  setHasMoreProducts,
  setProduct,
  setCategories,
  setCategory,
  setErrorMessage,
} = productSlice.actions;

export const getProducts = () => (dispatch) => {
  getProductsAPI().then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    }
    dispatch(pushProducts(res.data));
  });
};

export const getProduct = (id) => (dispatch) => {
  getProductAPI(id).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    }
    dispatch(setProduct(res.data));
  });
};

export const getProductsFromCategory = (id, page, queue) => (dispatch) => {
  getProductsFromCategoryAPI(id, page, queue).then((res) => {
    if (res.ok === 0) {
      dispatch(setHasMoreProducts(false));
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    }
    if (res.data.products.length !== 10) {
      dispatch(setHasMoreProducts(false));
    }
    dispatch(setCategory(res.data.category));
    dispatch(pushProducts(res.data.products));
  });
};

export const getProductsFromVendor = (id, page) => (dispatch) => {
  getProductsFromVendorAPI(id, page).then((res) => {
    if (res.ok === 0) {
      dispatch(setHasMoreProducts(false));
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    }
    if (res.data.products.length !== 10) {
      dispatch(setHasMoreProducts(false));
    }
    dispatch(pushProducts(res.data.products));
    dispatch(setProductCount(res.data.count));
  });
};

export const searchProduct = (keyword, page, queue) => (dispatch) => {
  searchProductAPI(keyword, page, queue).then((res) => {
    if (res.ok === 0) {
      if (res.message === "無更多商品") {
        return dispatch(setHasMoreProducts(false));
      }
      dispatch(setHasMoreProducts(false));
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    }
    if (res.data.length !== 10) {
      dispatch(setHasMoreProducts(false));
    }
    dispatch(pushProducts(res.data));
  });
};

export const getProductCategories = () => (dispatch) => {
  getProductCategoriesAPI().then((res) => {
    if (!res || res.ok === 0)
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    dispatch(setCategories(res.data));
  });
};

export const postProduct = ({
  ProductCategoryId,
  name,
  picture_url,
  info,
  price,
  quantity,
  delivery, // 出貨方式  0:面交、1:郵寄
  delivery_location, // 出貨地點的欄位
  delivery_time, // 備貨時間的欄位
  payment_method, // 付款方式 0:貨到付款
  remark, // 備註
}) => (dispatch) => {
  return postProductAPI({
    ProductCategoryId,
    name,
    picture_url,
    info,
    price,
    quantity,
    delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location, // 出貨地點的欄位
    delivery_time, // 備貨時間的欄位
    payment_method, // 付款方式 0:貨到付款
    remark, // 備註
  }).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    }
    return res.message;
  });
};

export const updateProduct = ({
  ProductCategoryId,
  name,
  picture_url,
  info,
  price,
  quantity,
  delivery, // 出貨方式  0:面交、1:郵寄
  delivery_location, // 出貨地點的欄位
  delivery_time, // 備貨時間的欄位
  payment_method, // 付款方式 0:貨到付款
  remark, // 備註
}) => (dispatch) => {
  return updateProductAPI({
    ProductCategoryId,
    name,
    picture_url,
    info,
    price,
    quantity,
    delivery, // 出貨方式  0:面交、1:郵寄
    delivery_location, // 出貨地點的欄位
    delivery_time, // 備貨時間的欄位
    payment_method, // 付款方式 0:貨到付款
    remark, // 備註
  }).then((res) => {
    if (res.ok === 0) {
      return dispatch(setErrorMessage(res ? res.message : "something wrong"));
    }
    return res.message;
  });
};

export const deleteProduct = (id) => (_) => {
  return deleteProductAPI(id).then((res) => res.message);
};

export const selectProductCategories = (state) => state.product.categories;
export const selectProducts = (state) => state.product.products;
export const selectProduct = (state) => state.product.product;
export const selectCategory = (state) => state.product.category;
export const selectErrorMessage = (state) => state.product.errorMessage;
export const selectProductCount = (state) => state.product.productCount;
export const selectHasMoreProducts = (state) => state.product.hasMoreProducts;
export const selectPage = (state) => state.product.page;
export const selectSort = (state) => state.product.sort;
export default productSlice.reducer;
