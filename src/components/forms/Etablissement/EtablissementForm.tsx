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
  InputNumber,
  Typography,
  Flex,
  Space,
} from "antd";

import { PlusOutlined, BuildOutlined } from "@ant-design/icons";

import { useGroupEtablissementContext } from "@context/GroupEtablissementContext";
import { postEtablissementService } from "@services/Etablissement";
import {
  getDepartementsByRegion,
  getRegions,
  getVillesByDepartment,
} from "@/services/Factory";

const EtablissementForm: React.FC = () => {
  const [cities, setCities] = useState([]);
  const [regions, setRegions] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [active, setActive] = useState(false);
  const { addToTableData } = useGroupEtablissementContext();
  const [form] = Form.useForm();

  const resetAndClose = () => {
    form.resetFields();
    setActive(false);
  };

  const onFinish = async (values: any) => {
    try {
      let result = await postEtablissementService(values);
      let newObject = {
        key: result?.id,
        name: result.name,
        status: result.active,
      };
      message.success("L'établissements a été ajouté avec succès.");
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

  const handleChangeRegion = async (value: any) => {
    try {
      const data = await getDepartementsByRegion(value);
      const temp = data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });

      setDepartments(temp);
    } catch (error) {}
  };

  const handleChangeDepartment = async (value: any) => {
    try {
      const data = await getVillesByDepartment(value);
      const temp = data?.map((item: any) => {
        return {
          label: item?.name,
          value: item?.id,
        };
      });

      setCities(temp);
    } catch (error) {}
  };

  useEffect(() => {
    async function fetchRegions() {
      try {
        const data = await getRegions();

        const temp = data?.map((item: any) => {
          return {
            label: item?.name,
            value: item?.id,
          };
        });

        setRegions(temp);
      } catch (error) {
        return message.error((error as Error)?.message);
      }
    }
    fetchRegions();
  }, []);

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
            label: (
              <Typography.Text strong>Ajouter un établissement</Typography.Text>
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
                        prefix={<BuildOutlined />}
                        placeholder="Nom établissement"
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      name="idGroup"
                      label="Group établissement:"
                      required
                    >
                      <Select
                        defaultValue={1}
                        options={[
                          {
                            label: "Par nuitée",
                            value: 1,
                          },
                        ]}
                      />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="region" label="Régions" required>
                      <Select options={regions} onChange={handleChangeRegion} />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item name="department" label="Départements" required>
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
                      name="codePostal"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir le code postal !",
                        },
                      ]}
                    >
                      <InputNumber
                        placeholder="Nom établissement"
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
                      label="Num. de tél."
                      name="num_tel"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez saisir le Num. de tél. !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Portable" name="portable">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Portable" name="portable">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Fax" name="fax">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Siret" name="siret">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Immatriculation" name="immatricule">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="Code NAF" name="code_naf">
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item label="TVA intra-communautaire" name="tva_intra">
                      <Input />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      label="Facture calculée"
                      name="facture_calc"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez selectionner Facture calculée !",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Par nuitée">
                          Par nuitée
                        </Select.Option>
                      </Select>
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
                      name="banque_adress"
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
                    <Form.Item label="Compte" name="compte">
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

export default EtablissementForm;
