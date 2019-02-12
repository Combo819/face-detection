import React from "react";
import { Layout, Row, Col, Avatar, Icon, Menu, Dropdown } from "antd";
import Login from "./login";
import Register from "./register";
import Mainpage from './mainpage'
import { Router, Route } from "react-router-dom";
import history from '../history';
const { Header, Content, Footer } = Layout;
class Welcome extends React.Component {
  constructor(props){
    super(props)
    this.state={
      avatarSrc:'',
      useranme:"",
      dropdownDisable:true
    }
  }
  render() {
    const menu = (
      <Menu>
        <Menu.Item disabled={this.state.dropdownDisable}>
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
                <span style={{ fontSize: 30 }}>LOGO</span>
              </Col>
              <Col lg={6}>
              {this.state.avatarSrc?(<Avatar
                  size={48}
                  src={this.state.avatarSrc}
                  style={{ marginRight: "20px", marginBottom: "8px" }}
                />):(<Avatar
                  size={48}
                  icon="user"
                  style={{ marginRight: "20px", marginBottom: "8px" }}
                />)}
                <Dropdown overlay={menu}>
                  <span style={{ fontSize: 22 }}>
                    { this.state.useranme||'Not Login'} <Icon type="down" />
                  </span>
                </Dropdown>
              </Col>
            </Row>
          </Header>
          <Content style={{ padding: "50px 50px" }}>
            <div style={{ background: "#fff", padding: 24, minHeight: 280 }}>
              <Router history={history}>
                <div>
                  <Route exact path="/" component={Login} />
                  <Route path="/register" component={Register} />
                  <Route path='/mainpage' component={Mainpage} />
                  {/* <Login /> */}
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
