import React, { useEffect, useState } from "react";
import { Badge, Button, Popconfirm, Space, Table, Modal, message } from "antd";
import { DeleteOutlined, EditTwoTone, EyeOutlined } from "@ant-design/icons";
import { getReservationsService, deleteReservationService } from "@services/Reservation";
import ReservationForm from "@forms/Reservation/ReservationForm";
import { useReservationContext } from "@/context/ReservationContext";
import { ColumnsType } from "antd/es/table";
import { Reservation } from "@/types";  // Adjust the path as needed

const ReservationPage: React.FC = () => {
  const { tableData, setTableData } = useReservationContext();
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentRecord, setCurrentRecord] = useState<Reservation | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const reservations = await getReservationsService();
        setTableData(reservations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        message.error("Erreur lors de la récupération des réservations.");
        setLoading(false);
      }
    };
    fetchData();
  }, [setTableData]);

  const handleDelete = async (reservationId: number) => {
    try {
      await deleteReservationService(reservationId);
      setTableData(prevTableData => prevTableData.filter(reservation => reservation.id !== reservationId));
      message.success("Réservation supprimée avec succès.");
    } catch (error) {
      console.error("Error deleting reservation:", error);
      message.error("Erreur lors de la suppression de la réservation.");
    }
  };

  const handleEdit = (record: Reservation | null) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  const handleView = (record: Reservation) => {
    console.log("View details for:", record);
    // Implement view logic or modal display here
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleFormSubmit = (data: Reservation) => {
    setTableData(prevTableData => {
      if (currentRecord) {
        return prevTableData.map(item => item.id === data.id ? data : item);
      } else {
        return [...prevTableData, { ...data, key: data.id }];
      }
    });
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const columns: ColumnsType<Reservation> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record: Reservation) => (
        <Space>
          <Popconfirm title="Sure to delete?" onConfirm={() => handleDelete(record.id)}>
            <a>Delete <DeleteOutlined /></a>
          </Popconfirm>
          <a onClick={() => handleEdit(record)}>Edit <EditTwoTone /></a>
          <a onClick={() => handleView(record)}>View <EyeOutlined /></a>
        </Space>
      )
    }
  ];

  // Sample data for contracts, replace with actual data
  const establishmentContracts = [
    { label: "Contract 1", value: 1 },
    { label: "Contract 2", value: 2 }
  ];

  const clientContracts = [
    { label: "Contract A", value: 'A' },
    { label: "Contract B", value: 'B' }
  ];

  return (
    <>
      <Button onClick={() => handleEdit(null)}>Add New Reservation</Button>
      <Table
        columns={columns}
        dataSource={tableData ?? []}
        loading={loading}
        pagination={{ pageSize: 15 }}
        scroll={{ x: "max-content" }}
      />
      <Modal
        title={currentRecord ? "Edit Reservation" : "Add New Reservation"}
        visible={isModalVisible}
        onCancel={handleModalCancel}
        footer={null}
      >
        <ReservationForm
          initialData={currentRecord}
          onSubmit={handleFormSubmit}
          establishmentContracts={establishmentContracts}
          clientContracts={clientContracts}
        />
      </Modal>
    </>
  );
};

export default ReservationPage;
