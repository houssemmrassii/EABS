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
import dayjs from "dayjs";
import { postContractEtablissement } from "@/services/ContractEtablissement";

type Props = {
  refrech: boolean;
  setRefrech: React.Dispatch<React.SetStateAction<boolean>>;
};

const { RangePicker } = DatePicker;

const ContractEtablissementForm = (props: Props) => {
  const { refrech, setRefrech } = props;
  const [dateRange, setDateRange] = useState<number | null>(null);
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
      const payload = {
        fractionnement_id: values?.fractionnement,
        etablissement_id: values?.etablissement,
        start_date: dayjs(values?.period[0]).format("YYYY-MM-DD"),
        end_date: dayjs(values?.period[1]).format("YYYY-MM-DD"),
        active: values?.active,
        type_chambres: values?.type_chambres?.map((elem: any) => {
          return {
            id_type_chambre: elem?.id,
            prix_achat: elem?.prix_achat,
            default_pax: elem?.def ? elem?.def : null,
            num_chambres: elem?.num_chambre,
          };
        }),
      };

      await postContractEtablissement(payload);

      setRefrech(!refrech);
      resetAndClose();
    } catch (error) {
      message.error((error as Error)?.message);
    }
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
        const temp = data?.map((elem: any) => {
          return {
            id: elem?.id,
            modalite_achat: elem?.modalite_achat,
            name: elem?.name,
            prix_achat: null,
            def: null,
            def_array: Array.from(
              new Set([elem?.num_max_occupants, elem?.num_defaut_occupants])
            ),
            num_chambre: null,
          };
        });
        setRooms(temp);
        form.setFieldsValue({ type_chambres: temp });
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
        expandIconPosition={"end"}
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
                name="contract-etab"
                initialValues={{ active: true }}
                onFinish={onFinish}
                size="large"
                form={form}
              >
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name="etablissement"
                      label="Établissement"
                      rules={[{ required: true, message: "Champ requis" }]}
                    >
                      <Select
                        options={etablissements}
                        onChange={(e) => setSelectedEtab(e)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      name="period"
                      rules={[{ required: true, message: "Champ requis" }]}
                      label={
                        <>
                          Période{" "}
                          {dateRange && (
                            <Typography.Text strong style={{ marginLeft: 2 }}>
                              ({dateRange} nuités)
                            </Typography.Text>
                          )}
                        </>
                      }
                    >
                      <RangePicker
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          if (e) {
                            const days = dayjs(e[1]).diff(e[0], "day");
                            setDateRange(days);
                          } else {
                            setDateRange(null);
                          }
                        }}
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
                          rules={[{ required: true, message: "Champ requis" }]}
                        >
                          <Select options={fractions} />
                        </Form.Item>
                      </Col>
                    </Row>
                    <Divider orientation="center">Types chambres</Divider>
                    <Form.List name="type_chambres">
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
