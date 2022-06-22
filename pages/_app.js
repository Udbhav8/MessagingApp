import { ChakraProvider } from '@chakra-ui/react';
import { useAuthState } from 'react-firebase-hooks/auth';
import Login from '../pages/login';
import { auth, db } from '../firebase';
import Loading from '../components/Loading';
import { useEffect } from 'react';
import { serverTimestamp, doc, setDoc, query, where, collection } from 'firebase/firestore';

function MyApp({ Component, pageProps }) {
	const [user, loading] = useAuthState(auth);
	useEffect(() => {
		if (user) {
			const userRef = doc(db, 'users', user.uid);
			setDoc(
				userRef,
				{ email: user.email, lastSeen: serverTimestamp(), photoURL: user.photoURL },
				{ merge: true }
			);
		}
	}, [user]);

	if (loading)
		return (
			<ChakraProvider>
				<Loading />
			</ChakraProvider>
		);
	if (!user)
		return (
			<ChakraProvider>
				<Login />
			</ChakraProvider>
		);
	return (
		<ChakraProvider>
			<Component {...pageProps} />
		</ChakraProvider>
	);
}

export default MyApp;
