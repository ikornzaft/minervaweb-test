import React from 'react';
import { Container, Stack, Heading } from '@chakra-ui/react';
import { GenericMenu } from '../components/genericMenu';
import { BasicPopover } from '../components/basicPopover';
import { StyledPopover } from '../components/styledPopover';
import { LABELS } from '../locals/sp/labels';
import { GenericAccordion } from '../components/genericAccordion';
import { GenericTabs } from '../components/genericTabs';

const DeTodo = () => {
  return (
    <Container
      maxWidth="container.lg"
      alignSelf="center"
      backgroundColor="gray.50"
      padding="0px"
    >
      <Stack direction="column" textAlign="center">
        <Stack
          backgroundColor="gray.50"
          alignItems="center"
          padding={2}
          paddingBottom={8}
          spacing={6}
        >
          <Heading>De todo un poco</Heading>

          <GenericMenu
            buttonText={LABELS.DE_TODO.MENU.BUTTON_TEXT}
            item1={LABELS.DE_TODO.MENU.ITEM_1}
            item2={LABELS.DE_TODO.MENU.ITEM_2}
            item3={LABELS.DE_TODO.MENU.ITEM_3}
            item4={LABELS.DE_TODO.MENU.ITEM_4}
            item5={LABELS.DE_TODO.MENU.ITEM_5}
          />

          <BasicPopover
            buttonText={LABELS.DE_TODO.POPOVER_1.BUTTON_TEXT}
            header={LABELS.DE_TODO.POPOVER_1.HEADER}
            body={LABELS.DE_TODO.POPOVER_1.BODY}
          />

          <StyledPopover
            buttonText={LABELS.DE_TODO.POPOVER_2.BUTTON_TEXT}
            header={LABELS.DE_TODO.POPOVER_2.HEADER}
            body={LABELS.DE_TODO.POPOVER_2.BODY}
            footerContent={LABELS.DE_TODO.POPOVER_2.FOOTER.CONTENT}
            footerButton1Text={LABELS.DE_TODO.POPOVER_2.FOOTER.BUTTON_1_TEXT}
            footerButton2Text={LABELS.DE_TODO.POPOVER_2.FOOTER.BUTTON_2_TEXT}
          />

          <Container padding={4}>
            <GenericAccordion
              section1Title={LABELS.DE_TODO.ACCORDION.SECTION_1.TITLE}
              section1Content={LABELS.DE_TODO.ACCORDION.SECTION_1.CONTENT}
              section2Title={LABELS.DE_TODO.ACCORDION.SECTION_2.TITLE}
              section2Content={LABELS.DE_TODO.ACCORDION.SECTION_2.CONTENT}
            />
          </Container>
          {/* Tabs */}
          <Container>
            <GenericTabs
              tab1Title={LABELS.DE_TODO.TABS.TAB_1.TITLE}
              tab1Content={LABELS.DE_TODO.TABS.TAB_1.CONTENT}
              tab2Title={LABELS.DE_TODO.TABS.TAB_2.TITLE}
              tab2Content={LABELS.DE_TODO.TABS.TAB_2.CONTENT}
              tab3Title={LABELS.DE_TODO.TABS.TAB_3.TITLE}
              tab3Content={LABELS.DE_TODO.TABS.TAB_3.CONTENT}
            />
          </Container>
        </Stack>
      </Stack>
    </Container>
  );
};

export { DeTodo };
