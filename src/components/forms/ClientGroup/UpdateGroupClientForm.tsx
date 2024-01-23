import React, { Key } from "react";

import { Button, Row, Form, Input, Col, Select, Collapse, Divider } from "antd";

import { EditOutlined, BuildOutlined } from "@ant-design/icons";
import { useGroupClientContext } from "@/context/GroupClientContext";
import { updateClientGroupsService } from "@/services/ClientGroup";


interface UpdateEtablissementFormProps {
  idRecord: Key | undefined;
  setEditing: React.Dispatch<
    React.SetStateAction<React.Key | null | undefined>
  >;
}
interface DataType {
  key: number;
  name: string;
  status: boolean;
}
const UpdateGroupEtablissementForm: React.FC<UpdateEtablissementFormProps> = ({
  idRecord,
  setEditing,
}) => {
  const [active, setActive] = useState(true);
  const { updateRecord, getRecord } = useGroupClientContext();
  const [recordData, setRecordData] = useState<DataType>();

  useEffect(() => {
    if (idRecord) {
      let record = getRecord(idRecord);
      setRecordData(record);
      form.setFieldsValue({
        name: record?.name,
        active: record?.status,
      });
    }
  }, []);

  const [form] = Form.useForm();
  const resetAndClose = () => {
    form.resetFields();
    setActive(false);
    setEditing(null);
  };
  const onFinish = async (values: any) => {
    try {
      await updateClientGroupsService(idRecord as number, values);
      updateRecord(idRecord as Key, {
        key: idRecord as number,
        name: values.name,
        status: values.active,
      });
      setTimeout(() => {
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
        expandIcon={() => <EditOutlined style={{ fontSize: "20px" }} />}
        activeKey={active ? "1" : "0"}
        onChange={callback}
        expandIconPosition={"end"}
        collapsible="disabled"
        items={[
          {
            key: "1",
            label: `Edition de ${recordData?.name}`,
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
                      label="Group client :"
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

export default UpdateGroupEtablissementForm;
