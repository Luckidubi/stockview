import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import StockDetailPage from './pages/StockDetailPage'
import StockOverviewPage from './pages/StockOverviewPage'

function App() {


  return (
    <>
<Router>
  <Routes>
    <Route path="/" element={<StockOverviewPage/>}/>
    <Route path="/detail/:symbol" element={<StockDetailPage/>}/>
  </Routes>
</Router>
    </>
  )
}

export default App
