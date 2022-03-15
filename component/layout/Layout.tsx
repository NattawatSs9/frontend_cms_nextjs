import { Box, useColorModeValue } from "@chakra-ui/react"
import Navbar from "../nav/Navbar"

const Layout = ({children} : any) => {
  const background = useColorModeValue('#F6E7D8', '#1B1A17')
  return (
    <div className="content">
      <Navbar/>
      <Box bg={background} style={{paddingTop: 70}}>
        {children}
      </Box>
      
    </div>
  )
}

export default Layout