import React, { useState } from "react";
import { Search, Plus, Trash2, RefreshCcw } from "react-feather";

function NavBar(props) {

    const [searchValue, setSearchValue] = useState("");

    const deleteAll = () => {
        const pass = window.confirm("Are you sure you want to delete all the notes?");
        if(!pass) {
            return;
        }
        localStorage.removeItem("myNotes");
        // window.location.reload();
        props.refresh();
    }

    const sorter = (value) =>{
        if(value === 'latest'){  // descending order according to id
            props.data.sort((a,b)=>b.id - a.id)
        }
        if(value === 'oldest'){  // ascending order according to id
            props.data.sort((a,b)=>a.id - b.id)
        }
        if(value === 'high'){  // "high" comes before "normal"
            props.data.sort((a,b)=>a.priority.localeCompare(b.priority))
        } 
        if(value === 'normal'){  // "normal" comes after "high"
            props.data.sort((a,b)=>b.priority.localeCompare(a.priority))
        } 
        props.setData([...props.data]);
    }

    function handleSearch(event) {
        event.preventDefault();
        let newData;
        if(searchValue) {
            newData = props.data.filter((dataItem) => dataItem.title.toLowerCase().includes(searchValue.toLowerCase()));
            props.setData([...newData]);
        } else {
            // window.location.reload();
            props.refresh();
        }
    }

    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <a className="navbar-brand" href="#">My Notes</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon" />
                </button>
                <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        
                        
                        <li className="nav-item dropdown my-3">
                            <a className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Sort By:
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" onClick={() => sorter("latest")}>Latest First</a></li>
                                <li><a className="dropdown-item" onClick={() => sorter("oldest")}>Oldest First</a></li>
                                <li><a className="dropdown-item" onClick={() => sorter("high")}>High Priority</a></li>
                                <li><a className="dropdown-item" onClick={() => sorter("normal")}>Normal Priority</a></li>
                            </ul>
                        </li>

                        <li className="nav-item mx-2">
                            <button type="button" className="btn btn-sm btn-info text-light px-2 my-3" onClick={() => props.setShowModal(true)}><Plus /> Add New</button>
                        </li>
                        <li className="nav-item mx-2">
                            <button type="button" className="btn btn-sm btn-danger text-light px-2 my-3" onClick={deleteAll}><Trash2 /> Delete All</button>
                        </li>
                    </ul>
                    <form className="d-flex" role="search" onSubmit={handleSearch}>
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" onChange={(e) => setSearchValue(e.target.value)} />
                        <button className="btn btn-outline-success" type="submit">{searchValue ? <Search /> : <RefreshCcw />}</button>
                    </form>
                </div>
            </div>
        </nav>

    );
}

export default NavBar;