import React from 'react'
//components
import SvgComponent from './ReverseSvg'
//styles
import './ReverseButton.css'
import { useDispatch, useSelector } from 'react-redux'
import { getFromCurrency, getToCurrency, setFromCurrency, setToCurrency } from '../../../../features/currency/currencySlice'

export default function ReverseButton() {
  const dispatch = useDispatch()
  const toCurrency = useSelector(getToCurrency)
  const fromCurrency = useSelector(getFromCurrency)

  function handleReverseClick() {
    const temporaryFromCode = fromCurrency
    dispatch(setFromCurrency(toCurrency))
    dispatch(setToCurrency(temporaryFromCode))
  }

  return (
    <>
      <label className='invisible' htmlFor='reverse'>Reverse</label>
      <button id='reverse' className='reverse self-center' onClick={handleReverseClick}>
        <SvgComponent className='reverse-svg' width='30px' />
      </button>
    </>
  )
}
