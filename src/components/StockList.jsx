import React from "react";
import { useState, useEffect } from "react";
import finnHub from "../apis/finnHub";
import { BsFillCaretDownFill, BsFillCaretUpFill,BsFillTrash3Fill} from "react-icons/bs";
import { useWatchList } from "../context/WatchListProvider";
import { useNavigate } from "react-router-dom";
function StockList() {
  const [stock, setStock] = useState();
  const { watchList, deleteStock } = useWatchList();
  const navigate = useNavigate();

  const changeColor = (change) => {
    return change > 0 ? "success" : "danger";
  };

  const renderIcon = (change) => {
    return change > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

  const handleStockSelect = (symbol) => {
    navigate(`detail/${symbol}`);
  };
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnHub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        console.log(responses);
        const data = responses.map((response) => {
          return {
            data: response.data,
            symbol: response.config.params.symbol,
          };
        });
        if (isMounted) {
          setStock(data);
          console.log(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [watchList]);

  return (
    <div>

      <table className="table hover mt-5">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Chg</th>
            <th scope="col">Chg%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stock?.map((stockData) => {
            return (
              <tr
                style={{ cursor: "pointer" }}
                onClick={() => handleStockSelect(stockData.symbol)}
                className="table-row"
                key={stockData.symbol}
              >
                <th scope="row">{stockData.symbol}</th>
                <td>{stockData.data.c}</td>
                <td className={`text-${changeColor(stockData.data.d)}`}>
                  {stockData.data.d}
                  {renderIcon(stockData.data.d)}
                </td>
                <td className={`text-${changeColor(stockData.data.dp)}`}>
                  {stockData.data.dp}
                  {renderIcon(stockData.data.dp)}
                </td>
                <td>{stockData.data.h}</td>
                <td>{stockData.data.l}</td>
                <td>{stockData.data.o}</td>
                <td>{stockData.data.pc} {" "}
                <button className="btn btn-danger btn-sm ml-3 delete-button" onClick={(e)=>{
                  e.stopPropagation()
                  deleteStock(stockData.symbol)
                }}>< BsFillTrash3Fill/></button>
                </td>


              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
