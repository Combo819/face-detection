import React from "react";
import history from "../history";
import { Row, Col, Empty, Divider, Upload, message, Icon } from "antd";
import Masonry from "./masonry";
import Infinite from "./infinite";
const Dragger = Upload.Dragger;
const uploadProps = {
  name: "file",
  multiple: false,
  action: "http://127.0.0.1:5000/upload",
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
    };
    this.setNoData=this.setNoData.bind(this)
  }
  setNoData(noData){
    console.log('noData',noData);
    
    this.setState({
      noData
    })
  }
  render() {
    return (
      <div>
        <Row
          type="flex"
          justify="center"
          style={{ marginTop: "30px", marginBottom: "30px" }}
        >
          <Col lg={8}>
            <Dragger {...uploadProps}>
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
          <Infinite setNoData={this.setNoData} />
        )}
      </div>
    );
  }
}

export default Mainpage;
