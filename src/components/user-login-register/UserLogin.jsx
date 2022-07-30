import React, { useEffect } from "react";
import { Form, Input, Col, Row, Checkbox } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Navigate } from "react-router";
import "./style/user-register-login.scss";
import { Link } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { loginAction } from "../../stores/slices/user.slice";

export default function UserLogin() {
  const userInfo = useSelector((state) => state.user.userInfoState);
  const dispatch = useDispatch();

  const validateMessages = {
    required: "This field is required!",
  };
  useEffect(() => {
    localStorage.removeItem("REGISTER");
  }, []);

  const onLogin = (values) => {
    dispatch(loginAction(values));
  };

  if (userInfo.data) {
    if (userInfo.data.role === "admin") {
      return <Navigate to={"/admin"} />;
    }
    return <Navigate to={"/booking"} />;
  }

  return (
    <div className="register-login-container">
      <div className="pay-header">
        <Row>
          <Col xs={1} sm={2} md={3} lg={3}></Col>
          <Col xs={2} sm={2} md={1} lg={1}>
            <Link to="/booking">
              <ArrowLeftOutlined />
            </Link>
          </Col>
          <Col xs={9} sm={7} md={6} lg={4} className="text-logo">
            <Link to="/">
              <p>Ocean Villa </p>
            </Link>
          </Col>
        </Row>
      </div>
      <div className="register-login-center">
        <div className="register-login">
          <div className="user-form-contact">
            <Form
              name="complex-form"
              initialValues={{
                remember: true,
              }}
              autoComplete="off"
              validateMessages={validateMessages}
              onFinish={onLogin}
            >
              <legend>
                <h2>Login</h2>
              </legend>
              <Row justify="center">
                <Col xs={22} sm={20} md={18} xl={18}>
                  <Form.Item
                    name="email"
                    rules={[
                      {
                        type: "email",
                        required: true,
                        message: "This is not a valid email!",
                      },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined className="site-form-item-icon" />}
                      size="large"
                      placeholder="Email"
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={20} md={18} xl={18}>
                  <Form.Item
                    name="password"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input.Password
                      prefix={<LockOutlined className="site-form-item-icon" />}
                      size="large"
                      placeholder="Password"
                    />
                  </Form.Item>
                </Col>
                <Col xs={22} sm={20} md={18} xl={18}>
                  <Row justify="space-between">
                    <Form.Item name="remember" valuePropName="checked">
                      <Checkbox>Remember me</Checkbox>
                    </Form.Item>
                    <a href="">Forgot password</a>
                  </Row>
                </Col>

                <Col xs={22} sm={20} md={18} xl={18}>
                  <div className="user-submit-contact">
                    <button type="submit" className="user-submit-btn">
                      Login
                    </button>
                  </div>
                </Col>
                <p>
                  Didn't have account? <Link to="/register">Register</Link>
                </p>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
