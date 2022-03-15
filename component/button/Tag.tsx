import { Box, Button, useColorModeValue } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TagService from "../../service/TagService";
import { useRouter } from "next/router";
import { tag } from "../../types/tag";
type props = {
    tagId: number
}
const Tag = ({tagId} : props) => {
    const [tag, setTag] = useState<tag>()
    const router = useRouter()
    useEffect(() => {
        const get = async () => {
          try {
            const result = await TagService.getTagById(tagId.toString());
            setTag(result.data);
          } catch (err) {
            console.log(err);
          }
        };
        get();
      }, []);
    const routeToTag = () => {
        router.push({
            pathname: "/",
            query: {tag: tagId.toString()}
        })
    }
    if (tag){
        return (
        <Box>
            <Button color={"white"} backgroundColor={useColorModeValue("#F68989","#F0A500")} onClick={() => routeToTag()}>{tag.name}</Button>
        </Box>
    )
    }
    else {
        return <Box></Box>
    }
    
}

export default Tag