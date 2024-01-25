import React from "react";
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
  Typography,
} from "antd";
import {  BuildOutlined, CaretLeftFilled } from "@ant-design/icons";

import { postEtablissementGroupsService } from "@services/EtablissementGroup";
import { useGroupEtablissementContext } from "@/context/GroupEtablissementContext";

const GroupEtablissementForm: React.FC = () => {
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
          <CaretLeftFilled
            style={{ fontSize: "20px" }}
            rotate={isActive ? -90 : 0}
          />
        )}
        activeKey={active ? "1" : "0"}
        onChange={callback}
        expandIconPosition={"end"}
        items={[
          {
            key: "1",
            label: (
              <Typography.Text strong>
                Ajouter un groupe établissement
              </Typography.Text>
            ),
            children: (
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ active: true }}
                onFinish={onFinish}
                form={form}
              >
                <Row
                  gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Col className="gutter-row" span={6}>
                    <Form.Item
                      label="Group établissement :"
                      name="name"
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
                  style={{ display: "flex", justifyContent: "center" }}
                >
                  <Col className="gutter-row">
                    <Form.Item>
                      <Button
                        onClick={resetAndClose}
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
            ),
          },
        ]}
      />

      <Divider orientation="center" />
    </div>
  );
};

export default GroupEtablissementForm;
