import React from 'react';
import './VideoPlayer.css';

const VideoPlayer = (props) => {
    return (
        <div>
            <iframe id="ytplayer" type="text/html" width="640" height="360" src="https://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com" frameborder="0"></iframe>
        </div>
    )
}

export default VideoPlayer;