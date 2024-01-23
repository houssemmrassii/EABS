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

import {
  PlusOutlined,
  BuildOutlined,
  CaretLeftFilled,
} from "@ant-design/icons";

import { postUserService } from "@services/User";
import {
  getDepartementsByRegion,
  getFractions,
  getRegions,
  getVillesByDepartment,
} from "@/services/Factory";
import { SelectTOptionType, SelectTOptionTypeWithId } from "@/types";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type Props = {
  setRefrech: React.Dispatch<React.SetStateAction<boolean>>;
  refrech: boolean;
};

const UserForm = (props: Props) => {
  const { refrech, setRefrech } = props;
  const [active, setActive] = useState(false);
  const [groupEtabs, setGroupEtabs] = useState<SelectTOptionType[]>();
  const [fractions, setFractions] = useState<SelectTOptionType[]>();
  const [cities, setCities] = useState<SelectTOptionTypeWithId[]>([]);
  const [regions, setRegions] = useState<SelectTOptionTypeWithId[]>([]);
  const [departments, setDepartments] = useState<SelectTOptionTypeWithId[]>([]);
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
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };

  const callback = () => {
    setActive(!active);
  };

  const handleChangeRegion = async (value: any) => {
    const id = regions?.find((elem: any) => elem?.value === value)?.id;
    form.setFieldValue("departments", null);
    form.setFieldValue("ville", null);
    try {
      const data = await getDepartementsByRegion(id as number);
      const temp = data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.name,
          id: item?.id,
        };
      });

      setDepartments(temp);
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };

  const handleChangeDepartment = async (value: any) => {
    const id = departments?.find((elem: any) => elem?.value === value)?.id;
    form.setFieldValue("ville", null);
    try {
      const data = await getVillesByDepartment(id as number);
      const temp = data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.name,
          id: item?.id,
        };
      });

      setCities(temp);
    } catch (error) {
      message.error((error as Error)?.message);
    }
  };

  useEffect(() => {
    async function fetchRegions() {
      try {
        const data = await getRegions();

        const temp = data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.name,
            id: item?.id,
          };
        });

        setRegions(temp);
      } catch (error) {
        return message.error((error as Error)?.message);
      }
    }

    async function fetchFractions() {
      try {
        const result = await getFractions();

        const temp = result?.map((elem: any) => {
          return {
            label: elem?.name,
            value: elem?.id,
          };
        });

        setFractions(temp);
      } catch (error) {
        message.error((error as Error)?.message);
      }
    }

    fetchFractions();

    fetchRegions();
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
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir le nom et prénom du l'utilisateur !",
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
                      name="group_id"
                      label="Group utilisateur:"
                      required
                    >
                      <Select options={groupEtabs} />
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
                      name="num_telephone"
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
