import React from "react";
import { Col } from "antd";
import { LockOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card } from "antd";
import classes from "./LoginForm.module.css";
import axios from "@/utils/axios/axiosInterceptor";
import { useAuth } from "@/context/AuthContext";
import { jwtDecode } from "jwt-decode";

const LoginForm: React.FC = () => {
  const { login } = useAuth();
  const onFinish = (values: any) => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/login`, values)
      .then((res) => {
        let token = res.data.access_token;
        let decodedToken = jwtDecode(token);
        login(decodedToken?.sub);
        localStorage.setItem("token", res.data.access_token);
        window.location.reload()
      });
  };

  return (
    <div className={classes.Container}>
      <Col span={6}>
        <Card title="EBAS3 -ESPACE ADMINISTRATEURS" bordered={false}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre adresse e-mail correct!",
                  type: "email",
                },
              ]}
            >
              <Input size="large" prefix={"@"} placeholder="email@mail.com" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre mot de passe !",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                size="large"
                style={{
                  width: "100%",
                }}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </div>
  );
};

export default LoginForm;
