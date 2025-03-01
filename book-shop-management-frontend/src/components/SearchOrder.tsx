const SearchOrder= (props,children)=>{
    return(
        <>
            <div className="container mx-auto mt-5">
                <div className="flex justify-between mb-3">
                    <div className="w-1/2">
                        <form className="flex">
                            <input
                                className="form-control me-2 border rounded p-2"
                                type="search"
                                placeholder="Search Here"
                                aria-label="Search"
                                id="searchBar"
                                onChange={(e) => props.setSearchTerm(e.target.value)}
                            />
                            <button
                                className="btn btn-outline-primary border rounded p-2"
                                type="button"
                                id="searchButton"
                                onClick={props.handleSearch}
                            >
                                {props.children}
                            </button>
                        </form>
                        {/*<ul id="suggestions" className="mt-2">
                            {props.suggestions.map((suggestion, index) => (
                                <li key={index} className="border-b p-2">{suggestion}</li>
                            ))}
                        </ul>*/}
                    </div>
                </div>
            </div>
                </>
    )
}
export default SearchOrder;