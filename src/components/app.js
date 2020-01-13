import React, { Component } from 'react';
import * as firebase from "firebase/app";
import 'firebase/database';

console.log("👋");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      isOpen: true,
      activeVideo: 1,
    };
    window.jwplayer.key = '7AIKxuLP';
    this.handleUpdate = this.handleUpdate.bind(this);
    this.time = this.time.bind(this);
    this.toggleVideo = this.toggleVideo.bind(this);
  }

  componentDidMount() {
    window.jwplayer('vidya').setup({
      'playlist': [{
        'sources': [
          {
            'file': 'https://s19.us-east-1.skyvdn.com/rtplive/60027/playlist.m3u8'
          },
        ]
      }],
      'autostart': true,
      'mute': true,
      'width': 480,
      'height': 320,
      'controls': false,
    });

    const firebaseConfig = {
      authDomain: "bridge-1575994869243.firebaseapp.com",
      databaseURL: "https://bridge-1575994869243.firebaseio.com",
      projectId: "bridge-1575994869243",
      storageBucket: "bridge-1575994869243.appspot.com",
      messagingSenderId: "679922957303",
      appId: "1:679922957303:web:aef2b917c7b48897900cf2",
      measurementId: "G-J1TY0DJF96"
    };
    firebase.initializeApp(firebaseConfig);
    const statusRef = firebase.database().ref('status').limitToLast(1); // eslint-disable-line
    statusRef.on('value', this.handleUpdate);
  }

  toggleVideo(idx) {
    const urls = [
      'https://s18.us-east-1.skyvdn.com/rtplive/60026/playlist.m3u8',
      'https://s19.us-east-1.skyvdn.com/rtplive/60027/playlist.m3u8',
      'https://s20.us-east-1.skyvdn.com/rtplive/60028/playlist.m3u8',
      'https://s18.us-east-1.skyvdn.com/rtplive/60029/playlist.m3u8',
    ];

    window.jwplayer('vidya').setup({
      'playlist': [{
        'sources': [
          {
            'file': urls[idx]
          },
        ]
      }],
      'autostart': true,
      'mute': true,
      'width': 480,
      'height': 330,
      'controls': false,
    });
    this.setState({ activeVideo: idx });
  }

  time(date) {
    let dd = date.getDate();
    let mm = date.getMonth() + 1; // January is 0!

    const yyyy = date.getFullYear();
    if (dd < 10) {
      dd = `0${dd}`;
    }
    if (mm < 10) {
      mm = `0${mm}`;
    }
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours %= 12;
    hours = hours || 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    const strTime = `${mm}/${dd}/${yyyy} at ${hours}:${minutes} ${ampm}`;
    return strTime;
  }

  handleUpdate(snapshot) {
    const data = Object.values(snapshot.val())[0];
    const status = data.status.replace("= ", "");
    // if data.status contains all lns blkd or all lns clsd, set open to false
    const isOpen = !data.status.includes('all lns blkd') || data.status.includes('all lns clsd');
    this.setState({
      isOpen,
      status,
      updatedAt: this.time(new Date(data.createdOn)),
    });
  }

  render() {
    return (
      <div className="page-wrapper">
        <div className="header">
          <div><div className="live"><i /><p>LIVE</p></div></div>
          <div>
            <h3>The Don Holt Bridge is {this.state.isOpen ? 'Open' : 'Closed'}</h3>
            {this.state.updatedAt ? <div className="timestamp">Updated: {this.state.updatedAt}</div> : <div className="timestamp">Checking...</div>}
          </div>
        </div>
        <div className="video-section">
          <div className="video-wrapper">
            <div id="vidya" />
            <div className="video-frame" />
          </div>
          <div>
            <div className="underline">Traffic Cameras</div>
            <div className="video-links">
              <div role="button" onClick={() => { this.toggleVideo(0); }}><i className={this.state.activeVideo === 0 ? 'active' : ''} />East Bound Heading Up</div>
              <div role="button" onClick={() => { this.toggleVideo(1); }}><i className={this.state.activeVideo === 1 ? 'active' : ''} />Top of the Bridge</div>
              <div role="button" onClick={() => { this.toggleVideo(2); }}><i className={this.state.activeVideo === 2 ? 'active' : ''} />West Bound Heading Up</div>
              <div role="button" onClick={() => { this.toggleVideo(3); }}><i className={this.state.activeVideo === 3 ? 'active' : ''} />View towards Clements Ferry</div>
            </div>
          </div>
        </div>
        <div className="status">{this.state.status}</div>
        <div className="footer">This site is just for fun. Don't be a <a rel="noopener noreferrer" target="_blank" href="http://yading.us/">dingus...</a> Check <a rel="noopener noreferrer" target="_blank" href="http://511sc.org/">511sc.org</a> for official road conditions.</div>
      </div>
    );
  }
}

export default App;
