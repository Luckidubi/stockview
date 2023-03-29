import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import { WatchListProvider } from './context/WatchListProvider'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'

function App() {


  return (
    <>
    <WatchListProvider>

<Router>
  <Routes>
    <Route path="/" element={<StockOverviewPage/>}/>
    <Route path="/detail/:symbol" element={<StockDetailPage/>}/>
  </Routes>
</Router>
    </WatchListProvider>
    </>
  )
}

export default App
