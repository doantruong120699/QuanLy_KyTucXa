import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";
import "./WaterElectrical";
import "react-tabs/style/react-tabs.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WaterElectrical from "./WaterElectrical";

export default function Financial() {
  return (
    <div style={{ fontSize: "30px" }}>
      <Tabs>
        <TabList style={{ borderBottom: "none",marginBottom:"50px" }}>
          <Tab>Thu Chi</Tab>
          <Tab>Tiền Điện Nước</Tab>
        </TabList>
        <TabPanel>
          <div style={{ color: "red" }}>
            Sorry các bạn nhưng trong cái này chưa có clq gì cả :D
          </div>{" "}
        </TabPanel>
        <TabPanel>
          <WaterElectrical />
        </TabPanel>
      </Tabs>
    </div>
  );
}
