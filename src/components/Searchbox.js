import React, { Component } from 'react';
import DisplayResults from './DisplayResults';
import './style.css';
import recipeList from "./recipeList";

class Searchbox extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            data : [],
            error: "",
            searchKeyWords: [],
            currentSearch: "",
            showLoading: false
        }
        
        this.searchRef = React.createRef();
    }

    setLastFiveSearchWords = () => {
      if(this.state.searchKeyWords.indexOf(this.state.currentSearch) === -1)
      {
          const newArr = this.state.searchKeyWords.concat(this.state.currentSearch)
          this.setState({
              //searchKeyWords: [...this.state.searchKeyWords, this.state.currentSearch].slice(-5),
              searchKeyWords: newArr.slice(-5),
              currentSearch: ""
          });
      }
    }

    fetchResults = (e) => {

        e.preventDefault()

        if(this.state.currentSearch !== "")
        {
            this.setState({
                showLoading: true
            })

            let url = `https://api.edamam.com/search?app_id=8f735e99&app_key=a29ee0ab253b74369b34db87438541f6&to=10&q=${this.state.currentSearch}`;
            fetch(url).
                then(response => response.json()).then((result) => {

                    this.setState({
                        showLoading: false,
                        data: result
                    });

                    this.setLastFiveSearchWords()
                },
                (error) => {
                     this.setLastFiveSearchWords()
                     this.setState({
                        showLoading: false,
                        error: "Failed to fetch",
                        data: ""
                     })
                });

            // this.setState({
            //     showLoading: false,
            //     data: recipeList
            // });
            // this.setLastFiveSearchWords()

        } 
    }

    setCurrentSearch = (e) => {
        this.setState({
            currentSearch: e.target.value
        })
    }

    componentDidMount = () => {
        this.searchRef.current.focus();
    }

    render() {

        const {currentSearch, searchKeyWords, showLoading, error, data} = this.state

        return (
            <>
               <form onSubmit={this.fetchResults}>
                  <div className="searchBox">
                     <label htmlFor="search">
                        <input aria-labelledby="search" autoComplete="off" type="text" ref={this.searchRef} id="search" name="search" placeholder="Search" value={currentSearch} onChange={this.setCurrentSearch} />
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

               {data.hits !== undefined &&
               <div>
                  {data.q !== undefined && <h3 className="resultHead">Search Results for <span>{data.q}</span></h3>}

                  <DisplayResults data={data} />
               </div>}
            </>
        );
    }
}

export default Searchbox;