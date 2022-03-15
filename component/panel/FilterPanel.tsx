import {
  Box,
  Button,
  Center,
  Radio,
  RadioGroup,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CategoryService from "../../service/CategoryService";
import TagService from "../../service/TagService";
import { useRouter } from "next/router";
import { category } from "../../types/category";
import { tag } from "../../types/tag";

type props = {
    tag: string,
    category: string
}
const Filter = ({tag, category}: props) => {
  const [allTag, setAllTag] = useState<tag[]>([]);
  const [allCategory, setAllCategory] = useState<category[]>([]);
  const [selectTag, setSelectedTag] = useState<string>(tag);
  const [selectCate, setSelectCate] = useState<string>(category);
  const router = useRouter();

  const background = useColorModeValue("#874356", "#E6D5B8");
  const color = useColorModeValue("white", "black");
  useEffect(() => {
    const get = async () => {
      const tags = await TagService.getAllTags();
      const categories = await CategoryService.getAllPosts();
      setAllCategory(categories.data);
      setAllTag(tags.data);
    };
    get();
  }, []);

  useEffect(() => {
      if (tag == undefined && category != undefined) {
          setSelectedTag("not")
          setSelectCate(category)
      }
      else if (category == undefined && tag != undefined) {
          setSelectCate("not")
          setSelectedTag(tag)
      }
      else if (category == undefined && tag == undefined){
          setSelectCate("not")
          setSelectedTag("not")
      }
      else {
          setSelectCate(category)
          setSelectedTag(tag)
      }

  }, [tag, category])

  const search = () => {
    if (selectTag != "not" && selectCate != "not") {
      router.push({
        pathname: "/",
        query: { tag: selectTag, category: selectCate },
      });
    } else if (selectTag == "not" && selectCate == "not") {
      router.push({
        pathname: "/",
      });
    } else if (selectTag != "not" && selectCate == "not") {
      router.push({
        pathname: "/",
        query: { tag: selectTag },
      });
    } else if (selectTag == "not" && selectCate != "not") {
      router.push({
        pathname: "/",
        query: { category: selectCate },
      });
    }
  };
  return (
    <Box paddingBottom={10}>
      {allTag && allCategory && (
        <Stack>
          <Box display={"flex"} justifyContent={"center"}>
            <Stack direction={"row"}>
              <RadioGroup onChange={setSelectCate} value={selectCate}>
                <Stack>
                <Center><Text fontSize={"xl"} fontWeight={"bold"}>Category</Text></Center>
                  <Radio colorScheme={"red"} value={"not"}>
                    Not Select
                  </Radio>
                  {allCategory.map((data, index) => {
                    return (
                      <Radio
                        colorScheme={"red"}
                        key={index}
                        value={data.id.toString()}
                      >
                        {data.name}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
              <RadioGroup onChange={setSelectedTag} value={selectTag}>
                <Stack>
                  <Center><Text fontSize={"xl"} fontWeight={"bold"}>Tag</Text></Center>

                  <Radio colorScheme={"yellow"} value={"not"}>
                    Not Select
                  </Radio>
                  {allTag.map((data, index) => {
                    return (
                      <Radio
                        colorScheme={"yellow"}
                        key={index}
                        value={data.id.toString()}
                      >
                        {data.name}
                      </Radio>
                    );
                  })}
                </Stack>
              </RadioGroup>
            </Stack>
          </Box>
          <Button
            color={color}
            backgroundColor={background}
            onClick={() => search()}
          >
            Search Tag and Category
          </Button>
        </Stack>
      )}
    </Box>
  );
};

export default Filter;
