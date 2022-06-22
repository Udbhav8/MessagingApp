import Head from 'next/head';
import Sidebar from '../components/Sidebar.js';
import { Flex,Box ,Text,VStack} from '@chakra-ui/react';

export default function Home() {
  return (
		<Flex >
      <Sidebar />
      
		</Flex>
  );
}
