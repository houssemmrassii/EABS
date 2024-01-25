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
  Typography,
  Flex,
  Space,
} from "antd";
import {
  BuildOutlined,
  CaretLeftFilled,
} from "@ant-design/icons";

import {  updateUserService } from "@services/User";

import {
  UserDataType,
} from "@/types";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type Props = {
  recordData: UserDataType | undefined;
  setEditing?: React.Dispatch<React.SetStateAction<UserDataType | null>>;
  refrech?: boolean;
  setRefrech?: React.Dispatch<React.SetStateAction<boolean>>;
  external?: boolean;
  rolesUsers: [];
};

const UpdateUserForm = (props: Props) => {
  const { recordData, setEditing, refrech, setRefrech, external, rolesUsers } =
    props;

  const [active, setActive] = useState(false);
  const [form] = Form.useForm();

  const resetAndClose = () => {
    form.resetFields();
    setActive(false);
    if (setEditing) {
      setEditing(null);
    }
  };

  const onFinish = async (values: any) => {
    try {
      await updateUserService(recordData?.id as number, values);
      if (!external) {
        if (setRefrech) {
          setRefrech(!refrech);
        }
        setActive(false);
        if (setEditing) {
          setEditing(null);
        }
      }
    } catch (error) {
      console.error((error as Error)?.message);
    }
  };

  const callback = () => {
    setActive(!active);
  };
  useEffect(() => {
    async function setData() {
      try {
        form.setFieldsValue({
          ...recordData,
        });
      } catch (error) {
        //
      }
    }
    setTimeout(() => {
      callback()
    }, 100);
    setData();
  }, [recordData]);

  return (
    <div className="fade-in">
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
                Modifier {recordData?.username}
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
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez choisir le role du l'utilisateur !",
                        },
                      ]}
                    >
                      <Select options={rolesUsers} />
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
                        Modifier
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

export default UpdateUserForm;
