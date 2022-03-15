import { Box, Divider, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostService from "../../service/PostService";
import UserService from "../../service/UserService";
import { Avatar } from "@chakra-ui/react";
import { author } from "../../types/author";
import styles from "../../styles/Home.module.css";
import { Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { post } from "../../types/post";
import Tag from "../button/Tag";
import Category from "../button/Category";

type props = {
  postId: string;
  authorId: string;
};

const PostCard = ({ postId, authorId }: props) => {
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
  const [author, setAuthor] = useState(dummyAuthor);
  const [post, setPost] = useState(dummyPost);
  const router = useRouter();
  useEffect(() => {
    let isMounted = true;
    const getAuthorAndPost = async () => {
      try {
        const author = await UserService.getUserById(authorId);
        const post = await PostService.getPostById(postId);
        if (isMounted) setAuthor(author.data);
        if (isMounted) setPost(post.data);
      } catch (err) {
        console.log(err);
      }
    };
    getAuthorAndPost();
    return () => {
      isMounted = false;
    };
  }, []);
  const routeToUser = (id: any) => {
    router.push({
      pathname: `/user/${id}`,
    });
  };
  const getImage = () => {
    // console.log(author.avatars_urls["48"])
    return author.avatar_urls["48"];
  };
  const routePost = (id: number) => {
    router.push({
      pathname: `/post/${id}`,
    });
  };
  if (!post) {
    return <Box></Box>;
  } else {
    return (
      <Box className={styles.postcard}>
        <Box
          className={styles.head}
          display={"flex"}
          justifyContent={"flex-start"}
          alignItems={"center"}
        >
          <Avatar
            style={{cursor: "pointer"}}
            className={styles.avatar}
            size="md"
            name={author.name}
            src={getImage()}
            onClick={() => routeToUser(author.id)}
          />
          <Text style={{cursor: "pointer"}} fontSize={"xl"} onClick={() => routeToUser(author.id)}>{author.name}</Text>
        </Box>
        <Stack direction={"row"} display={"flex"} alignItems={"center"}>
        <Text fontWeight={"semibold"}>Tags</Text>
          {post.tags.map((data, index) => {
            return (
              <Box key={index}>
                <Tag tagId={data} />
              </Box>
            );
          })}
        </Stack>
        <Stack direction={"row"} marginTop={2}  display={"flex"} alignItems={"center"}>
          <Text fontWeight={"semibold"}>Categories</Text>
          {post.categories.map((data, index) => {
            return (
              <Box key={index}>
                <Category cateId={data} />
              </Box>
            );
          })}
        </Stack>

        <Divider style={{ marginTop: 15 }} />
        <Box display={"flex"} justifyContent={"center"} alignItems={"center"}>
          <Text fontSize={"2xl"} className={styles.content}>
            {post.title.rendered}
          </Text>
        </Box>
        <Divider style={{ marginBottom: 15 }} />
        <Button
          variant={"ghost"}
          style={{color: "1B1A17"}}
          onClick={() => routePost(post.id)}
        >
          SEE MORE
        </Button>
      </Box>
    );
  }
};
export default PostCard;
