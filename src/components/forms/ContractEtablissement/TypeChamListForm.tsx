import { Col, Form, Input, InputNumber, Row, Select, Typography } from "antd";

type Props = {
  restField: any;
  name: any;
  key: any;
  data: any;
};

const TypeChamListForm = (props: Props) => {
  const { restField, name, key, data } = props;

  return (
    <Col span={12} key={key} style={{ marginBottom: "1rem" }}>
      <Row
        gutter={16}
        style={{
          border: "1px solid #D9D9D9",
          borderRadius: 13,
          padding: ".5rem 1rem",
        }}
      >
        <Col span={24}>
          <Typography.Text strong style={{ fontSize: 18 }}>
            {data[restField?.fieldKey]?.name}
          </Typography.Text>
        </Col>
        <Col span={12}>
          <Form.Item
            {...restField}
            label="Prix d'achat"
            name={[name, "prix_achat"]}
            rules={[{ required: true, message: "Champ requis" }]}
          >
            <InputNumber style={{ width: "100%" }} controls={false} />
          </Form.Item>
        </Col>

        {data[restField?.fieldKey]?.modalite_achat === "Par Pax" && (
          <Col span={12}>
            <Form.Item
              // rules={[{ required: true, message: "Champ requis" }]}
              {...restField}
              label="Déf"
              name={[name, "def"]}
            >
              <Select />
            </Form.Item>
          </Col>
        )}
        <Col span={24}>
          <Form.Item
            rules={[{ required: true, message: "Champ requis" }]}
            {...restField}
            label="Numéros de chambre"
            name={[name, "num_chambre"]}
          >
            <InputNumber style={{ width: "100%" }} controls={false} />
          </Form.Item>
        </Col>
      </Row>
    </Col>
  );
};

export default TypeChamListForm;
