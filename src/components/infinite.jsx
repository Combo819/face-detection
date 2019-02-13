import React, { Component } from "react";
import ReactDOM from "react-dom";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";
const masonryOptions = {
  transitionDuration: 0
};
const axios = require("axios");
const imagesLoadedOptions = { background: ".my-bg-image-el" };
class Infinite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      tracks: [],
      hasMoreItems: true,
      loadTimes: 0
    };
    this.loadFunc = this.loadFunc.bind(this);
  }
  /*
  loadFunc(page) {
    const tracks = this.state.tracks;
    for (let i = 0; i < 8; i++) {
      tracks.push({ artwork_url: "url" });
    }
    //this.state.tracks.push(i) is useless, although you can still console log the new state. You must use this.setState afterward.

    this.setState({
      tracks: tracks
    });
  }
  */

  componentWillMount() {
    axios({
      url: "http://127.0.0.1:5000/loadimage",
      method: "get",
      //set true if not deployed with back end in the same server
      withCredentials: true
    })
      .then(res => {
        this.setState({ images: res.data.images });
      })
      .catch(err => console.log(err));
  }

  loadFunc() {
    if (this.state.images.length) {
      const batch = 5;
      const tracks = this.state.tracks;
      const hasMoreItems =
        this.state.loadTimes * (batch + 1) < this.state.images.length;
        console.log('this.state.images',this.state.images);
        
      const addItem = this.state.images.slice(
        this.state.loadTimes * batch,
        hasMoreItems
          ? this.state.loadTimes * batch + batch
          : this.state.images.length
      );
      console.log('addItem',addItem,'this.state.images.length',this.state.images.length);
      
      addItem.map(item => {
        tracks.push(item);
      });

      this.setState({
        tracks: tracks,
        hasMoreItems: hasMoreItems,
        loadTimes: this.state.loadTimes + 1
      });
      console.log('tracks',tracks);
      console.log('hasMoreItems',hasMoreItems);
    }
  }
  render() {
    const loader = <div className="loader">Loading ...</div>;
    var items = [];
    this.state.tracks.map((track, i) => {
      items.push(
        <div
          style={{
            width: "300px",
            border: "1px solid black",
            margin: "5px"
          }}
          className="track"
          key={i}
        >
        <h2>{track.uploadTime}</h2>
          <img src={track.thumbnail} width="300" />
        </div>
      );
    });

    return (
      <InfiniteScroll
        pageStart={0}
        loadMore={this.loadFunc}
        hasMore={this.state.hasMoreItems}
        loader={loader}
        threshold={0}
      >
        <div className="tracks">
          <Masonry
            className={"my-gallery-class"} // default ''
            elementType={"ul"} // default 'div'
            options={masonryOptions} // default {}
            disableImagesLoaded={false} // default false
            updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
            imagesLoadedOptions={imagesLoadedOptions} // default {}
          >
            {items}
          </Masonry>
        </div>
      </InfiniteScroll>
    );
  }
}

export default Infinite;
