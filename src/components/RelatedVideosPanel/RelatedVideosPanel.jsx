import React, {useState} from 'react';
import Parser from 'html-react-parser';
import './RelatedVideosPanel.css';

//add related and search videos and their thumbnails to the panel
const tabContent = (toggle) => {
    let videos = "";
    if (toggle === 1) {
        videos = "<div>1</div><div>2</div><div>3</div><div>4</div><div>5</div></div>"     
    } else {
        videos = "<div>Hello World</div>"   
    }
    return (
        <div className="content">{Parser(videos)}</div>
    );
}


const RelatedVideosPanel = (props) => {
    const [toggle, setToggle]=useState(1)
    return (
        <div className="container">
            <div className="nav nav-tabs" role="tablist">
                <button className={toggle === 1 ? "nav-link active" : "nav-link"} onClick={() => setToggle(1)}>Search</button>
                <button className={toggle === 2 ? "nav-link active" : "nav-link"} onClick={() => setToggle(2)}>Related</button>
            </div>
            <div className="tab-content">
                <div className={toggle === 1 ? "tab-pane fade show active" : "nav-link"}>{tabContent(toggle)}
                </div>
                <div className={toggle === 2 ? "tab-pane fade show active" : "nav-link"}>
                </div>
            </div>
        </div>
    )
}

export default RelatedVideosPanel;