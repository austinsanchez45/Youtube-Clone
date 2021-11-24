import React from 'react';
import './SearchBar.css';

const SearchBar = (props) => {
    return (
        <nav className="navbar navbar-expend-md navbar-dark bg-primary">
            <div className="container-fluid">
                <div className="col-4">
                    <span className="navbar-brand h1">Home</span>
                </div>
                <div className="col-4">
                    <div className="input-group">
                        <input type="search" className="form-control" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-light" type="submit">Search</button>
                    </div>
                </div>
                <div className="col-4">
                    <div className="text-end"><span className="navbar-brand h1 text-end">Account</span></div>
                </div>
            </div>
        </nav>
    )
}

export default SearchBar;