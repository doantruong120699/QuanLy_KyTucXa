import "react-tabs/style/react-tabs.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Student from "./Student";
import Employee from "./Employee";

export default function ManageUser() {
  return (
    <div style={{ margin: "0px 90px"}}>
      <Tabs>
        <TabList style={{ marginBottom: "20px" }}>
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
