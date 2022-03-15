import type { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { Box, Container, Divider, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import PostService from "../service/PostService";
import PostCard from "../component/card/PostCasd";
import { useRouter } from "next/router";
import { post } from "../types/post";
import Filter from "../component/panel/FilterPanel";

const Home: NextPage = () => {
  const router = useRouter();
  const category = router.query.category as string;
  const tag = router.query.tag as any;
  const [posts, setPosts] = useState<post[]>([]);
  const [allPost, setAllPost] = useState<post[]>([]);
  let [check, setCheck] = useState<number>(0);

  useEffect(() => {
    const getPost = async () => {
      try {
        let result = await PostService.getAllPosts();
        setPosts(result.data);
        setAllPost(result.data);
        setCheck(1);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);
  useEffect(() => {
    const filter = () => {
      const filterPost = allPost.filter((data) => {
        if (tag != undefined && category != undefined) {
          return (
            data.tags.indexOf(parseInt(tag)) != -1 &&
            data.categories.indexOf(parseInt(category)) != -1
          );
        } else if (tag != undefined && category == undefined) {
          return data.tags.indexOf(parseInt(tag)) != -1;
        } else if (tag == undefined && category != undefined) {
          return data.categories.indexOf(parseInt(category)) != -1;
        } else {
          return true;
        }
      });
      console.log(filterPost);
      setPosts(filterPost);
    };
    filter();
  }, [tag, category, check]);

  return (
    <Container maxW="container.lg">
      <Box
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Text fontSize={"6xl"} className={styles.header}>
          CMS HOME PAGE
        </Text>
      </Box>
      <Divider marginBottom={10}/>
      <Filter />
      {posts.map((item: any, index: any) => (
        <div key={item.id} className={styles.cardSpace}>
          <PostCard postId={item.id} authorId={item.author} />
        </div>
      ))}
    </Container>
  );
};

export default Home;
