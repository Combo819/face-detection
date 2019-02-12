import React from "react";
import { Row, Col, Input, Button, Divider, message } from "antd";
import history from "../history";

message.config({
    top: 80,
    duration: 3,
    maxCount: 1
  });
  
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formatNotif: false,
      formatContent: {
        currentShown: "",
        userLength: "The length of username must be between 6 to 12",
        inconsist: "Password and confirm password are not consistent",
        passwordLength: "The length of password must be between 6 to 12"
      },
      inputValue: {
        username: "",
        password: "",
        coPassword: ""
      }
    };
    this.usernameOn = this.usernameOn.bind(this);
    this.passwordOn = this.passwordOn.bind(this);
    this.coPasswordOn = this.coPasswordOn.bind(this);
    this.signUP = this.signUP.bind(this);
  }
  toLogin(e) {
    e.preventDefault();
    history.push("/");
  }
  signUP(e) {

    //possible character checking function

    if (
      this.state.inputValue.username.length > 16 ||
      this.state.inputValue.username.length < 6
    ) {
        message.error(this.state.formatContent.userLength);
      /* this.setState(preState => ({
        formatContent: {
          ...preState.formatContent,
          currentShown: this.state.formatContent.userLength
        }
      }));
      this.setState({ formatNotif: true }); */
    } else if (
      this.state.inputValue.password.length > 16 ||
      this.state.inputValue.password.length < 6
    ) {
        message.error(this.state.formatContent.passwordLength);
      /* this.setState(preState => ({
        formatContent: {
          ...preState.formatContent,
          currentShown: this.state.formatContent.passwordLength
        }
      }));
      this.setState({ formatNotif: true }); */
    } else if (
      this.state.inputValue.password !== this.state.inputValue.coPassword
    ) {
        message.error(this.state.formatContent.inconsist);
      /* this.setState(preState => ({
        formatContent: {
          ...preState.formatContent,
          currentShown: this.state.formatContent.inconsist
        }
      }));
      this.setState({ formatNotif: true }); */
    }else{
        this.setState({ formatNotif: false });
        //request for signing up
    }
  }
  usernameOn(event) {
    //must assign a const to preserve the value
    const targetValue = event.target.value;
    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        username: targetValue
      }
    }));
  }
  passwordOn(event) {
    //must assign a const to preserve the value
    const targetValue = event.target.value;
    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        password: targetValue
      }
    }));
  }
  coPasswordOn(event) {
    //must assign a const to preserve the value
    const targetValue = event.target.value;
    this.setState(preState => ({
      inputValue: {
        ...preState.inputValue,
        coPassword: targetValue
      }
    }));
  }
  render() {
    return (
      <div>
        <Row>
          <span style={{ fontSize: 30 }}>Sign up for an account</span>
        </Row>
        <Row style={{ padding: "30px 0px" }}>
          {this.state.formatNotif && (
            <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
              <h3 style={{ color: "red" }}>
                {this.state.formatContent.currentShown}
              </h3>
            </Row>
          )}

          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Username:
            </Col>
            <Col span={6}>
              <Input
                value={this.state.inputValue.username}
                onChange={e => this.usernameOn(e)}
                allowClear
                placeholder="6-12 Characters, _, A-z,0-9"
              />
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
              <Input.Password
                value={this.state.inputValue.password}
                onChange={e => this.passwordOn(e)}
                allowClear
                placeholder="6-12 Characters"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col
              style={{ fontSize: 20, textAlign: "right", paddingRight: "30px" }}
              span={4}
            >
              Confirm Password:
            </Col>
            <Col span={6}>
              <Input.Password
                value={this.state.inputValue.coPassword}
                onChange={e => this.coPasswordOn(e)}
                allowClear
                placeholder="6-12 Characters"
              />
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button onClick={e => this.signUP(e)} type="primary" size="large">
                sign up
              </Button>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={18}>
              <Divider>Already have an account?</Divider>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "45px" }}>
            <Col span={6}>
              <Button onClick={e => this.toLogin(e)} size="large">
                sign in
              </Button>
            </Col>
          </Row>
        </Row>
      </div>
    );
  }
}

export default Login;
