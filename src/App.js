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
        items: [{
          snippet: {
            title: '',
          }
        }]
      },
      relatedVideos: [],
      searchVideos: {
        items: [{
          id: {
            videoId: 'BYQ8S5xtY68'
          }
        }]
      },
      backendData: {
        videoId: '',
        likes: 0,
        shares: 0,
        subscribers: 0
      }
    }
  }

  componentDidMount(id){
    this.getVideo(id);
    this.getRelatedVideos(id)
    this.getBackendData(id)
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

  postBackendData = async (id) => {
    let backendData = {
      videoId: id,
      likes: id.likes,
      shares: id.shares,
      subscribers: id.subscribers,
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

  getVideo = async (id) => {
    try {
      let response = await axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=AIzaSyApXq1CgVYea3-urVi3V-iIFvUEHMHo-k8');
      this.setState({
        video: response.data
      });
    }catch(e) {
      console.log(e);
    }
  }

  searchVideo = async (query) => {
    try{
      let response = await axios.get('https://www.googleapis.com/youtube/v3/search?q='+ query + '&key=AIzaSyApXq1CgVYea3-urVi3V-iIFvUEHMHo-k8');
      this.setState({  
        searchVideos: response.data
      });
    }catch(e) {
      console.log(e);
    }
  }

  getRelatedVideos = async (id) => {
    try {
      let response = await axios.get('https://www.googleapis.com/youtube/v3/search?relatedToVideoId='+ id + '&type=video&key=AIzaSyApXq1CgVYea3-urVi3V-iIFvUEHMHo-k8');
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
            <SearchBar searchVideo={this.searchVideo}/>
          </div>
          <div className="col-1"/>
        </div>
        <br/>
        <div className="row">
          <div className="col-1"/>
          <div className="col-7">
            <VideoPlayer {...this.state} getRelatedVideos={this.getRelatedVideos} getVideo={this.getVideo} getBackendData={this.getBackendData}/>
          </div>
          <div className="col-4">
            <RelatedVideosPanel getRelatedVideos={this.getRelatedVideos}/>
          </div>
        </div>
      </div>
    )
  }
}

export default App;