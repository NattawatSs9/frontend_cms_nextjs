import { ReactNode }from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
} from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import styles from  "../../styles/Home.module.css"
import { useRouter } from 'next/router';

export default function Navbar({ children } : any) {
  const router=  useRouter()
  const { colorMode, toggleColorMode } = useColorMode();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const background = useColorModeValue('#E2D4C1', '#111211')
  return (
    <>
      <Box bg={background} px={4} position={'fixed'} width={'100%'} zIndex={1000}>
        <Flex h={16} alignItems={'center'} justifyContent={'flex-end'}>
        <Button marginRight={5} onClick={() => router.push("/")}>Home</Button>
          <Flex alignItems={'center'}>
            <Stack direction={'row'} spacing={7} display={"flex"} alignItems={"center"}>
              <Button className={styles.circle} onClick={toggleColorMode} >
                {colorMode === 'light' ? <MoonIcon boxSize={6} /> : <SunIcon boxSize={6} />}
              </Button>
            </Stack>
          </Flex>
        </Flex>
      </Box>
    </>
  );
}