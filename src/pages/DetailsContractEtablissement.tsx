import { useGlobal } from "@/context/GlobalContext";
import { Typography } from "antd";
import React from "react";

type Props = {};

const DetailsContractEtablissement = (props: Props) => {
  const { selectedContractRecord } = useGlobal();
  return (
    <div>
      <Typography.Text>
        <pre>{JSON.stringify(selectedContractRecord, null, 2)}</pre>
      </Typography.Text>
    </div>
  );
};

export default DetailsContractEtablissement;
