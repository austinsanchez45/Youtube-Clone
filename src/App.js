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
      comments: [],
      videos: [],
      relatedVideos: []
    }
  }

  componentDidMount(){
    this.getComments();
  }

  getComments = async (id) => {
    try {
      let response = await axios.get('http://127.0.01:8000/comments/' + id + '/');
      this.setState({
        comments: response.data
      });
    }catch(e) {
      console.log(e);
    }
  }

  getVideo = async (id) => {
    try {
      let response = await axios.get('https://youtube.googleapis.com/youtube/v3/videos?part=snippet&id=' + id + '&key=AIzaSyApXq1CgVYea3-urVi3V-iIFvUEHMHo-k8');
      this.setState({
        videos: response.data
      });
    }catch(e) {
      console.log(e);
    }
  }

  searchVideo = async (query) => {
    try{
      let response = await axios.get('https://www.googleapis.com/youtube/v3/search?q='+ query + '&key=AIzaSyApXq1CgVYea3-urVi3V-iIFvUEHMHo-k8');
      this.setState({  
        videos: response.data
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
        <VideoPlayer getVideo={this.getVideo}/>
        <RelatedVideosPanel getRelatedVideos={this.getRelatedVideos}/>
      </div>
    )
  }
}

export default App;