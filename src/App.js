import React, {Component} from 'react';
import axios from 'axios';
import './App.css';
import VideoPlayer from './components/VideoPlayer/VideoPlayer'
import SearchBar from './components/SearchBar/SearchBar'
import RelatedVideosPanel from './components/RelatedVideosPanel/RelatedVideosPanel';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      video: {
        videoId: '',
        title: ''
      },
      relatedVideos: {},
      searchVideos: {},
      backendData: {
        videoId: '',
        likes: 0,
        shares: 0,
        subscribers: 0
      }
    }
  }

  getBackendData = async (id) => {
    try {
      let response = await axios.get('http://127.0.01:8000/backendData/' + id + '/');
      this.setState({
        backendData: response.data
      });
    }catch(e) {
      console.log(e);
    }
  }

  postBackendData = async (data) => {
    let backendData = {
      videoId: data.id,
      likes: data.likes,
      shares: data.shares,
      subscribers: data.subscribers,
    }
    try {
      await axios.post('http://127.0.01:8000/backendData/', backendData);
      this.setState({
        backendData: backendData
      }, () => console.log(this.state.video))
    }catch(e) {
      console.log(e)
    }
  }

  searchVideo = async (query) => {
    try{
      let response1 = await axios.get('https://www.googleapis.com/youtube/v3/search?q='+ query + '&key=AIzaSyDJ2cLaQKQWQAHrs8vwmyWPWydjgMFztWY&maxResults=5');
      let response2 = await axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=' + response1.data.items[0].id.videoId + '&key=AIzaSyDJ2cLaQKQWQAHrs8vwmyWPWydjgMFztWY');
      let response3 = await axios.get('https://www.googleapis.com/youtube/v3/search?relatedToVideoId='+ response1.data.items[0].id.videoId  + '&type=video&key=AIzaSyDJ2cLaQKQWQAHrs8vwmyWPWydjgMFztWY');
      this.setState({  
        searchVideos: response1.data.items,
        video: {
          videoId: response1.data.items[0].id.videoId,
          title: response2.data.items[0].snippet.title
        },
        relatedVideos: response3.data.items,
      });
    }catch(e) {
      console.log(e);
    }
  }

  getRelatedVideos = async (id) => {
    try {
      let response = await axios.get('https://www.googleapis.com/youtube/v3/search?relatedToVideoId='+ id + '&type=video&key=AIzaSyDJ2cLaQKQWQAHrs8vwmyWPWydjgMFztWY');
      this.setState({
        relatedVideos: response.data
      })
    }catch(e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className="container-fluid">
        <br/>
        <div className="row">
          <div className="col-1"/>
          <div className="col-10">
            <SearchBar {...this.state} searchVideo={this.searchVideo}/>
          </div>
          <div className="col-1"/>
        </div>
        <br/>
        <div className="row">
          <div className="col-1"/>
          <div className="col-7">
            <VideoPlayer {...this.state}/>
          </div>
          <div className="col-3">
            <RelatedVideosPanel {...this.state} getRelatedVideos={this.getRelatedVideos}/>
          </div>
          <div className="col-1"/>
        </div>
      </div>
    )
  }
}

export default App;