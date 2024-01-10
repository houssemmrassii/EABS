import React from "react";
import { Col, Button, Form, Input, Card, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "@/plugins/axiosInterceptor";

import classes from "./LoginForm.module.css";
const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any): void => {
    axios
      .post(`/login`, values)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        navigate("/dashboard");
      })
      .catch((error) => {
        notification.error({
          message: "Erreur",
          description: error.response.data.message,
        });
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
