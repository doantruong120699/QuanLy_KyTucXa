import React, { useState } from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import "./styles.css";
import "./WaterElectrical";
import "react-tabs/style/react-tabs.css";

import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import WaterElectrical from "./WaterElectrical";
import Budget from "./Budget";
import Contract from "./Contract";
import "react-datepicker/dist/react-datepicker.css";

export default function Financial() {
  return (
    <div>
      <Tabs>
        <TabList>
          <Tab>
            <span>Thu Chi</span>
          </Tab>
          <Tab>
            <span>Tiền Điện Nước</span>
          </Tab>
          <Tab>
            <span style={{ fontSize: "20px" }}>Hoá đơn/ Hợp đồng</span>
          </Tab>
        </TabList>
        <TabPanel>
          <Budget />
        </TabPanel>
        <TabPanel>
          <WaterElectrical />
        </TabPanel>
        <TabPanel>
          <Contract />
        </TabPanel>
      </Tabs>
    </div>
  );
}
