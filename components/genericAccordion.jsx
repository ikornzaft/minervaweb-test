import React from 'react';
import { Accordion } from '@chakra-ui/react';
import { AccordionGenericItem } from './accordionItem';

const GenericAccordion = ({
  section1Title,
  section1Content,
  section2Title,
  section2Content,
  section3Title,
  section3Content,
  section4Title,
  section4Content,
  section5Title,
  section5Content,
  section6Title,
  section6Content,
}) => {
  return (
    <Accordion allowToggle>
      <AccordionGenericItem title={section1Title} content={section1Content} />
      {section2Title ? (
        <AccordionGenericItem title={section2Title} content={section2Content} />
      ) : null}
      {section3Title ? (
        <AccordionGenericItem title={section3Title} content={section3Content} />
      ) : null}
      {section4Title ? (
        <AccordionGenericItem title={section4Title} content={section4Content} />
      ) : null}
      {section5Title ? (
        <AccordionGenericItem title={section5Title} content={section5Content} />
      ) : null}
      {section6Title ? (
        <AccordionGenericItem title={section6Title} content={section6Content} />
      ) : null}
    </Accordion>
  );
};

export { GenericAccordion };
