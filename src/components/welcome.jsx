import React from "react";
import { Layout, Row, Col, Avatar, Icon, Menu, Dropdown } from "antd";
import Login from "./login";
import Register from "./register";
import { Router, Route } from "react-router-dom";
import history from '../history';
const { Header, Content, Footer } = Layout;
class Welcome extends React.Component {
  render() {
    const menu = (
      <Menu>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.alipay.com/"
          >
            1st menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.taobao.com/"
          >
            2nd menu item
          </a>
        </Menu.Item>
        <Menu.Item>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.tmall.com/"
          >
            3rd menu item
          </a>
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
                <Avatar
                  size={48}
                  icon="user"
                  style={{ marginRight: "20px", marginBottom: "8px" }}
                />
                <Dropdown overlay={menu}>
                  <span style={{ fontSize: 22 }}>
                    Not Login <Icon type="down" />
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
