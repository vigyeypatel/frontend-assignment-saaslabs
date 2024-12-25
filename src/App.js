import './App.css';
import Table from './components/Table/Table'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { HEADERS , OFF_SET} from './utils/constants';

function App() {
    const [currentPage, setCurrentPage] = useState(1);
    const [usersData, setUsersData] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [inputValue, setInputValue] = useState(1);

    
    useEffect(() => {
      const fetchData = async () => {
        try {
          const axiosResponse = await axios.get("https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json");
          if(axiosResponse.data) {
            let data = axiosResponse.data;
            setUsersData(data);
            setTotalPages(Math.ceil(data.length/OFF_SET));
            setFilteredData([...data].splice(0,OFF_SET));
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };
      fetchData();
    }, []);



    const IncrementDecrement = (type) => {
      if(type === 'increment'){
          let page = currentPage + 1;
          setCurrentPage(page);
          setInputValue(page);
          setFilteredData([...usersData].slice(
            (page - 1) * OFF_SET,
            page * OFF_SET
          ));
        }
        else {
          let page = currentPage - 1;
          setCurrentPage(page);
          setInputValue(page);
          setFilteredData([...usersData].slice(
            (page - 1) * OFF_SET,
            page * OFF_SET
          ));
        }
    }


  return (
    <div className="App">
      <div className={"tableWrapper"}>
        <Table columns={HEADERS} data={filteredData} />
        
        <div className="Footer">
          <div className='pagination'>
        <button
            onClick={() => IncrementDecrement('decrement')}
            disabled={currentPage <=  1} // Disable the active page button
          >
            Prev
          </button>

        <input
          type="number"
          min={1}
          max={totalPages}
          className="page-input"
          placeholder="Go to page"
          value={inputValue}
          onChange={(e) => {
              if(!e.target.value){
                setInputValue('');
                return;
              }
              const page = Math.min(Math.max(Number(e.target.value), 1), totalPages) ;
              setFilteredData([...usersData].slice(
                      (page - 1) * OFF_SET,
                      page * OFF_SET
                    ));
              setCurrentPage(page);
              setInputValue(page);
          }}
        /> <span >/ {totalPages}</span>

         <button
            onClick={() => IncrementDecrement('increment')}
            disabled={currentPage >= totalPages} // Disable the active page button
          >
            Next
          </button>
          </div>
      </div>
      </div>
    </div>
  );
}

export default App;
