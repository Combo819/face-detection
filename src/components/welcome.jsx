import React from "react";
import { Layout, Row, Col, Avatar, Icon, Menu, Dropdown, message } from "antd";
import Login from "./login";
import Register from "./register";
import Mainpage from "./mainpage";
import { Router, Route } from "react-router-dom";
import history from "../history";
const { Header, Content, Footer } = Layout;
const axios = require("axios");
const localUrl='http://127.0.0.1:5000'
const aliyunUrl='http://47.94.197.249:80'
const awsUrl='http://54.162.242.198:5000'
const baseUrl=awsUrl
class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatarSrc: "",
      username: "",
      dropdownDisable: true
    };
    this.logoutItem = this.logoutItem.bind(this);
    this.setProfile= this.setProfile.bind(this)
  }
  componentDidMount() {
    axios({
      url: baseUrl+"/home",
      method: "get",
      //set true if not deployed with back end in the same server
      withCredentials: true
    })
      .then(res => {
        
        if (res.data.login) {
          this.setState(preState => ({
            avatarSrc: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
            username: res.data.name,
            dropdownDisable: false
          }));
          message.success('Welcome Back')
          history.push("/mainpage");
        }else{
          history.push("/homepage");
        }
      })
      .catch(err => {
        console.log(err);
        history.push("/homepage");
        message.error('Error Network')
      });
  }
  setProfile(nextState){
    this.setState(preState => (nextState));
  }
  logoutItem(e) {
    axios({
      url: baseUrl + "/logout",
      method: "get",
      withCredentials: true
    }).then(res => {
      
      if (res.data.logout) {
        this.setState(preState => ({
          avatarSrc: "",
          username: "",
          dropdownDisable: true
        }));
        message.success('Account Logged Out')
        history.push("/homepage");
      }else{
        message.error('Error')
      }
    }).catch(err=>{
      console.log(err);
      message.error('Error Network')
    });
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item
          onClick={e => this.logoutItem(e)}
          disabled={this.state.dropdownDisable}
        >
          log out
        </Menu.Item>
      </Menu>
    );
    return (
      <div style={{ backgroundColor: "rgba(240,242,245)" }}>
        <Layout className="layout " style={{ minHeight: 820 }}>
          <Header
            style={{ backgroundColor: "#fff", boxShadow: "1px 1px 15px grey" }}
          >
            <Row type="flex" justify="space-between">
              <Col span={4}>
                <img width={110} style={{
                  marginTop:-26
                }} src={'https://combo819.github.io/myPhotoBlog/images/homepage/logo.png'}></img>
                {/* <span style={{ fontSize: 30 }}>LOGO</span> */}
              </Col>
              <Col lg={6}>
                {this.state.avatarSrc ? (
                  <Avatar
                    size={48}
                    src={this.state.avatarSrc}
                    style={{ marginRight: "20px", marginBottom: "8px" }}
                  />
                ) : (
                  <Avatar
                    size={48}
                    icon="user"
                    style={{ marginRight: "20px", marginBottom: "8px" }}
                  />
                )}
                <Dropdown overlay={menu}>
                  <span style={{ fontSize: 22 }}>
                    {this.state.username || "Not Login"} <Icon type="down" />
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: "50px 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Router history={history}>
                <div>
                  <Route exact path="/homepage"  render={(props) => <Login {...props} setProfile={this.setProfile} />}  />
                  <Route exact path="/registerpage"  render={(props) => <Register {...props} setProfile={this.setProfile} />}  />
                  <Route  path="/mainpage" component={Mainpage} />
                </div>
              </Router>
            </div>
          </Content>
          <Footer style={{ textAlign: "center" }}>
            Face Detection ©2019 Created by Kang
          </Footer>
        </Layout>
      </div>
    );
  }
}

export default Welcome;
