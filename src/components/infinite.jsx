import React, { Component } from "react";
import ReactDOM from "react-dom";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";
const masonryOptions = {
  transitionDuration: 0
};

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
    this.subLoadFunc = this.subLoadFunc.bind(this);
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

  subLoadFunc() {
    const batch = 20;

    const tracks = this.state.tracks;
    const hasMoreItems =
      this.state.loadTimes * (batch + 1) < this.state.images.length;
    const addItem = this.state.images.slice(
      this.state.loadTimes * batch,
      hasMoreItems
        ? this.state.loadTimes * (batch + 1)
        : this.state.images.length
    );

    addItem.map(item => {
      tracks.push(item);
    });

    this.setState({
      tracks: tracks,
      hasMoreItems: hasMoreItems,
      loadTimes: this.state.loadTimes+1
    },console.log(this.state.loadTimes)
    );
  }
  
  loadFunc() {
    if (this.state.loadTimes === 0) {
      console.log("this.state.loadTimes", this.state.loadTimes);
      const single = {
        thumbnail:
          "https://github.com/Combo819/myPhotoBlog/blob/master/images/waterfall/DSC_1579.jpg?raw=true",
        afterUrl:
          "https://github.com/Combo819/myPhotoBlog/blob/master/images/waterfall/DSC_3362.jpg?raw=true",
        beforeUrl:
          "https://github.com/Combo819/myPhotoBlog/blob/master/images/waterfall/DSC_3565.jpg?raw=true",
        uploadTime: null
      };
      const images = [];
      for (let i = 0; i < 100; i++) {
        images.push(single);
      }
      this.setState({ images: images }, this.subLoadFunc);
    }else{
      this.subLoadFunc()
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
