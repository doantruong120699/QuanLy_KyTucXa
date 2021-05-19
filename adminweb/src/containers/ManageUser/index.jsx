import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Student from "./Student";
import Employee from "./Employee";

export default function ManageUser() {
  return (
    <div style={{ fontSize: "30px" }}>
      <Tabs>
        <TabList style={{ borderBottom: "none", marginBottom: "50px" }}>
          <Tab>Sinh Viên</Tab>
          <Tab>Nhân Viên</Tab>
        </TabList>
        <TabPanel>
          <Student />
        </TabPanel>
        <TabPanel>
          <Employee />
        </TabPanel>
      </Tabs>
    </div>
  );
}
