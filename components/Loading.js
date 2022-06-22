import { Flex, Image, Button, Spacer, Center, VStack, HStack, Grid,Spinner } from '@chakra-ui/react';
import Head from 'next/head'

export default function Loading() {
	return (
		<Grid placeItems="center" h="100vh" bg="whitesmoke">
			<Head>
				<title>Login</title>
			</Head>

			<VStack bg="white" p="100px" boxShadow="2xl" mb="10%" spacing="40px">
				<Image src="https://icon-library.com/images/android-messaging-app-icon/android-messaging-app-icon-21.jpg" />

				<Spinner color = 'teal' size = 'xl'/>
				
			</VStack>
		</Grid>
	);
}
