import React from 'react';
import './VideoPlayer.css';


const VideoPlayer = (props) => {
    let videoId = props.searchVideos.items[0].id.videoId;
    let url = "https://www.youtube.com/embed/" + videoId;
    let backendData = props.backendData
    // props.getVideo(videoId);
    // props.getRelatedVideos(videoId);
    // props.getBackendData(videoId);
    return (
        <div>
            <div className="container">
                <iframe className="video"allowFullScreen src={url} frameBorder="0"></iframe>
            </div>
            <br/>
            <ul className="nav bg-primary">
                <li className="nav-item">
                    <span className="nav-link text-white h5">{props.video.items[0].snippet.title}</span>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light">Like</button><span className="p-2 text-white">{backendData.likes}</span>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light">Share</button><span className="p-2 text-white">{backendData.shares}</span>
                </li>
                <li className="nav-item">
                    <button className="btn btn-light">Subscribe</button><span className="p-2 text-white">{backendData.subscribers}</span>
                </li>
            </ul> 
        </div>
    )
}

export default VideoPlayer;