import React from 'react'
import AutoComplete from '../components/AutoComplete'
import Header from '../components/Header'
import StockList from '../components/StockList'

function StockOverviewPage() {
  return (
    <div className='container'>
<Header/>
      <AutoComplete/>
      <StockList/>

      </div>
  )
}

export default StockOverviewPage