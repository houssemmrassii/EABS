import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  Col,
  Collapse,
  DatePicker,
  Divider,
  Flex,
  Form,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";

import TypeChamListForm from "./TypeChamListForm";
import { getFractions, getTypeChambre } from "@/services/Factory";
import { getEtablissementService } from "@/services/Etablissement";

type Props = {};
const { RangePicker } = DatePicker;

const ContractEtablissementForm = (props: Props) => {
  const [active, setActive] = useState(false);
  const [etablissements, setEtablissements] = useState<any>([]);
  const [rooms, setRooms] = useState<any>([]);
  const [fractions, setFractions] = useState<any>([]);
  const [selectedEtab, setSelectedEtab] = useState<any>(null);

  const [form] = Form.useForm();

  const resetAndClose = () => {
    form.resetFields();
    setActive(false);
  };

  const callback = () => {
    setActive(!active);
  };

  const onFinish = async (values: any) => {
    try {
    } catch (error) {}
  };

  useEffect(() => {
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

    async function fetchRooms() {
      try {
        const data = await getTypeChambre();

        console.log(data);
        const temp = data?.map((elem: any) => {
          return {
            id: elem?.id,
            modalite_achat: elem?.modalite_achat,
            name: elem?.name,
            prix_achat: null,
            def: null,
            num_chambre: null,
          };
        });
        setRooms(temp);
        form.setFieldsValue({ types_chambres: temp });
      } catch (error) {
        message.error(error as string);
      }
    }

    const fetchEtabs = async () => {
      try {
        const result = await getEtablissementService();

        const temp = result?.etablissements?.map((elem: any) => {
          return {
            label: elem?.name,
            value: elem?.id,
          };
        });

        setEtablissements(temp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEtabs();
    fetchFractions();
    fetchRooms();
  }, []);

  return (
    <div style={{ marginBottom: "2rem" }}>
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
              <Typography.Text strong>
                Ajouter un contract d'établissement
              </Typography.Text>
            ),
            children: (
              <Form
                layout="vertical"
                name="normal_login"
                className="login-form"
                initialValues={{ active: true }}
                onFinish={onFinish}
                size="large"
                form={form}
              >
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item name="etablissement" label="Établissement">
                      <Select
                        options={etablissements}
                        onChange={(e) => setSelectedEtab(e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item name="period" label="Période">
                      <RangePicker style={{ width: "100%" }} />
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
                {selectedEtab && (
                  <>
                    <Divider orientation="center">Intermédiaire</Divider>
                    <Row gutter={24} justify={"center"}>
                      <Col
                        span={8}
                        style={{ backgroundColor: "#F0F0F0", borderRadius: 13 }}
                      >
                        <Form.Item
                          name="intermediaire"
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            paddingTop: "1rem",
                          }}
                        >
                          <Checkbox value={true}>Intermédiaire</Checkbox>
                        </Form.Item>
                      </Col>
                    </Row>
                    <Divider orientation="center">Fractionnement</Divider>
                    <Row gutter={24} justify={"center"}>
                      <Col span={8}>
                        <Form.Item
                          name="fractionnement"
                          label="Facture calculée"
                        >
                          <Select options={fractions} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Divider orientation="center">Types chambres</Divider>
                    <Form.List name="types_chambres">
                      {(fields, {}) => (
                        <Row gutter={24}>
                          {fields.map(({ key, name, ...restField }) => {
                            return (
                              <TypeChamListForm
                                data={rooms}
                                key={key}
                                name={name}
                                restField={restField}
                              />
                            );
                          })}
                        </Row>
                      )}
                    </Form.List>
                  </>
                )}
                <Flex justify="center">
                  <Space>
                    <Form.Item>
                      <Button onClick={resetAndClose}>Annuler</Button>
                    </Form.Item>

                    <Form.Item>
                      <Button
                        type="primary"
                        disabled={!selectedEtab}
                        htmlType="submit"
                      >
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
    </div>
  );
};

export default ContractEtablissementForm;
