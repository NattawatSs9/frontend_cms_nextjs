import { Box, Button,useColorModeValue, } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import TagService from "../../service/TagService";
import { useRouter } from "next/router";
import CategoryService from "../../service/CategoryService";
import { category } from "../../types/category";
type props = {
    cateId: number
}
const Category = ({cateId} : props) => {
    const [category, setCategory] = useState<category>()
    const router = useRouter()
    const button = useColorModeValue("#C65D7B","#E45826")
    useEffect(() => {
        const get = async () => {
          try {
            const result = await CategoryService.getPostById(cateId.toString());
            setCategory(result.data);
          } catch (err) {
            console.log(err);
          }
        };
        get();
      }, []);
    const routeToCategory = () => {
        router.push({
            pathname: "/",
            query: {category: cateId.toString()}
        })
    }
    if (category){
        return (
        <Box>
            <Button color={"white"} backgroundColor={button} onClick={() => routeToCategory()}>{category.name}</Button>
        </Box>
    )
    }
    else {
        return <Box></Box>
    }
    
}

export default Category