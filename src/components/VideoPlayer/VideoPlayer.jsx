import React from 'react';
import './VideoPlayer.css';

//add video description under nav
const VideoPlayer = (props) => {
    let url = "https://www.youtube.com/embed/" + props.video.videoId;
    return (
        <div>
            <div className="container">
                <iframe className="video"allowFullScreen src={url} frameBorder="0"></iframe>
            </div>
            <br/>
            <ul className="nav bg-primary">
                <li className="nav-item">
                    <span className="nav-link text-white h5">{props.video.title}</span>
                </li>
                <li className="nav-item">
                    <div className="p-2"><button className="btn btn-light btn-sm btn-outline-secondary">Like</button><span className="p-2 text-white">{props.backendData.likes}</span></div>
                </li>
                <li className="nav-item">
                    <div className="p-2"><button className="btn btn-light btn-sm btn-outline-secondary">Share</button><span className="p-2 text-white">{props.backendData.shares}</span></div>
                </li>
                <li className="nav-item">
                    <div className="p-2"><button className="btn btn-light btn-sm btn-outline-secondary">Subscribe</button><span className="p-2 text-white">{props.backendData.subscribers}</span></div>
                </li>
            </ul> 
        </div>
    )
}

export default VideoPlayer;