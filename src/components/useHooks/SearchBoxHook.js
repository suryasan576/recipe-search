import React, {useState, useRef, useEffect} from 'react';
import DisplayResults from '../DisplayResults';
import recipeList from "../recipeList";

function SearchBoxHook(props) {

    const [data, setData] = useState("");
    const [error, setError] = useState("");
    const [searchKeyWords, setSearchKeyWords] = useState([]);
    const [currentSearch, setCurrentSearch] = useState("");
    const [showLoading, setLoading] = useState(false);

    const inputRef = useRef(true);

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if(inputRef.current.value !== '')
        {
            fetchResults();
        }
    }

   const setLastFiveSearchWords = () => {
      if(searchKeyWords.indexOf(currentSearch) === -1)
      {
         const newArr = searchKeyWords.concat(currentSearch)
         setSearchKeyWords(newArr.slice(-5));
         setCurrentSearch("");
      }
    }

    const fetchResults = () => {

        setLoading(true);

        let url = `https://api.edamam.com/search?app_id=8f735e99&app_key=a29ee0ab253b74369b34db87438541f6&to=10&q=${currentSearch}`;
        fetch(url).
            then(response => response.json()).then((result) => {
               setLoading(false)
               setData(result)
               setLastFiveSearchWords()
            },
            (error) => {
               setLastFiveSearchWords()
               setError("Failed to fetch")
               setLoading(false)
               setData("")
            });

      //    setLoading(false)
      //    setData(recipeList)
      //    setLastFiveSearchWords()

    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="searchBox">
                    <label htmlFor="search">
                        <input aria-labelledby="search" autoComplete="off" type="text" id="search" name="search" ref={inputRef} placeholder="Search" value={currentSearch} onChange={(e) => setCurrentSearch(e.target.value)} />
                    </label>
                    <label htmlFor="searchBtn">
                        <button aria-labelledby="searchBtn" id="searchBtn">Search</button>
                    </label>
                </div>
            </form>

            {showLoading && <div> Loading... </div>}

            {searchKeyWords.length > 0 && 
            <div className="searchKeys"><span> Last 5 Search Keywords: </span> {searchKeyWords.join(", ")}</div>}

            {(error !== "") && <div className="error"> Failed to fetch </div>}

            {data.hits !== undefined && <div>

            {data.q !== undefined && <h3 className="resultHead">Search Results for <span>{data.q}</span></h3>}

            <DisplayResults data={data} /></div>}
        </>
    );
}

export default SearchBoxHook;