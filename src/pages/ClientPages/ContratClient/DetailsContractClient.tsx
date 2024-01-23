import { useGlobal } from "@/context/GlobalContext";
import { Button, Descriptions, Divider } from "antd";
import type { DescriptionsProps } from "antd";
import dayjs from "dayjs";

const DetailsContractClient = () => {
  const { selectedContractRecord, setSelectedEtabRecord } = useGlobal();
  const [items, setItems] = useState<DescriptionsProps["items"]>([]);
  const [itemsChambres, setItemsChambres] = useState<
    DescriptionsProps["items"][]
  >([]);

  const Navigate = useNavigate();

  useEffect(() => {
    const tempItems: DescriptionsProps["items"] = [
      {
        key: "1",
        label: "Nom Client",
        children: selectedContractRecord?.etablissement?.name || "N/A",
      },
      {
        key: "2",
        label: "Nom Group",
        children:
          selectedContractRecord?.etablissement?.group_data?.name || "N/A",
      },
      {
        key: "3",
        label: "Date de début",
        children:
          dayjs(selectedContractRecord?.start_date).format("DD/MM/YYYY") ||
          "N/A",
      },
      {
        key: "4",
        label: "Date fin",
        children:
          dayjs(selectedContractRecord?.end_date).format("DD/MM/YYYY") || "N/A",
      },
      {
        key: "5",
        label: "Fractionnement",
        children: selectedContractRecord?.fractionnement?.name || "N/A",
      },
    ];

    const tempItemsChambres: DescriptionsProps["items"][] =
      selectedContractRecord?.type_chambres?.map((elem: any, index: number) => {
        return [
          {
            key: index.toString(),
            label: "Nom chambre",
            children: elem?.name || elem?.id || "N/A",
          },
          {
            key: index.toString(),
            label: "N° chambre",
            children: elem?.num_chambres || "N/A",
          },
          {
            key: index.toString(),
            label: "Prix d'achat",
            children: elem?.prix_achat || "N/A",
          },
          {
            key: index.toString(),
            label: "Pax",
            children: elem?.default_pax || "N/A",
          },
        ];
      });

    setItems(tempItems);
    setItemsChambres(tempItemsChambres);
  }, []);

  const handleNavigateToClient = () => {
    setSelectedEtabRecord(selectedContractRecord?.etablissement);
    Navigate(
      "/dashboard/etablissement-details/" +
        selectedContractRecord?.etablissement?.id
    );
  };
  return (
    <div>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: 13,
          padding: "1rem 1rem",
        }}
      >
        <Descriptions
          items={items}
          extra={
            <Button onClick={handleNavigateToClient} type="primary">
              Details de l'etablissement
            </Button>
          }
        />
        <Divider orientation="left">Types Chambres</Divider>
        {itemsChambres?.map((elem, index) => {
          return <Descriptions title={"Chambre " + (index + 1)} items={elem} />;
        })}
      </div>
    </div>
  );
};

export default DetailsContractClient;
