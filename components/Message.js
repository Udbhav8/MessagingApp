import { Spacer,VStack,Flex, Text } from "@chakra-ui/react"
import { getAuth } from "firebase/auth";
import { useAuthState } from"react-firebase-hooks/auth";
import React, { useState } from "react";

export default function Message({ user, message }) {
    const [userLoggedIn] = useAuthState(getAuth())
    
    return (
      <VStack bg="" alignItems={userLoggedIn.email === user ? "end" : ""}>
        {userLoggedIn.email === user ? (
          <Flex
            bg="teal.300"
            w="fit-content"
            p="15px"
            borderRadius="8px"
            margin="10px"
            minW="60px"
            alignText="right"
          >
            {message.message}
          </Flex>
        ) : (
          <Flex
            bg="gray.300"
            w="fit-content"
            p="15px"
            borderRadius="8px"
            margin="10px"
            minW="60px"
            alignText="right"
          >
            {message.message}
          </Flex>
        )}
      </VStack>
    );
}
