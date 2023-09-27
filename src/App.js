import { Route, Routes, HashRouter } from 'react-router-dom'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchAllCountries } from './features/countries/countrySlice'
import Detail from './components/Detail/Detail'
import Converter from './components/Converter/Card'
import { fetchCurrencyInfo, fetchCurrencyRates } from './features/currency/currencySlice'
import PageNotFound from './components/PageNotFound'

export default function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('hi');
    dispatch(fetchAllCountries())
      .then(() =>
        dispatch(fetchCurrencyInfo())
      ).then(() =>
        dispatch(fetchCurrencyRates())
      )
  }, [dispatch])

  return (
    <HashRouter>
      <div>
        <Header />
        <main>
          <div className="mx-auto max-w-7xl sm:py-6 sm:px-6 lg:px-8">
            <div className="relative isolate h-full">
              <Routes basename="#">
                <Route path="/" element={<Home/>}></Route>
                <Route path="country/:id/detail" element={<Detail/>}></Route>
                <Route path="converter" element={<Converter/>}></Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
            </div>
          </div>
        </main>
      </div>
    </HashRouter>
  )
}
