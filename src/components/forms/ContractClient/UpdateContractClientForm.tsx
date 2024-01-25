import { CaretLeftFilled } from "@ant-design/icons";
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

import { getFractions } from "@/services/Factory";
import { getClientService } from "@/services/Client";
import dayjs from "dayjs";
import { ContractClientDataType } from "@/types";
import { updateContractClient } from "@/services/ContractClient";

type Props = {
  recordData: ContractClientDataType;
  setEditing: React.Dispatch<
    React.SetStateAction<ContractClientDataType | null>
  >;
  refrech: boolean;
  setRefrech: React.Dispatch<React.SetStateAction<boolean>>;
};

const { RangePicker } = DatePicker;

const UpdateContractClientForm = (props: Props) => {
  const { recordData, setEditing, refrech, setRefrech } = props;
  const [active, setActive] = useState(false);
  const [fractions, setFractions] = useState<any>([]);
  const [selectedEtab, setSelectedEtab] = useState<any>(null);
  const [clients, setClients] = useState<any>([]);
  const [dateRange, setDateRange] = useState<number | null>(null);
  const [form] = Form.useForm();

  const resetAndClose = () => {
    setEditing(null);
    form.resetFields();
    setActive(false);
  };

  const callback = () => {
    setActive(!active);
  };

  const onFinish = async (values: any) => {
    try {
      const payload = {
        start_date: dayjs(values?.period[0]).format("YYYY-MM-DD"),
        end_date: dayjs(values?.period[1]).format("YYYY-MM-DD"),
        active: values?.active,
        type_chambres: recordData?.type_chambres?.map((elem: any) => {
          return {
            id_type_chambre: elem?.id,
            prix_achat: elem?.prix_achat,
            default_pax: elem?.default_pax,
            num_chambres: elem?.num_chambres,
          };
        }),
      };

      await updateContractClient(recordData?.id, payload);

      setRefrech(!refrech);
      message.success("Contract établissement modifié avec succès");
      resetAndClose();
    } catch (error) {
      
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
        //
      }
    }

    const fetchEtabs = async () => {
      try {
        const result = await getClientService();

        const temp = result?.clients?.map((elem: any) => {
          return {
            label: elem?.name,
            value: elem?.id,
          };
        });

        setClients(temp);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchEtabs();
    fetchFractions();
    form.setFieldsValue({
      fractionnement: recordData?.fractionnement_id,
      etablissement: recordData?.etablissement_id,
      period: [dayjs(recordData?.start_date), dayjs(recordData?.end_date)],
    });
    setSelectedEtab(recordData?.etablissement_id);
  }, []);

  return (
    <div style={{ marginBottom: "2rem" }}>
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
                Modifier le contract d'établissement
              </Typography.Text>
            ),
            children: (
              <Form
                layout="vertical"
                name="contract-etab"
                initialValues={{ active: true }}
                onFinish={onFinish}
                form={form}
              >
                <Row gutter={24}>
                  <Col span={8}>
                    <Form.Item
                      name="etablissement"
                      label="Client"
                      rules={[{ required: true, message: "Champ requis" }]}
                    >
                      <Select
                        disabled
                        options={clients}
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
                    {/* <Divider orientation="center">Intermédiaire</Divider>
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
                          <Checkbox disabled value={true}>
                            Intermédiaire
                          </Checkbox>
                        </Form.Item>
                      </Col>
                    </Row> */}
                    <Divider orientation="center">Fractionnement</Divider>
                    <Row gutter={24} justify={"center"}>
                      <Col span={8}>
                        <Form.Item
                          name="fractionnement"
                          label="Facture calculée"
                          rules={[{ required: true, message: "Champ requis" }]}
                        >
                          <Select disabled options={fractions} />
                        </Form.Item>
                      </Col>
                    </Row>
                    {/* <Divider orientation="center">Types chambres</Divider>
                    <Form.List  name="type_chambres" >
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
                    </Form.List> */}
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
    </div>
  );
};

export default UpdateContractClientForm;
