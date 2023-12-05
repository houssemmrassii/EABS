import { Button, Row, Form, Input, Col, Select } from "antd";
import React from "react";
import { BuildOutlined } from "@ant-design/icons";
const GroupEtablissementForm: React.FC = () => {
  const onFinish = (values: any) => {
    console.log(values);
  };

  return (
    <Form
      layout="vertical"
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ display: "flex", justifyContent: "center" }}
      >
        <Col className="gutter-row" span={6}>
          <Form.Item
            label="Group établissement :"
            name="etab_name"
            rules={[
              {
                required: true,
                message: "Veuillez saisir le nom du groupe!",
              },
            ]}
          >
            <Input
              size="large"
              prefix={<BuildOutlined />}
              placeholder="Nom du groupe"
            />
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={6}>
          <Form.Item name="active" label="État :">
            <Select
              size="large"
              defaultValue={true}
              options={[
                {
                  label: "Activé",
                  value: true,
                },
                {
                  label: "Désactivé",
                  value: false,
                },
              ]}
            />
          </Form.Item>{" "}
        </Col>
      </Row>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ display: "flex", justifyContent: "flex-end" }}
      >
        <Col className="gutter-row">
          <Form.Item>
            <Button
              htmlType="submit"
              className="login-form-button"
              style={{
                width: "100%",
              }}
            >
              Annuler
            </Button>
          </Form.Item>
        </Col>
        <Col className="gutter-row" span={4}>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              style={{
                width: "100%",
              }}
            >
              Confirmer
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default GroupEtablissementForm;
