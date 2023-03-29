import React, { useEffect, useState } from 'react'
import finnHub from '../apis/finnHub'
import { useWatchList } from '../context/WatchListProvider'

function AutoComplete() {
    const [search, setSearch] = useState('')
    const [results, setResults] = useState([])
    const {addStock} = useWatchList()

    const renderDropdown = () => {
        const dropDownClass = search ? "show" : ""
        return (
        <ul style={{
            height: "500px",
            overflowY: "scroll",
            overflowX:"hidden",
            cursor: "pointer"
        }} className= {`dropdown-menu ${dropDownClass}`}>
{results.map((result)=>{
    return(
        <li onClick={()=>{
            addStock(result.symbol)
            setSearch("")
        }
        } className='dropdown-item' key={result.symbol}>{result.description} ({result.symbol})</li>
    )
})}
        </ul>
    )
      }
    useEffect(()=>{
        let isMounted = true
        const fetchData = async ()=>{
            try {
                const response = await finnHub.get("/search",{
                    params: {
                        q: search
                    }
                })

                if (isMounted){
                    setResults(response.data.result)
                }
            } catch (error) {
console.log(error)
            }
        }
        if(search?.length > 0){
            fetchData()
        } else{
            setResults([])
        }
        return ()=>{
            isMounted = false
        }
    }, [search])
  return (
    <div className='w-50 my-5 p-6 rounded mx-auto'>
<div className="form-floating dropdown">
<input style={{backgroundColor:"rgba(145,158,171,0.04)"}} id="search"
type="text" value={search} onChange={(e)=>setSearch(e.target.value)} className='form-control ' placeholder='Search' autoComplete='off'/>
<label htmlFor='search'>Search</label>
{renderDropdown()}
</div>
    </div>
  )
}

export default AutoComplete