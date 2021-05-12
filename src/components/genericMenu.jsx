import React from 'react';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';
import { TiArrowSortedDown } from 'react-icons/ti';

const GenericMenu = ({
  buttonText,
  item1,
  item2,
  item3,
  item4,
  item5,
  item6,
  item7,
  item8
}) => {
  return (
    <Menu>
      <MenuButton as={Button} rightIcon={<TiArrowSortedDown />}>
        {buttonText}
      </MenuButton>
      <MenuList>
        <MenuItem>{item1}</MenuItem>
        {item2 ? <MenuItem>{item2}</MenuItem> : null}
        {item3 ? <MenuItem>{item3}</MenuItem> : null}
        {item4 ? <MenuItem>{item4}</MenuItem> : null}
        {item5 ? <MenuItem>{item5}</MenuItem> : null}
        {item6 ? <MenuItem>{item6}</MenuItem> : null}
        {item7 ? <MenuItem>{item7}</MenuItem> : null}
        {item8 ? <MenuItem>{item8}</MenuItem> : null}
      </MenuList>
    </Menu>
  );
};

export { GenericMenu };
