import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import InputAdornment from "@mui/material/InputAdornment";
//styles
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./CurrencyCodeSelectorTheme";
import { useDispatch, useSelector } from "react-redux";
import { getCurrencyInfo, getCurrencyInfoStatus, setFromCurrency, setToCurrency } from "../../../features/currency/currencySlice";

export default function CurrencyChooseInput({ currentCode, labelName }) {
  const dispatch = useDispatch()
  const currencyInfo = useSelector(getCurrencyInfo);
  const status = useSelector(getCurrencyInfoStatus);

  function handleChangeCode(code) {
    if (labelName === 'From') {
      dispatch(setFromCurrency(code))
    }
    else {
      dispatch(setToCurrency(code))
    }
  }

  const autocompleteProps = {
    options: currencyInfo,
    value:
      currencyInfo.find((currencyCode) => currencyCode.code === currentCode) ||
      null,
    getOptionLabel: (option) => option?.code + " — " + option?.name,
  };

  const options = ["Loading..."];
  const autocompleteLoadingProps = {
    options: options,
    value: options[0] || null,
  };

  const props = status === "fulfilled" ? autocompleteProps : autocompleteLoadingProps;

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900 text-gray-600">
        {labelName}
      </label>
      <div className="w-full">
        <ThemeProvider theme={theme}>
          <Autocomplete
            id={labelName.toLowerCase()}
            sx={{ width: "100%" }}
            {...props}
            autoHighlight
            onChange={(event, value) => {
              handleChangeCode(value?.code);
            }}
            disableClearable={true}
            renderOption={(props, option) => (
              <Box
                component="li"
                sx={{
                  "& > img": { mr: 2, flexShrink: 0 },
                  "& > .optionCode": { minWidth: 50 },
                  "& > .optionName": {
                    color: "gray",
                    fontWeight: 300,
                    fontSize: ".9rem",
                  },
                  textAlign: "left",
                  display: "flex",
                  alignItems: "flex-start",
                }}
                {...props}
              >
                <img
                  loading="lazy"
                  width="20"
                  src={`https://flagcdn.com/w20/${option.countryCode?.toLowerCase()}.png`}
                  srcSet={`https://flagcdn.com/w40/${option.countryCode?.toLowerCase()}.png 2x`}
                  alt=""
                />
                <span className="optionCode"> {option.code}</span>{" "}
                <span className="optionName"> {option.name}</span>
              </Box>
            )}
            renderInput={(params) => {
              params.InputProps.startAdornment = (
                <>
                  <InputAdornment position="start">
                    <img
                      src={`https://flagcdn.com/w40/${
                        currencyInfo
                          .find(
                            (currencyCode) =>
                              currencyCode.code ===
                              (params.inputProps?.value).split(" ")[0]
                          )
                          ?.countryCode?.toLowerCase() || "eu"
                      }.png`}
                      alt=""
                    />
                  </InputAdornment>
                  {params.InputProps.startAdornment}
                </>
              );

              return <TextField {...params} variant="outlined" />;
            }}
          />
        </ThemeProvider>
      </div>
    </>
  );
}
