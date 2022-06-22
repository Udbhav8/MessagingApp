import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import {
  MdMessage,
  MdOutlineMoreVert,
  MdSearch,
  MdAttachFile,
  MdInsertEmoticon,
  MdOutlineInsertEmoticon,
} from "react-icons/md";
import { useCollection } from "react-firebase-hooks/firestore";
import {
  getFirestore,
  collection,
  doc,
  getDocs,
  addDoc,
  setDoc,
  query,
  orderBy,
  where,
  serverTimestamp,
} from "firebase/firestore";
import Message from "../components/Message";
import {
  Text,
  Icon,
  Drawer,
  Input,
  Button,
  Avatar,
  VStack,
  HStack,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import React, { useState } from "react";

export default function ChatScreen({ chat, messages }) {
 
  const [user] = useAuthState(getAuth());
  const [input, setInput] = useState("");
  const router = useRouter();
  const q = query(
    collection(getFirestore(), "chats", router.query.id, "messages"),
    orderBy("timestamp", "asc")
  );
  const q2 = query(
    collection(getFirestore(), "users",), where("email", "==", chat.users[1])
  );
  const [recepientSnapshot] = useCollection(q2);
  const [messagesSnapshot] = useCollection(q);

 // console.log(messagesSnapshot?.docs.map(message =>{console.log(message.data().message)}))
  const showMessages = () => {
    if (messagesSnapshot) {
      return messagesSnapshot?.docs.map(message => (
       
        <Message
          key={message?.id}
          user={message?.data().user}
          message={{
            ...message?.data(),
            timestamp: message?.data().timestamp?.toDate().getTime(),
          }}
        />
        
      
      ));
    }  else {
       return JSON.parse(messages).map(message => (
         <Message key = {message.id} user = {message.user} message = {message}/>
       ))
     }
  };
  const sendMessage = async e => {
    e.preventDefault();
    await setDoc(
      doc(getFirestore(), "users", user.uid),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );
    await addDoc(collection(getFirestore(), "chats", router.query.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      user: user.email,
      photoURL:user.photoURL
    })
    setInput(" ");
      
  };

  const lastSeen = () => (recepientSnapshot ? recepientSnapshot?.docs?.[0]?.data().lastSeen.toDate().toDateString(): "please login with this account")

  
  // const ref = collection(
  //   getFirestore(),
  //   "chats",
  //   context.query.id,
  //   "messages"
  // );

  return (
    <Flex flexDir="column" flex="1">
      <Flex
        justifyContent="space-between"
        p="15px"
        borderBottom="1px"
        borderBottomColor="whitesmoke"
      >
        <Flex>
          <Avatar src=""></Avatar>
          <VStack alignItems = 'left' pl="15px" fontWeight="bold">
            <Text size="sm">{ chat.users[1]} </Text>

            <Text lineHeight="3px" color="gray.500" size="xs">
              Last seen {lastSeen()}
            </Text>
          </VStack>
        </Flex>
        <HStack>
          <IconButton size="md" icon={<MdAttachFile />} />
          <IconButton size="md" icon={<MdOutlineMoreVert />} />
        </HStack>
      </Flex>

      {showMessages()}
      <Flex flexDir="column" p="20px">
        <HStack>
          <Icon as={MdOutlineInsertEmoticon} boxSize={8} />\
          <Input value={input} onChange={e => setInput(e.target.value)}></Input>
          <Button onClick = {sendMessage} disabled={!input}>Send Message</Button>
        </HStack>
      </Flex>
    </Flex>
  );
}
