import React from "react";
import { Routes, Route} from "react-router-dom";
import Home from "./Home"
import User from "./User"
import Movie from "./Movie"

const Pages = () => {

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="user" element={<User />} />
                <Route path="movies/:movieID" element={<Movie />} />
                <Route path="movies" element={<Movie />} />
            </Routes>  
        </>
    )
}

export default Pages
