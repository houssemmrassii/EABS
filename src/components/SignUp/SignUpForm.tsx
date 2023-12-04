import React from "react";
import { Col, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, Card } from "antd";
import classes from "./SignUpForm.module.css";
import axios from "@/utils/axios/axiosInterceptor";
import { useNavigate } from "react-router-dom";

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const onFinish = (values: any) => {
    axios
      .post(`${import.meta.env.VITE_APP_BASE_URL}/users/register`, { ...values, role_id: 1 })
      .then(() => {
        message.success("Utilisateur créé avec succès")
        setTimeout(() => {
            navigate("/")
        }, 3000);
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
              name="username"
              rules={[
                {
                  required: true,
                  message: "Veuillez saisir votre nom d'utilisateur!",
                },
              ]}
            >
              <Input
                size="large"
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Nom d'utilisateur"
              />
            </Form.Item>
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
                S'inscrire
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </div>
  );
};

export default SignUpForm;
