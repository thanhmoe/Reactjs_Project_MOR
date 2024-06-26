import { combineReducers } from "redux";
import productsSlice from "./slice/products/productsSlice";
import productMockSlice from "./slice/products/productMockSlice";
import articlesSlice from "./slice/articles/articlesSlice";
import userSlice from "./slice/account/userSlice"
// import productsSlice from "../slice/products/productsSlice";
// import articlesSlice from "../slice/articles/articlesSlice";
// import userSlice from "../slice/account/loginSlice";
const rootReducer = combineReducers({
    productList: productsSlice,
    articleList: articlesSlice,
    productMockList: productMockSlice,
    user: userSlice
})

export default rootReducer;