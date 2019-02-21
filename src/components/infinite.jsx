import React, { Component } from "react";
import ReactDOM from "react-dom";
import InfiniteScroll from "react-infinite-scroller";
import Masonry from "react-masonry-component";
import { Modal, Row, Col, message } from "antd";
const masonryOptions = {
  transitionDuration: 0
};
const axios = require("axios");
const imagesLoadedOptions = { background: ".my-bg-image-el" };
const localUrl = "http://127.0.0.1:5000";
const aliyunUrl = "http://47.94.197.249:80";
const awsUrl='http://54.162.242.198:5000'
const baseUrl=awsUrl
class Infinite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [],
      tracks: [],
      hasMoreItems: true,
      loadTimes: 0,
      beforeUrl: "",
      afterUrl: "",
      uploadTime: "",
      compareVisible: false
    };
    this.loadFunc = this.loadFunc.bind(this);
    this.picCompare = this.picCompare.bind(this);
    this.setModal2Visible = this.setModal2Visible.bind(this);
  }

  componentWillMount() {
    axios({
      url: baseUrl + "/loadimage",
      method: "get",
      //set true if not deployed with back end in the same server
      withCredentials: true
    })
      .then(res => {
        console.log(res.data.images.length);

        if (!res.data.images.length) {
          this.props.setNoData(true);
        } else {
          this.props.setNoData(false);
          this.setState({ images: res.data.images });
        }
      })
      .catch(err => {
        console.log(err);
        message.error("Error Network");
        this.props.setNoData(true);
      });
  }
  picCompare(uploadTime, beforeUrl, afterUrl, e) {
    this.setState(
      {
        beforeUrl,
        afterUrl,
        uploadTime
      },
      () => {
        this.setState({
          compareVisible: true
        });
      }
    );
  }
  setModal2Visible(visibility) {
    this.setState({
      compareVisible: visibility
    });
  }


  loadFunc() {
    if (this.state.images.length) {
      const batch = 5;
      const tracks = this.state.tracks;
      const hasMoreItems =
        this.state.loadTimes * (batch + 1) < this.state.images.length;
      console.log("this.state.images", this.state.images);

      const addItem = this.state.images.slice(
        this.state.loadTimes * batch,
        hasMoreItems
          ? this.state.loadTimes * batch + batch
          : this.state.images.length
      );
      addItem.map(item => {
        tracks.push(item);
      });

      this.setState({
        tracks: tracks,
        hasMoreItems: hasMoreItems,
        loadTimes: this.state.loadTimes + 1
      });
    }
  }
  render() {
    console.log('render');
    
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
          <img
            onClick={e =>
              this.picCompare(
                track.uploadTime,
                track.beforeUrl,
                track.afterUrl,
                e
              )
            }
            src={baseUrl+'/'+track.thumbnail}
            width="300"
          />
        </div>
      );
    });

    return (
      <div>
        <Modal
          title={"upload:" + this.state.uploadTime}
          centered
          visible={this.state.compareVisible}
          footer={null}
          onOk={() => this.setModal2Visible(false)}
          onCancel={() => this.setModal2Visible(false)}
          width={1000}
        >
          <Row type="flex" justify="center">
            <Col style={{ position: "relative" }} lg={12}>
              <h2 style={{ textAlign: "center" }}>Before</h2>
              <img
                style={{
                  position: "relative",
                  left: "50%",
                  marginLeft: "-200px"
                }}
                width={400}
                src={baseUrl+'/'+this.state.beforeUrl}
              />
            </Col>
            <Col style={{ position: "relative" }} lg={12}>
              <h2 style={{ textAlign: "center" }}>After</h2>
              <img
                style={{
                  position: "relative",
                  left: "50%",
                  marginLeft: "-200px"
                }}
                width={400}
                src={baseUrl+'/'+this.state.afterUrl}
              />
            </Col>
          </Row>
        </Modal>
        <InfiniteScroll
          pageStart={0}
          loadMore={this.loadFunc}
          hasMore={this.state.hasMoreItems}
          loader={loader}
          threshold={20}
          //initialLoad={true}
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
      </div>
    );
  }
}

export default Infinite;
