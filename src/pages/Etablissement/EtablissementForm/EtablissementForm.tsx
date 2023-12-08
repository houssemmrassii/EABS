import {
  Button,
  Row,
  Form,
  Input,
  Col,
  Select,
  Collapse,
  Divider,
  message,
  InputNumber,
  Flex,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { BuildOutlined } from "@ant-design/icons";
import { postEtablissementGroupsService } from "@/services/GroupEtablissement/GroupEtablissementServices";
import { useGroupEtablissementContext } from "@/context/GroupEtablissementContext/GroupEtablissementContext";
const EtablissementForm: React.FC = () => {
  const [active, setActive] = useState(false);
  const { addToTableData } = useGroupEtablissementContext();
  const [form] = Form.useForm();
  const resetAndClose = () => {
    form.resetFields();
    setActive(false);
  };
  const onFinish = async (values: any) => {
    try {
      let result = await postEtablissementGroupsService(values);
      let newObject = {
        key: result?.id,
        name: result.name,
        status: result.active,
      };
      message.success("Le groupe d'établissements a été ajouté avec succès.");
      setTimeout(() => {
        addToTableData(newObject);
        resetAndClose();
      }, 500);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle the error if needed
    }
  };
  const callback = () => {
    setActive(!active);
  };
  return (
    <div>
      <Collapse
        expandIcon={({ isActive }) => (
          <PlusOutlined
            style={{ fontSize: "20px" }}
            rotate={isActive ? 90 : 0}
          />
        )}
        activeKey={active ? "1" : "0"}
        onChange={callback}
        expandIconPosition={"right"}
        items={[
          {
            key: "1",
            label: "Ajouter un établissement",
            children: (
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ active: true }}
                onFinish={onFinish}
                form={form}
              >
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Établissement:"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez saisir le nom du l'établissement !",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        prefix={<BuildOutlined />}
                        placeholder="Nom établissement"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      name="idGroup"
                      label="Group établissement:"
                      required
                    >
                      <Select
                        size="large"
                        defaultValue={1}
                        options={[
                          {
                            label: "Par nuitée",
                            value: 1,
                          },
                        ]}
                      />
                    </Form.Item>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item name="region" label="Régions:" required>
                      <Select size="large" options={[]} />
                    </Form.Item>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item name="department" label="Départements:" required>
                      <Select size="large" options={[]} />
                    </Form.Item>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item name="ville" label="Ville:" required>
                      <Select size="large" options={[]} />
                    </Form.Item>{" "}
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Code Postal:"
                      name="codePostal"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir le code postal !",
                        },
                      ]}
                    >
                      <InputNumber
                        size="large"
                        placeholder="Nom établissement"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Adresse:"
                      name="adress"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir l'adress' !",
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col span={12}>
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
                  <Col>
                    <Form.Item>
                      <Button
                        onClick={resetAndClose}
                        className="login-form-button"
                        style={{
                          width: "100%",
                        }}
                        danger
                      >
                        Annuler
                      </Button>
                    </Form.Item>
                  </Col>
                  <Col span={4}>
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
            ),
          },
        ]}
      />

      <Divider orientation="center" />
    </div>
  );
};

export default EtablissementForm;
