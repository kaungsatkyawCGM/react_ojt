import {
  createAsyncThunk,
  createSlice
} from "@reduxjs/toolkit"
import axios from "axios"
import currencyApi from "../../api/currencyApi"
import { MONTH_STATUS, YEAR_STATUS } from "../../app/constants";

function subtractMonth() {
  const current = new Date()
  current.setMonth(current.getMonth() - 1);
  return current;
}

function subtractYear() {
  const current = new Date()
  current.setFullYear(current.getFullYear() - 1);
  return current;
}

function subtractDay() {
  const current = new Date()
  current.setDate(current.getDay() - 1);
  return current;
}

function getStartDate(status) {
  switch (status) {
    case YEAR_STATUS:
      return subtractYear()
    case MONTH_STATUS:
      return subtractMonth()
    default:
      return subtractDay()
  }
}

const current = new Date();

const initialState = {
  currencyCodes: [],
  currencyInfo: [{}],
  currencyChartTimeseries: [{}],
  status: {},
  fromCurrency: 'EUR',
  toCurrency: 'USD',
  currentExchangeRate: 1,
  date: current.getDate(),
  result: 0
}

export const fetchCurrencyRates = createAsyncThunk('countries/fetchCurrencyRates', async () => {
  const response = await currencyApi.get('latest')
  return response.data
})

export const fetchCurrencyInfo = createAsyncThunk('countries/fetchCurrencyInfo', async () => {
  const response = await axios.create({
      baseURL: "",
  }).get('data/currencyInfo.json')

  return response.data
})

export const fetchConvertCurrency = createAsyncThunk('countries/fetchConvertCurrency', async (amountInput, { getState }) => {
  const { currency } = getState()
  const response = await currencyApi.get(`convert?from=${currency.fromCurrency}&to=${currency.toCurrency}&amount=${amountInput}`)

  return response.data
})

export const fetchCurrencyTimeseries = createAsyncThunk('countries/fetchCurrencyTimeseries', async (status, { getState }) => {
  const [ startDate ] = getStartDate(status).toISOString().split('T')
  const [ endDate ] = new Date().toISOString().split('T')
  const { currency } = getState()

  const response = await currencyApi.get(`timeseries?start_date=${startDate}&end_date=${endDate}&base=${currency.fromCurrency}&symbols=${currency.toCurrency}`)

  return response.data
})

const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    setFromCurrency: (state, { payload }) => {
      state.fromCurrency = payload
    },
    setToCurrency: (state, { payload }) => {
        state.toCurrency = payload
    },
    setAmount: (state, { payload }) => {
      state.amount = payload
    },
  },
  extraReducers: {
      [fetchCurrencyInfo.pending]: (state) => {
        return { ...state, status: { ...state.status, currencyInfo: 'pending' } }
      },
      [fetchCurrencyInfo.fulfilled]: (state, {payload}) => {
          const currencyCodes = payload.map(currency => currency.code)
          return {
              ...state,
              currencyCodes,
              currencyInfo: payload,
              status: { ...state.status, currencyInfo: 'fulfilled' }
          }
      },
      [fetchCurrencyRates.pending]: (state) => {
        return { ...state, status: { ...state.status, currencyRates: 'pending' } }
      },
      [fetchCurrencyRates.fulfilled]: (state, { payload }) => {
        const apiCurrencyCodes = Object.keys(payload.rates)
        const fromCurrency = payload.base
        const toCurrency = (apiCurrencyCodes.includes('USD') && fromCurrency !== 'USD') ? 'USD' : 'EUR'

        return { ...state, fromCurrency, toCurrency, date: payload.date, status: { ...state.status, currencyRates: 'fulfilled' } }
      },
      [fetchConvertCurrency.pending]: (state) => {
        return { ...state,  status: { ...state.status, convertCurrency: 'pending' }}
      },
      [fetchConvertCurrency.fulfilled]: (state, {payload}) => {
        const rate = payload.info.rate
        const date = payload.date
        const result = payload.result
        return { ...state, currentExchangeRate: rate, date: date, result: result, status: { ...state.status, convertCurrency: 'fulfilled' }}
      },
      [fetchCurrencyTimeseries.pending]: (state) => {
        return { ...state, status: { ...state.status, timeSeries: 'pending' }}
      },
      [fetchCurrencyTimeseries.fulfilled]: (state, {payload}) => {
        const currencyChartTimeseries = []
        for (const [date, exchnageRateObject] of Object.entries(payload.rates)) {
          const dateWithFormat = new Date(date).toLocaleDateString(undefined, {
            month: 'short',
            day: '2-digit',
          })
          currencyChartTimeseries.push({
            'date': dateWithFormat,
            'exchangeRate': Object.values(exchnageRateObject)[0]
          })
        }
        return { ...state, currencyChartTimeseries, status: { ...state.status, timeSeries: 'fulfilled' }}
      }
  }
})

export const { setFromCurrency, setToCurrency, setAmount } = currencySlice.actions

export const getStateData = (state) => state.currency
export const getConvertCurrencyStatus = (state) => state.currency.status.convertCurrency
export const getTimeSeriesStatus = (state) => state.currency.status.timeSeries
export const getCurrencyRatesStatus = (state) => state.currency.status.currencyRates
export const getCurrencyInfoStatus = (state) => state.currency.status.currencyInfo
export const getCurrencyInfo = (state) => state.currency.currencyInfo
export const getFromCurrency = (state) => state.currency.fromCurrency
export const getToCurrency = (state) => state.currency.toCurrency
export const getCurrentExchangeRate = (state) => state.currency.currentExchangeRate
export const getResult = (state) => state.currency.result
export const getDate = (state) => state.currency.date
export const getCurrencyChartTimeseries = (state) => state.currency.currencyChartTimeseries

export default currencySlice.reducer