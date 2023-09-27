import { useDispatch, useSelector } from "react-redux";
import { fetchConvertCurrency, fetchCurrencyTimeseries, getCurrentExchangeRate, getDate, getFromCurrency, getToCurrency } from "../../../features/currency/currencySlice";
import FromToInput from "../FromToInput";
import ButtonGroup from "./ButtonGroup";
import { useEffect, useState } from "react";
import Chart from "./Chart";

export default function ChartDashBoard() {
  const dispatch = useDispatch();

  const fromCurrency = useSelector(getFromCurrency);
  const toCurrency = useSelector(getToCurrency);
  const currentExchangeRate = useSelector(getCurrentExchangeRate)
  const date = useSelector(getDate)
  const [rangeType, setRangeType] = useState(1)

  useEffect(() => {
    dispatch(fetchConvertCurrency(2));
    dispatch(fetchCurrencyTimeseries(rangeType))
  }, [dispatch, rangeType, toCurrency, fromCurrency])

  function handleButtonAction(value) {
    setRangeType(value);
  }

  return (
    <>
      <div className="md:flex items-center justify-center w-full gap-2">
        <FromToInput fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>
      <div className="mt-7 md:flex justify-between items-center">
        <h1 className="text-2xl text-gray-600 font-bold text-center">USD to MMK Chart</h1>
        <h1 className="text-slate-800 text-center">1 {fromCurrency} = {currentExchangeRate} {toCurrency} <span className="text-gray-600">{date}</span></h1>
      </div>
      <ButtonGroup handleButtonAction={handleButtonAction} rangeType={rangeType}/>
      <Chart />
    </>
  )
}