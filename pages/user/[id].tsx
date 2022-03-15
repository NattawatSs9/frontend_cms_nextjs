import {
  Avatar,
  Box,
  Button,
  Center,
  Container,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { author } from "../../types/author";
import useSWR from "swr";
import axios from "axios";
import { API } from "../../api/API";
import { post } from "../../types/post";
import PostService from "../../service/PostService";
import PostCard from "../../component/card/PostCasd";
import Link from "next/link";

const UserPage = () => {
  const dummyAuthor: author = {
    id: "",
    name: "",
    url: "",
    description: "",
    link: "",
    slug: "",
    avatar_urls: {
      24: "",
      48: "",
      96: "",
    },
    meta: [],
    _links: {
      self: [],
      collection: [],
    },
  };
  const border = useColorModeValue("gray.400", "black.600")
  const [user, setUser] = useState<author>(dummyAuthor);
  const [post, setPost] = useState<post[]>();
  const router = useRouter();
  const { id } = router.query;
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(API.USER.GET + id, fetcher);
  useEffect(() => {
    const getPost = async () => {
      try {
        const result = await PostService.getAllPosts();
        const filter = result.data.filter((post: post) => {
          return post.author == id;
        });
        setPost(filter);
      } catch (err) {
        console.log(err);
      }
    };
    if (data) {
      setUser(data);
      getPost();
    }
  }, [data]);
  const getImage = () => {
    return user.avatar_urls["96"];
  };
  const routePost = (id: any) => {
    router.push(`/post/${id}`);
  };
  if (!user) {
    return <Box></Box>;
  } else {
    return (
      <Container paddingTop={10} maxW="container.lg">
        {user && post != undefined && (
          <Box>
            <Center>
              <Box>
                <Avatar size="2xl" name={user.name} src={getImage()} />
              </Box>
            </Center>
            <Center paddingTop={10}>
              <Text fontWeight={"semibold"} fontSize={"3xl"}>Name: {user.name}</Text>
            </Center>
            <Center>
              <Text fontSize={"2xl"}>description:</Text>
             
            </Center>
            <Center paddingTop={5}> <Box width={400} height={100} borderWidth={"1px"} borderColor={border}></Box></Center>
            <Center paddingTop={10}><Link href={user.link}><Text fontSize={"xl"} color="blue.600" fontWeight={"semibold"} style={{textDecoration: "underline", cursor: "pointer"}}>Go to profile</Text></Link></Center>

            <Text fontSize={"3xl"} fontWeight={"semibold"} paddingTop={30}>
              All Post
            </Text>
            <SimpleGrid columns={[2, null, 3]} spacing={"5px"} paddingTop={10} paddingBottom={5}>
              {post.map((data, index) => {
                return (
                  <Box key={index}>
                    <Box
                      borderRadius={10}
                      borderWidth={"thin"}
                      borderColor={border}
                      style={{ cursor: "pointer" }}
                      display={"flex"}
                      alignItems={"center"}
                      onClick={() => routePost(data.id)}
                      key={index}
                      padding={5}
                      height={200}
                    >
                      <Box>{data.title.rendered}</Box>
                    </Box>
                  </Box>
                );
              })}
            </SimpleGrid>
          </Box>
        )}
      </Container>
    );
  }
};

export default UserPage;
