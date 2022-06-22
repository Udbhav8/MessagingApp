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
  useBreakpointValue,
} from "@chakra-ui/react";
import db from "../firebase";
import { onSnapshot } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { useState, useEffect } from "react";
import {
  doc,
  setDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/router";

export default function Chat({ id, users }) {
  const router = useRouter();
  const [recepient, setRecepient] = useState([]);
  const recepientEmail = users[1];
  const q = query(
    collection(getFirestore(), "users"),
    where("email", "==", recepientEmail)
  );
  useEffect(() => {
    onSnapshot(q, (each) => setRecepient(each?.docs?.[0]?.data()));
  });

  const isMobile = useBreakpointValue({ base: true, md: false });

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };
  return (
    <HStack
      spacing="20px"
      p = '15px'
      _hover={{ bg: "#e9eaeb" }}
      onClick={enterChat}
      justifyContent={{ base: "center", md: "start" }}
    >
      <Avatar src={recepient?.photoURL}></Avatar>
      {isMobile ? null : <Box>{recepientEmail}</Box>}
    </HStack>
  );
}
