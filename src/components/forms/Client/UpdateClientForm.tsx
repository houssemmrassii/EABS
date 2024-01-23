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

import { PlusOutlined, BuildOutlined, CaretLeftFilled } from "@ant-design/icons";

import { updateClientService } from "@services/Client";
import {
  getDepartementsByRegion,
  getFractions,
  getRegions,
  getVillesByDepartment,
} from "@/services/Factory";
import { getClientGroupsService } from "@/services/ClientGroup";
import {
  ClientDataType,
  SelectTOptionType,
  SelectTOptionTypeWithId,
} from "@/types";

import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

type Props = {
  recordData: ClientDataType | undefined;
  setEditing?: React.Dispatch<
    React.SetStateAction<ClientDataType | null>
  >;
  refrech?: boolean;
  setRefrech?: React.Dispatch<React.SetStateAction<boolean>>;
  external?: boolean;
};

const UpdateClientForm = (props: Props) => {
  const { recordData, setEditing, refrech, setRefrech, external } = props;

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
    if (setEditing) {
      setEditing(null);
    }
  };

  const onFinish = async (values: any) => {
    try {
      await updateClientService(recordData?.id as number, values);

      message.success("le client a été modifiée avec succès.");
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
      console.error((error as Error)?.message);
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
      console.error((error as Error)?.message);
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

    async function fetchGroupEtab() {
      try {
        const result = await getClientGroupsService();
        const groups = result?.groups?.map((element: any) => {
          return {
            label: element?.name,
            value: element?.id,
          };
        });

        setGroupEtabs(groups);
      } catch (error) {
        console.error((error as Error)?.message);
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
        console.error((error as Error)?.message);
      }
    }

    fetchFractions();

    fetchGroupEtab();

    fetchRegions();
  }, []);

  useEffect(() => {
    async function setData() {
      try {
        form.setFieldsValue({
          ...recordData,
          fractionnement: recordData?.id_fractionnement,
        });
      } catch (error) {
        //message.error((error as Error)?.message);
      }
    }

    setData();
  }, [recordData]);

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
                Modifier {recordData?.name}
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
                      label="Client:"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez saisir le nom du l'client !",
                        },
                      ]}
                    >
                      <Input
                        prefix={<BuildOutlined />}
                        placeholder="Nom client"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name="group_id"
                      label="Group client:"
                      required
                    >
                      <Select options={groupEtabs} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="region" label="Régions" required>
                      <Select options={regions} onChange={handleChangeRegion} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="departments" label="Départements" required>
                      <Select
                        onChange={handleChangeDepartment}
                        options={departments}
                        disabled={departments?.length === 0}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="ville" label="Ville" required>
                      <Select
                        options={cities}
                        disabled={cities?.length === 0}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label="Code Postal:"
                      name="code_postal"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir le code postal !",
                        },
                      ]}
                    >
                      <Input
                        placeholder="Code Postal"
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
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
                      <Input />
                    </Form.Item>
                  </Col>
                  <Divider orientation="center">Contacts</Divider>

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
                  <Col span={5}>
                    <Form.Item label="Fax" name="num_fax">
                      <PhoneInput
                        style={{ width: "100%" }}
                        defaultCountry="fr"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={5}>
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
                  <Col span={5}>
                    <Form.Item label="Portable" name="num_portable">
                      <PhoneInput
                        style={{ width: "100%" }}
                        defaultCountry="fr"
                      />
                    </Form.Item>
                  </Col>

                  <Divider orientation="center">
                    Informations d'client et de facturation
                  </Divider>
                  <Col span={8}>
                    <Form.Item label="Siret" name="siret">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Immatriculation" name="immatriculation">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Code NAF" name="code_naf">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="TVA intra-communautaire"
                      name="tva_instra_communautaire"
                    >
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label="Facture calculée"
                      name="fractionnement"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez selectionner Facture calculée !",
                        },
                      ]}
                    >
                      <Select options={fractions} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="active" label="État :">
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
                    </Form.Item>{" "}
                  </Col>
                </Row>
                <Divider orientation="center">
                  Coordonnées bancaires (facultatif)
                </Divider>
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item label="Banque" name="banque">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      label="Adresse de la banque"
                      name="adresse_banque"
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Code Banque" name="code_banque">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Code Guichet" name="code_guichet">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Compte" name="compte_banque">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Code IBAN" name="iban">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Code BIC" name="bic">
                      <Input />
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

export default UpdateClientForm;
