import {
  Drawer,
  Input,
  Button,
  Avatar,
  VStack,
  HStack,
  IconButton,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Icon } from "@chakra-ui/react";
import { MdMessage, MdOutlineMoreVert, MdSearch } from "react-icons/md";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect } from "react";
import Chat from "./Chat";

export default function Sidebar() {
  const [chats, setChats] = useState([]);
  const [user] = useAuthState(auth);
  const userChatRef = collection(db, "chats");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const q = query(userChatRef, where("users", "array-contains", user.email));

  useEffect(() => {
    onSnapshot(q, (each) => setChats(each));
  }, [q]);

  const createChat = () => {
    const input = prompt(
      "Pleaser enter an Email Address for the User you wish to chat with"
    );
    if (!input) return null;
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      // we will add the chate into the db
      const chatRef = doc(db, "chats", input);
      setDoc(chatRef, { users: [user.email, input] });
    }
  };
  const chatAlreadyExists = (recepientEmail) => {
    !!chats?.docs.map(
      (chat) =>
        chat.data().users.find((user) => user === recepientEmail)?.length > 0
    );

    //!!chats.docs.find(chat => chat.data().users.find(user => user === recepientEmail)?.length > 0);
  };
  return (
    <Flex flexDir="column">
      <Flex
        justifyContent="space-between"
        p="15px"
        height="80px"
        borderBottom="1px"
        borderBottomColor="whitesmoke"
      >
        <Avatar
          onClick={() => signOut(auth)}
          cursor="pointer"
          _hover={{ opacity: 0.8 }}
          src={user.photoURL}
        ></Avatar>

        <HStack spacing="1px">
          <IconButton
            variant="ghost"
            colorScheme="teal"
            size="lg"
            m="3px"
            icon={<MdMessage />}
          />
          <IconButton
            variant="ghost"
            colorScheme="teal"
            size="lg"
            m="3px"
            icon={<MdOutlineMoreVert />}
          />
        </HStack>
      </Flex>
      <VStack
        p={{ base: "5px", md: "20px" }}
        borderRight="1px"
        borderRightColor="whitesmoke"
        h="100vh"
      >
        <HStack pb={{ base: "5px", md: "10px" }}>
          <Icon boxSize={9} as={MdSearch}></Icon>
          <Input
            w={{ base: "100px", md: "full" }}
            variant="filled"
            placeholder="Search"
          ></Input>
        </HStack>

        <Button
          w="full"
          colorScheme="teal"
          variant="ghost"
          onClick={createChat}
        >
          {isMobile ? "NEW CHAT" : "START A NEW CHAT"}
        </Button>

        {chats.docs?.map((chat) => (
          <Chat key={chat.id} users={chat.data().users} id={chat.id}></Chat>
        ))}
      </VStack>
    </Flex>
  );
}
