import {
  Drawer,
  Input,
  Button,
  Avatar,
  VStack,
  HStack,
  IconButton,
  Flex,
  Box,
} from "@chakra-ui/react";
import Head from "next/head";
import ChatScreen from "../../components/ChatScreen";
import Sidebar from "../../components/Sidebar";
import auth from "../../firebase";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  orderBy,
  getDoc,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import chat from "../chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

function Chat({chat,messages}) {

  const [user] = useAuthState(getAuth());
  
  return (
    <Flex>
      <Head>
        <title>Chat with { chat.users[1]}</title>
      </Head>
      <Sidebar />

      <Flex flex="1" overflow="scroll" h="100vh">
        <ChatScreen chat={chat} messages = {messages} />
      </Flex>
    </Flex>
  );
}

export default Chat;

export async function getServerSideProps(context) {
  const ref = collection(getFirestore(), "chats", context.query.id, "messages");
  const messagesRes = await getDocs(query(ref, orderBy("timestamp", "asc")));
  const messages = messagesRes.docs
    .map(doc => ({
      id: doc.id,
      ...doc.data(),
    }))
    .map(messages => ({
      ...messages,
      timestamp: messages.timestamp.toDate().getTime(),
    }));

  //Prep The chats
  const chatRes = await getDoc(doc(getFirestore(), "chats", context.query.id));
  const chat = {
    id: chatRes.id,
    ...chatRes.data(),
  };
  
  return {
    props: {
      messages: JSON.stringify(messages),
      chat: chat,
    },
  };
}
