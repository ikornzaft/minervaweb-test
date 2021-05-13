import React from 'react';
import { Tab, Tabs, TabPanel, TabPanels, TabList } from '@chakra-ui/react';

const GenericTabs = ({
  tab1Title,
  tab1Content,
  tab2Title,
  tab2Content,
  tab3Title,
  tab3Content,
  tab4Title,
  tab4Content,
  tab5Title,
  tab5Content,
  tab6Title,
  tab6Content,
}) => {
  return (
    <Tabs>
      <TabList>
        <Tab>{tab1Title}</Tab>
        {tab2Title ? <Tab>{tab2Title}</Tab> : null}
        {tab3Title ? <Tab>{tab3Title}</Tab> : null}
        {tab4Title ? <Tab>{tab4Title}</Tab> : null}
        {tab5Title ? <Tab>{tab5Title}</Tab> : null}
        {tab6Title ? <Tab>{tab6Title}</Tab> : null}
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>{tab1Content}</p>
        </TabPanel>
        {tab2Title ? (
          <TabPanel>
            <p>{tab2Content}</p>
          </TabPanel>
        ) : null}
        {tab3Title ? (
          <TabPanel>
            <p>{tab3Content}</p>
          </TabPanel>
        ) : null}
        {tab4Title ? (
          <TabPanel>
            <p>{tab4Content}</p>
          </TabPanel>
        ) : null}
        {tab5Title ? (
          <TabPanel>
            <p>{tab5Content}</p>
          </TabPanel>
        ) : null}
        {tab6Title ? (
          <TabPanel>
            <p>{tab6Content}</p>
          </TabPanel>
        ) : null}
      </TabPanels>
    </Tabs>
  );
};

export { GenericTabs };
