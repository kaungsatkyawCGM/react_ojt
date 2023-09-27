import CurrencyChooseInput from "./Currency/CurrencyChooseInput";
import ReverseButton from "./Currency/ReverseButton/ReverseButton";

export default function FromToInput({fromCurrency, toCurrency}) {
  return (
    <>
      <div className="flex-col flex grow items-start">
        <CurrencyChooseInput currentCode={fromCurrency} labelName={"From"} />
      </div>
      <div className="flex-col items-center flex">
        <ReverseButton />
      </div>
      <div className="flex-col flex grow items-start">
        <CurrencyChooseInput currentCode={toCurrency} labelName={"To"} />
      </div>
    </>
  );
}
