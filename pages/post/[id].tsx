import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Input,
  SimpleGrid,
  Stack,
  Text,
  Textarea,
  useColorModeValue
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { author } from "../../types/author";
import useSWR from "swr";
import axios from "axios";
import { API } from "../../api/API";
import { post } from "../../types/post";
import UserService from "../../service/UserService";
import CommentService from "../../service/CommentService";
import styles from "../../styles/Home.module.css";
import TagService from "../../service/TagService";
import Tag from "../../component/button/Tag";
import { comment, postcomment } from "../../types/comment";
import Category from "../../component/button/Category";

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
  const dummyPost: post = {
    id: 0,
    date: "",
    date_gmt: "",
    guid: {
      rendered: "",
    },
    modified: "",
    modified_gmt: "",
    slug: "",
    status: "",
    type: "",
    link: "",
    title: {
      rendered: "",
    },
    content: {
      rendered: "",
      protected: false,
    },
    excerpt: {
      rendered: "",
      protected: false,
    },
    author: "0",
    featured_media: 0,
    comment_status: "",
    ping_status: "",
    sticky: false,
    template: "",
    format: "",
    meta: [],
    categories: [],
    tags: [],
    _link: undefined,
  };
  const [user, setUser] = useState<author>(dummyAuthor);
  const [post, setPost] = useState<post>(dummyPost);
  const [comment, setComment] = useState<comment[]>([]);
  const [mycomment, setMyComment] = useState<string>("");
  const [myname, setMyName] = useState<string>("");
  const router = useRouter();
  const id = router.query.id as string;
  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data, error } = useSWR(API.POST.GET + id, fetcher);
  useEffect(() => {
    const getUser = async () => {
      try {
        const result = await UserService.getUserById(data.author);
        setUser(result.data);
      } catch (err) {
        console.log(err);
      }
    };

    const getComment = async () => {
      try {
        const result = await CommentService.getAllPosts();
        const filter = result.data.filter((comment: any) => {
          return comment.post == id;
        });
        setComment(filter);
      } catch (err) {
        console.log(err);
      }
    };
    if (data) {
      setPost(data);
      getUser();
      getComment();
    }
  }, [data]);
  const getImage = () => {
    return user.avatar_urls["96"];
  };

  const routeToUser = (id: any) => {
    router.push({
      pathname: `/user/${id}`,
    });
  };

  const commentPost = async() => {
    if (myname == "" || mycomment == ""){
        alert("Invalid input")
        return
    }
    try {
        let obj : postcomment = {
            author_name: myname,
            post: parseInt(id),
            content: mycomment
        }
        let obj2 : comment = {
            id: 100,
            post: parseInt(id),
            parent: 0,
            author: 9,
            author_name: myname,
            author_url: "www.google.com",
            date: "",
            date_gmt: "",
            content: {
                rendered: mycomment
            },
            link: "",
            status: "approved",
            type: "comment",
            author_avatar_urls: {
                24: "",
                48: "https://secure.gravatar.com/avatar/?s=48&d=mm&r=g",
                96: ""
            },
            meta: [],
            _link: undefined
        }
        let newcomment = [...comment]
        newcomment.push(obj2)
        setComment(newcomment)
        const result = await CommentService.createComment(obj)
        console.log(result)
        setMyName("")
        setMyComment("")
    }
    catch(err){
        console.error(err)
    }
  };
  let handleInputChange = (e : any) => {
    let inputValue = e.target.value
    setMyComment(inputValue)
  }
  let handleNameChange = (e : any) => {
    let inputValue = e.target.value
    setMyName(inputValue)
  }
  if (!post) {
    return <Box></Box>;
  } else {
    return (
      <Container maxW="container.lg">
        {post && (
          <Box paddingTop={10}>
            <Box
              className={styles.head}
              display={"flex"}
              justifyContent={"flex-start"}
              alignItems={"center"}
            >
              <Avatar
                className={styles.avatar}
                size="md"
                name={user.name}
                src={getImage()}
                onClick={() => routeToUser(user.id)}
              />
              <Text>{user.name}</Text>
            </Box>
            <Stack direction={"row"} display={"flex"} alignItems={"center"}>
                <Text fontWeight={"bold"}>Tags :</Text>
              {post.tags.map((data, index) => {
                return (
                  <Box key={index}>
                    <Tag tagId={data} />
                  </Box>
                );
              })}
                <Text fontWeight={"bold"}>Categories :</Text>

              {post.categories.map((data, index) => {
                return (
                  <Box key={index}>
                    <Category cateId={data} />
                  </Box>
                );
              })}
            </Stack>

            <Divider style={{ marginTop: 15 }} />
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text
                fontSize={"4xl"}
                className={styles.content}
                fontWeight={"bold"}
              >
                {post.title.rendered}
              </Text>
            </Box>
            <Box
              display={"flex"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Text fontSize={"xl"} fontWeight={"semibold"}>
                {post.date.replace("T", " ")}
              </Text>
            </Box>
            <Box padding={5}>
              <div
                dangerouslySetInnerHTML={{ __html: post.content.rendered }}
              />
            </Box>
            <Divider style={{ marginBottom: 15 }} />
            <Text fontSize={"3xl"} fontWeight={"bold"} marginBottom={5}>
              Comment
            </Text>
            <Input value={myname} onChange={handleNameChange} style={{width: "auto"}} placeholder="Enter your name" marginBottom={3} />
            <Textarea
              value={mycomment}
              onChange={handleInputChange}
              placeholder="Enter your comment"
              colorScheme={useColorModeValue("gray.400", "black.600")}

            ></Textarea>
            
            <Button style={{ marginTop: 10 }} onClick={() => commentPost()} marginBottom={5}>
              Comment
            </Button>

            {comment.map((data, index) => {
              return (
                <Box key={index} borderWidth={"1px"} padding={5} borderColor={useColorModeValue("gray.400", "black.600")}>
                  <Stack
                    direction={"row"}
                    style={{ paddingBottom: 15, paddingTop: 15 }}
                    display={"flex"}
                    alignItems={"center"}
                  >
                    <Avatar
                      size="md"
                      name={data.author_name}
                      src={data.author_avatar_urls["48"]}
                      onClick={() => routeToUser(user.id)}
                    />
                    <Text width={120} paddingLeft={2} fontWeight={"bold"} fontSize={"xl"}>{data.author_name}</Text>
                    <Text fontWeight={"bold"} fontSize={"xl"}>:</Text>

                    <Box paddingLeft={5}>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: data.content.rendered,
                        }}
                      ></div>
                    </Box>
                  </Stack>
                </Box>
              );
            })}
            <Divider paddingTop={5} paddingBottom={5}/>
          </Box>
        )}

      </Container>
    );
  }
};

export default UserPage;
