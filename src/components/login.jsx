import React from "react";
import { Row, Col, Input, Button, Divider } from "antd";
import history from '../history';
class Login extends React.Component {
  toRegister(e) {
    e.preventDefault();
    history.push('/register');
  }
  render() {
    return (
      <div>
        <Row>
          <span style={{ fontSize: 30 }}>Welcome to Face Detection</span>
        </Row>
        <Row style={{ padding: "30px 0px" }}>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Username:
            </Col>
            <Col span={6}>
              <Input allowClear placeholder="6-12 Characters, _, A-z,0-9" />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Password:
            </Col>
            <Col span={6}>
              <Input.Password placeholder="6-12 Characters" />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button type="primary" size="large">
                sign in
              </Button>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={18}>
              <Divider>Don't have an account?</Divider>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button onClick={ (e)=>this.toRegister(e)} size="large">sign up</Button>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default Login;
