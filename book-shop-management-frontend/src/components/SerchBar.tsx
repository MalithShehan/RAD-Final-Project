

const SearchBar = (props,children) => {

    return (
        <div className="container mx-auto mt-5">
            <div className="flex justify-between mb-3">
                <div className="w-1/2">
                    <form className="flex">
                        <input
                            className="form-control me-2 border rounded p-2"
                            type="search"
                            placeholder="Search customer"
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
                            Search
                        </button>
                    </form>
                    {/*<ul id="suggestions" className="mt-2">*/}
                    {/*    {props.suggestions.map((suggestion, index) => (*/}
                    {/*        <li key={index} className="border-b p-2">{suggestion}</li>*/}
                    {/*    ))}*/}
                    {/*</ul>*/}
                </div>
                <div className="w-1/2 text-right">
                    <button
                        className="btn btn-outline-success border rounded p-2 mr-2"
                        onClick={props.handleModal1}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchBar;