import React,{useState, useEffect} from 'react';
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

function Banner() {
    const [movie,setMovie] = useState([]);

    useEffect(()=>{
        async function fetchData(){
            const request= await axios.get(requests.fetchNetflixOriginals);
            setMovie(
                request.data.results[
                    Math.floor(Math.random()*request.data.results.length-1)
                ]
            );
            return request;
        }
        fetchData();
    },[]);

    const truncate = (input,n) => (input?.length > n ? `${input.substring(0, n)} ...` : input);

    return (
        <header className="banner"
        style={{
            backgroundSize:"cover",
            backgroundImage:`url(
                "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
                )`,
            backgroundPosition:'center center'
        }}>
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.name || movie?.title || movie?.original_name}
                </h1>
                <button className="banner_button">Play</button>
                <button className="banner_button">My List</button>
                <div className="banner_description">
                    {truncate(movie?.overview,300)}
                </div>
                
            </div>
            <div className="fade--bottom" />
        </header>
    )
}

export default Banner
