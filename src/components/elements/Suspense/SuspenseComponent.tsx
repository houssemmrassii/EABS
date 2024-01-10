import React from "react";
import { Spin } from "antd";

const SuspenseComponent: React.FC = () => {
  return <Spin spinning={true} fullscreen />;
};

export default SuspenseComponent;
