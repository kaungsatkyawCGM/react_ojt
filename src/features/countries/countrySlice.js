import {
    createAsyncThunk,
    createSlice
} from "@reduxjs/toolkit"
import countryApi from "../../api/countryApi"

const initialState = {
  currencyCodes: [],
  countries: [],
  searchResult: [],
  currencyInfo: [{}],
  status: 'pending',
  from: '',
  to: '',
  curencyBase: '',
  fromCurrency: '',
  toCurrency: '',
  currentExchangeRate: 1,
  exchangeRates: {},
  amount: 1.00,
}

export const fetchAllCountries = createAsyncThunk('countries/fetchAllCountries', async () => {
    const response = await countryApi.get('all')
    return response.data
})

export const fetchSearchCountries = createAsyncThunk('countries/fetchSearchCountries', async (name) => {
    const response = await countryApi.get(`name/${name}`)
    return response.data
})

const countrySlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchAllCountries.fulfilled]: (state, {
            payload
        }) => {
            return {
                ...state,
                countries: payload,
                status: 'fulfilled'
            }
        },
        [fetchAllCountries.rejected]: (state) => {
            return {
                ...state,
                status: 'rejected'
            }
        },
        [fetchSearchCountries.pending]: (state, {
            payload
        }) => {
            return {
                ...state,
                searchResult: []
            }
        },
        [fetchSearchCountries.fulfilled]: (state, {
            payload
        }) => {
            return {
                ...state,
                searchResult: payload
            }
        },
        [fetchSearchCountries.rejected]: (state) => {
            return {
                ...state
            }
        },
    }
})

export const getStateData = (state) => state.countries
export const getStatus = (state) => state.countries.status
export const getCountries = (state) => state.countries.countries
export const getSearchCountries = (state) => state.countries.searchResult

export default countrySlice.reducer