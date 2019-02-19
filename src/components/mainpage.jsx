import React from "react";
import history from "../history";
import { Row, Col, Empty, Divider, Upload, message, Icon } from "antd";
import Masonry from "./masonry";
import Infinite from "./infinite";
const Dragger = Upload.Dragger;
const axios = require("axios");
const localUrl = "http://127.0.0.1:5000";
const aliyunUrl = "http://47.94.197.249:80";
const baseUrl = localUrl;
const uploadProps = {
  name: "file",
  multiple: false,
  action: baseUrl + "/upload",
  onChange(info) {
    const status = info.file.status;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  }
};
class Mainpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noData: false,
      marginBottom: "30px"
    };
    this.setNoData = this.setNoData.bind(this);
    this.uploadMargin = this.uploadMargin.bind(this);
    this.uploadChange=this.uploadChange.bind(this)
  }
  componentWillMount() {
    axios({
      url: baseUrl + "/home",
      method: "get",
      //set true if not deployed with back end in the same server
      withCredentials: true
    })
      .then(res => {
        console.log("res.data", res.data);
        if (res.data.login) {
          //message.success('Welcome Back')
        } else {
          history.push("/homepage");
        }
      })
      .catch(err => {
        console.log(err);
        //history.push("/homepage");
      });
  }
  setNoData(noData) {
    console.log("noData", noData);

    this.setState({
      noData
    });
  }
  uploadMargin(fileList) {
    const marginBottom = fileList.length * 20 + 30 + "px";
    this.setState({ marginBottom });
  }
  uploadChange(e){
    if(e.file.status==='done'){
      setTimeout(() => {
        window.location.replace(baseUrl + '/mainpage')
      }, 1500);
      
    }
  }

  render() {
    return (
      <div>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "30px", marginBottom: this.state.marginBottom }}
        >
          <Col lg={8}>
            <Dragger
              beforeUpload={(file, fileList) => this.uploadMargin(fileList)}
              {...uploadProps}
              onChange={e=>this.uploadChange(e)}
              withCredentials={true}
            >
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Only .jpg, .png, jpeg, .bmp supported. Maximum size: 4MB
              </p>
            </Dragger>
          </Col>
        </Row>
        <Row type="flex" justify="center">
          <Col lg={18}>
            <Divider>
              <h2>Your Gallry</h2>
            </Divider>
          </Col>
        </Row>
        {this.state.noData ? (
          <Row type="flex" justify="center" style={{ marginTop: "35px" }}>
            <Col>
              <Empty description={<span>No Data</span>} />
            </Col>
          </Row>
        ) : (
          <Infinite  setNoData={this.setNoData} />
        )}
      </div>
    );
  }
}

export default Mainpage;
