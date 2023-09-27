import { configureStore } from "@reduxjs/toolkit";
import countryReducer from "../features/countries/countrySlice";
import currencyReducer from "../features/currency/currencySlice";

export default configureStore({
  reducer: {
    countries: countryReducer,
    currency: currencyReducer
  }
})
