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
  Flex,
  Space,
} from "antd";

import { BuildOutlined, CaretLeftFilled } from "@ant-design/icons";

import { getUsersRolesService, postUserService } from "@services/User";
import { SelectTOptionType } from "@/types";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type Props = {
  setRefrech: React.Dispatch<React.SetStateAction<boolean>>;
  refrech: boolean;
};

const UserForm = (props: Props) => {
  const { refrech, setRefrech } = props;
  const [active, setActive] = useState(false);
  const [groupClients, setGroupClients] = useState<SelectTOptionType[]>();
  const [form] = Form.useForm();

  const resetAndClose = () => {
    form.resetFields();
    setActive(false);
  };

  const onFinish = async (values: any) => {
    try {
      await postUserService(values);
      setRefrech(!refrech);
      message.success("L'utilisateurs a été ajouté avec succès.");
      callback()
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };

  const callback = () => {
    setActive(!active);
  };

  useEffect(() => {
    async function fetchGroupRoles() {
      try {
        const result = await getUsersRolesService();
        const groups = result?.roles?.map((element: any) => {
          return {
            label: element?.name,
            value: element?.id,
          };
        });

        setGroupClients(groups);
      } catch (error) {
        //message.error((error as Error)?.message);
        // Handle the error if needed
      }
    }
    fetchGroupRoles();
  }, []);

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
              <Typography.Text strong>Ajouter un utilisateur</Typography.Text>
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
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name="gender"
                      label="Civilité"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez selectionner civilité !",
                        },
                      ]}
                    >
                      <Select
                        options={[
                          {
                            label: "N/A",
                            value: "N/A",
                          },
                          {
                            label: "Monsieur",
                            value: "Monsieur",
                          },
                          {
                            label: "Madame",
                            value: "Madame",
                          },
                          {
                            label: "Mademoiselle",
                            value: "Mademoiselle",
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Nom et prénom utilisateur:"
                      name="username"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez saisir le nom et prénom du l'utilisateur !",
                        },
                      ]}
                    >
                      <Input
                        prefix={<BuildOutlined />}
                        placeholder="Nom utilisateur"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name="role_id"
                      label="Group utilisateur:"
                      required
                    >
                      <Select options={groupClients} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label="E-mail"
                      name="email"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir l'email !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Mot de passe :"
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir ce champ !",
                        },
                      ]}
                    >
                      <Input type="password" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Num. de tél."
                      name="tel"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir le Num. de tél. !",
                        },
                      ]}
                    >
                      <PhoneInput
                        style={{ width: "100%" }}
                        defaultCountry="fr"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="active" label="État">
                      <Select
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
                    </Form.Item>
                  </Col>
                </Row>

                <Flex justify="center">
                  <Space>
                    <Form.Item>
                      <Button onClick={resetAndClose}>Annuler</Button>
                    </Form.Item>

                    <Form.Item>
                      <Button type="primary" htmlType="submit">
                        Ajouter
                      </Button>
                    </Form.Item>
                  </Space>
                </Flex>
              </Form>
            ),
          },
        ]}
      />

      <Divider orientation="center" />
    </div>
  );
};

export default UserForm;
