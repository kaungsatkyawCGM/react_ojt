import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getStateData } from "../../features/countries/countrySlice";
import { FaCheck } from "react-icons/fa";
import "./Detail.css";
import PageNotFound from "../PageNotFound";

export default function Detail() {
  const { id } = useParams();
  const stateDataCountries = useSelector(getStateData);
  const [country, setCountry] = useState();

  function getNativeName() {
    for (const langCode in country?.name.nativeName) {
      return country.name.nativeName[langCode].official;
    }
  }

  function getLanguage() {
    for (const langCode in country?.languages) {
      return country.languages[langCode];
    }
  }

  function getCurrencies() {
    let currencies = [];
    for (const symbol in country?.currencies) {
      currencies = [...currencies, country.currencies[symbol]];
    }
    return currencies;
  }

  function getBorderLands() {
    let borderLands = [];
    country?.borders?.map((borderLandCode) => {
      const borderLandData = stateDataCountries.countries.filter((value) => {
        return borderLandCode === value.cca3;
      });
      if (borderLandData.length) {
        borderLands = [
          ...borderLands,
          { name: borderLandData[0]?.name.common, flag: country.flags.svg },
        ];
      }
      return borderLands;
    });
    return borderLands;
  }

  useEffect(() => {
    const currentCountry = stateDataCountries.countries.filter((value) => {
      return value.cca3 === id;
    });

    setCountry(currentCountry[0]);
  }, [stateDataCountries, country, id]);

  return (
    <>
      {country ? (
        <div>
          <div className="p-4 header-wrapper">
            <div className="flex justify-between">
              <div className="flex">
                <div className="w-32 pr-3">
                  <img src={country.flags.svg} alt="national flag" />
                </div>
                <div>
                  <h3 className="text-base font-semibold leading-7 text-gray-900">
                    {country.name.common}
                  </h3>
                  <p className="mt-1 max-w-2xl text-sm leading-6 text-gray-500">
                    {getNativeName()}
                  </p>
                </div>
              </div>
              {country.maps?.googleMaps && (
                <div className="hidden sm:block">
                  <a
                    target="_blank"
                    rel="noreferrer noopener"
                    href={country.maps?.googleMaps}
                    className="block text-sm text-slate-500 mr-4 py-2 px-4 rounded-full border-0
                    text-sm font-semibold
                    bg-violet-50 text-violet-700
                    hover:bg-violet-100"
                  >
                    Google Map
                  </a>
                </div>
              )}
            </div>
          </div>
          {country.maps?.googleMaps && (
            <div className="block sm:hidden fixed bottom-10 right-5">
              <a
                href={country.maps?.googleMaps}
                className="text-sm text-slate-500 py-2 px-4 rounded-full border-0
                        text-sm font-semibold
                        bg-violet-50 text-violet-700
                        hover:bg-violet-100"
              >
                Google Map
              </a>
            </div>
          )}
          <div className="mt-6 border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              {/* {country.maps?.googleMaps && (
                <div className="block sm:hidden">
                  <a
                    href={country.maps?.googleMaps}
                    className="text-sm text-slate-500 py-2 px-4 rounded-full border-0
                        text-sm font-semibold
                        bg-violet-50 text-violet-700
                        hover:bg-violet-100"
                  >
                    Google Map
                  </a>
                </div>
              )} */}
              {country.capital && (
                <div className="px-4 py-6 sm:grid grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Capital
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ul>
                      {country.capital.map((c, index) => (
                        <li key={index}>{c}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {country.languages && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Official Language
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {getLanguage()}
                  </dd>
                </div>
              )}
              {country.independent !== undefined && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Independent country
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {country.independent ? (
                      <FaCheck />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    )}
                  </dd>
                </div>
              )}
              {country.unMember !== undefined && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    UN member
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {country.unMember ? (
                      <FaCheck />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    )}
                  </dd>
                </div>
              )}
              {country.currencies && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Currencies
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <ul>
                      {getCurrencies().map((currency, index) => (
                        <li key={index}>
                          {currency.name}
                          {currency.symbol && ` ( ${currency.symbol} )`}
                        </li>
                      ))}
                    </ul>
                  </dd>
                </div>
              )}
              {country.region && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Region
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {country.region}
                  </dd>
                </div>
              )}
              {country.subregion && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    SubRegion
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {country.subregion}
                  </dd>
                </div>
              )}
              {country.landlocked !== undefined && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Lock Down
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {country.landlocked ? (
                      <FaCheck />
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        height="1em"
                        viewBox="0 0 384 512"
                      >
                        <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                      </svg>
                    )}
                  </dd>
                </div>
              )}
              {getBorderLands().length > 0 && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Land border neighbours
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    <div className="row">
                      {getBorderLands().map(({ name, flag }, key) => {
                        return (
                          <div key={key}>
                            <span className="flex">{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </dd>
                </div>
              )}
              {country.area && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Area
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {country.area} sq km
                  </dd>
                </div>
              )}
              {country.population && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Population
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                    {country.population}
                  </dd>
                </div>
              )}
              {(country.coatOfArms?.png || country.coatOfArms?.svg) && (
                <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                  <dt className="text-sm font-medium leading-6 text-gray-900">
                    Coat of arms
                  </dt>
                  <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0 w-32 pr-3">
                    <img
                      src={country.coatOfArms.png ?? country.coatOfArms.svg}
                      alt="coat of arms"
                    />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      ) : (
        <PageNotFound />
      )}
    </>
  );
}
