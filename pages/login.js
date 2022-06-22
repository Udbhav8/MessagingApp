import { Flex, Image, Button, Spacer, Center, VStack, HStack, Grid, Text } from '@chakra-ui/react';
import Head from 'next/head';
import { auth } from '../firebase'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
function Login() {
    const signIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider).catch(alert);
    }
    return (
        
		<Grid placeItems = 'center' h = '100vh' bg = 'whitesmoke'>
			<Head>
				<title>Login</title>
			</Head>

			<VStack bg = 'white' p = '100px' boxShadow = '2xl' mb = '10%' spacing = '40px' >
				<Image src="https://icon-library.com/images/android-messaging-app-icon/android-messaging-app-icon-21.jpg" />
                
                <Button onClick= {signIn} colorScheme="teal" variant='outline'> Sign in with Google </Button>
			</VStack>
		</Grid>
	);
}
export default Login;
