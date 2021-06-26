import React from 'react';

const SearchBar = ({search, text, ...props}) => {
    return(
        <div className="row justify-content-center mt-5 mb-5">
            <form action="#" className="row justify-content-center mx-5 mx-md-0">
                <h1 className="mb-md-4 font-weight-bolder">WeBlog filter</h1>
                <input className="form-control f mx-2 mx-md-auto col-md-8 align-self-center h-auto" type="text" placeholder={text} onChange={search} />
                <input className="btn btn-primary col-md-4 align-self-center mx-5 mx-md-0 mt-3 mt-md-0" type="submit" value="Filter" onClick={e=>e.preventDefault()} />
            </form>
        </div>
    )
}

export default SearchBar;