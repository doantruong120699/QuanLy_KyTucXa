import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";
import "./WaterElectrical";
import "react-tabs/style/react-tabs.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WaterElectrical from "./WaterElectrical";
import Budget from "./Budget";
import "react-datepicker/dist/react-datepicker.css";

export default function Financial() {
  return (
    <div style={{ fontSize: "30px" }}>
      <Tabs>
        <TabList style={{ borderBottom: "none", marginBottom: "50px" }}>
          <Tab>Thu Chi</Tab>
          <Tab>Tiền Điện Nước</Tab>
        </TabList>
        <TabPanel>
          <Budget />
        </TabPanel>
        <TabPanel>
          <WaterElectrical />
        </TabPanel>
      </Tabs>
    </div>
  );
}
