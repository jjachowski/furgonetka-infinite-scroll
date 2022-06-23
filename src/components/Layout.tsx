import { Flex } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <Flex w='100%' align='center' justifyContent='center' direction='column'>
      <Flex
        w={['100%', '100%', '100%', '64rem']}
        align='center'
        justifyContent='center'
        direction='column'
      >
        {children}
      </Flex>
    </Flex>
  );
};
