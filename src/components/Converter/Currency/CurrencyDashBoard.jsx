import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  fetchConvertCurrency,
  getConvertCurrencyStatus,
  getCurrencyInfo,
  getCurrentExchangeRate,
  getFromCurrency,
  getResult,
  getToCurrency,
} from "../../../features/currency/currencySlice";
import FromToInput from "../FromToInput";

export default function CurrencyDashBoard() {
  const dispatch = useDispatch();

  const [amountInput, setAmountInput] = useState(1);
  const fromCurrency = useSelector(getFromCurrency);
  const toCurrency = useSelector(getToCurrency);
  const currentExchangeRate = useSelector(getCurrentExchangeRate)
  const result = useSelector(getResult)
  const convertCurrencyStatus = useSelector(getConvertCurrencyStatus)
  const currencyInfo = useSelector(getCurrencyInfo);

  useEffect(() => {
    dispatch(fetchConvertCurrency(amountInput ?? 2));
  }, [dispatch, fromCurrency, toCurrency, amountInput]);

  function validateText(value) {
    const checkAmount = parseFloat(
      value.toString().replaceAll(",", "")
    );
    if (checkAmount <= 0 || !checkAmount) {
      setAmountInput("");
      return;
    }
    return checkAmount
  }

  function onChangeAmount(e) {
    const checkAmount = validateText(e)
    setAmountInput(checkAmount);
  }

  function onBlurAmount(e) {
    const checkAmount = validateText(e.target.value)
    setAmountInput(checkAmount);
  }

  return (
    <>
      <div className="md:flex items-center justify-center w-full gap-2">
        <div className="flex-col items-start md:mb-0 mb-2">
          <label className="block mb-2 text-sm font-medium text-gray-900 text-gray-600">
            Amount
          </label>
          <div className="w-full">
            <div className="relative mt-2 rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <span className="text-gray-500 sm:text-sm">{currencyInfo.find(currency => currency.code === fromCurrency)?.symbol || '€'}</span>
              </div>
              <input
                type="text"
                className="block w-full border border-indigo-600 rounded-md py-4 pl-14 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                maxLength="13"
                value={
                  amountInput == null || amountInput === "" ? "" : amountInput
                }
                onChange={(e) => onChangeAmount(e.target.value)}
                onBlur={onBlurAmount}
              />
            </div>
          </div>
        </div>
        <FromToInput fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>
      {
        convertCurrencyStatus === 'fulfilled' ? (
          <div className="mt-7">
            <h1 className="text-gray-600">{amountInput ?? 2} {fromCurrency} =</h1>
            <h1 className="text-3xl">{result} {toCurrency}</h1>
            <h1 className="text-gray-600">1 {fromCurrency} = {currentExchangeRate} {toCurrency}</h1>
          </div>
        ) : (
          <>
            <div className="my-6">
              <div role="status">
                <svg aria-hidden="true" className="inline w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          </>
        )
      }
    </>
  );
}
