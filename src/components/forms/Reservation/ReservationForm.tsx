// src/components/ReservationForm.tsx
import React, { useCallback } from 'react';
import { Form, Button, Select, DatePicker, message, Collapse, Typography, Row, Col, Divider } from 'antd';
import { postReservationService } from "@services/Reservation";
import moment from 'moment';
import 'moment/locale/fr';
import { CaretLeftFilled } from '@ant-design/icons';
import { Reservation, ReservationFormProps, ReservationPayload } from "@/types/index";
import { useReservationContext } from "@/context/ReservationContext";

moment.locale('fr');

const ReservationForm: React.FC<ReservationFormProps> = ({ initialData, onSubmit, establishmentContracts, clientContracts }) => {
  const [form] = Form.useForm();
  const { addToTableData } = useReservationContext();

  const onFinish = useCallback(async (values: any) => {
    try {
      let contratClientNumber: number;
  
      if (typeof values.contratClient === 'object' && 'number' in values.contratClient) {
        contratClientNumber = values.contratClient.number;
      } else {
        contratClientNumber = values.contratClient;
      }
  
      const formattedValues: ReservationPayload = {
        ...values,
        contratClient: contratClientNumber,
        periodeTotal: {
          startDate: values.periodeTotal[0].format('YYYY-MM-DD'),
          endDate: values.periodeTotal[1].format('YYYY-MM-DD')
        }
      };
  
      await postReservationService(formattedValues);
      message.success("Réservation ajoutée avec succès.");
      addToTableData(formattedValues); // Add to context
      onSubmit(formattedValues);
      form.resetFields();
    } catch (error) {
      console.error("Error posting reservation:", error);
      message.error("Échec de l'ajout de la réservation. Veuillez réessayer.");
    }
  }, [onSubmit, addToTableData]);
  
  
  
  return (
    <div>
      <Collapse
        expandIcon={({ isActive }) => (
          <CaretLeftFilled rotate={isActive ? -90 : 0} />
        )}
        defaultActiveKey={['1']}
        expandIconPosition="end"
      >
        <Collapse.Panel
          header={<Typography.Text strong>Ajouter une réservation</Typography.Text>}
          key="1"
        >
          <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            initialValues={initialData ? {
              ...initialData,
              periodeTotal: [moment(initialData.periodeTotal.startDate), moment(initialData.periodeTotal.endDate)]
            } : { active: true }}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Type de réservation"
                  name="typeDeReservation"
                  rules={[{ required: true, message: 'Veuillez sélectionner un type de réservation !' }]}
                >
                  <Select placeholder="Sélectionner un type">
                    <Select.Option value="type1">Type 1</Select.Option>
                    <Select.Option value="type2">Type 2</Select.Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Période totale"
                  name="periodeTotal"
                  rules={[{ required: true, message: 'Veuillez sélectionner une période !' }]}
                >
                  <DatePicker.RangePicker />
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Contrat établissement"
                  name="contratEtablissement"
                  rules={[{ required: true, message: 'Veuillez sélectionner un contrat d\'établissement !' }]}
                >
                  <Select placeholder="Sélectionner un contrat d'établissement">
                    {establishmentContracts.map(contract => (
                      <Select.Option key={contract.value} value={contract.value}>
                        {contract.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Contrat client"
                  name="contratClient"
                  rules={[{ required: true, message: 'Veuillez sélectionner un contrat client !' }]}
                >
                  <Select placeholder="Sélectionner un contrat client">
                    {clientContracts.map(contract => (
                      <Select.Option key={contract.value} value={contract.value}>
                        {contract.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <Button onClick={() => form.resetFields()} style={{ marginRight: 8 }}>
                  Annuler
                </Button>
                <Button type="primary" htmlType="submit">
                  Confirmer
                </Button>
              </Col>
            </Row>
          </Form>
        </Collapse.Panel>
      </Collapse>
      <Divider />
    </div>
  );
                    }  