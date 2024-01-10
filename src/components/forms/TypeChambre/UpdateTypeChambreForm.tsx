import { patchTypeChambre } from "@/services/Factory";
import { TypeChambreDataType } from "@/types";
import { PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Collapse,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Space,
  Typography,
  message,
} from "antd";

type Props = {
  dataSource: TypeChambreDataType[];
  setDataSource: (data: TypeChambreDataType[]) => void;
  recordData: TypeChambreDataType | undefined;
  setEditing: React.Dispatch<React.SetStateAction<TypeChambreDataType | null>>;
};

const UpdateTypeChambreForm = (props: Props) => {
  const { dataSource, setDataSource, recordData, setEditing } = props;
  const [active, setActive] = useState(false);

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
      const data = await patchTypeChambre(values, recordData?.id as number);

      setDataSource([
        ...dataSource.map((elem) =>
          elem?.id !== recordData?.id ? elem : data
        ),
      ]);
      resetAndClose();
      message.success("Le type chambre a été modifier avec succès.");
      setEditing(null);
    } catch (error) {
      message.error(error as string);
    }
  };

  useEffect(() => {
    if (recordData) {
      form.setFieldsValue({
        name: recordData?.name,
        type_pension: recordData?.type_pension,
        modalite_achat: recordData?.modalite_achat,
        modalite_vente: recordData?.modalite_vente,
        num_min_occupants: recordData?.num_min_occupants,
        num_defaut_occupants: recordData?.num_defaut_occupants,
        num_max_occupants: recordData?.num_max_occupants,
        active: recordData?.active,
      });
    }
  }, [recordData]);

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
        expandIconPosition={"end"}
        items={[
          {
            key: "1",
            label: (
              <Typography.Text strong>
                Edition de {recordData?.name}
              </Typography.Text>
            ),
            children: (
              <Form
                layout="vertical"
                name="type-chambre-form"
                initialValues={{ active: true }}
                onFinish={onFinish}
                form={form}
                size="large"
              >
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="Type Chambre"
                      name="name"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez sélectionner le type de chambre !",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Type de pension"
                      name="type_pension"
                      rules={[
                        {
                          required: true,
                          message: "Veuillez sélectionner le type de pension !",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Demi-pension">
                          Demi-pension
                        </Select.Option>
                        <Select.Option value="Pension complète">
                          Pension complète
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Modalite d'achat"
                      name="modalite_achat"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez sélectionner la modalite d'achat !",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Standard">Standard</Select.Option>
                        <Select.Option value="Par Pax">Par Pax</Select.Option>
                        <Select.Option value="Forfaitaire">
                          Forfaitaire
                        </Select.Option>
                        <Select.Option value="Par mois">Par mois</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Modalite de vente"
                      name="modalite_vente"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez sélectionner la modalite de vente !",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="Standard">Standard</Select.Option>
                        <Select.Option value="Par Pax">Par Pax</Select.Option>
                        <Select.Option value="Forfaitaire">
                          Forfaitaire
                        </Select.Option>
                        <Select.Option value="Par mois">Par mois</Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Nbr. minimum d'occupants"
                      name="num_min_occupants"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez saisir le nbr. minimum d'occupants",
                        },
                      ]}
                    >
                      <InputNumber controls={false} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Nbr. par défaut d'occupants:"
                      name="num_defaut_occupants"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez saisir le nbr. par défaut d'occupants:",
                        },
                      ]}
                    >
                      <InputNumber controls={false} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item
                      label="Nbr. maximum d'occupants"
                      name="num_max_occupants"
                      rules={[
                        {
                          required: true,
                          message:
                            "Veuillez saisir le nbr. maximum d'occupants",
                        },
                      ]}
                    >
                      <InputNumber controls={false} style={{ width: "100%" }} />
                    </Form.Item>
                  </Col>
                  <Col span={6}>
                    <Form.Item name="active" label="État">
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
                    </Form.Item>
                  </Col>
                </Row>
                <Form.Item>
                  <Flex justify="center">
                    <Space>
                      <Button
                        onClick={() => {
                          setEditing(null);
                        }}
                      >
                        Annuler
                      </Button>
                      <Button type="primary" htmlType="submit">
                        Modifier
                      </Button>
                    </Space>
                  </Flex>
                </Form.Item>
              </Form>
            ),
          },
        ]}
      />

      <Divider orientation="center" />
    </div>
  );
};

export default UpdateTypeChambreForm;
