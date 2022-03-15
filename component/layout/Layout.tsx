import { Box, useColorModeValue } from "@chakra-ui/react"
import Navbar from "../nav/Navbar"

const Layout = ({children} : any) => {
  return (
    <div className="content">
      <Navbar/>
      <Box bg={useColorModeValue('#F6E7D8', '#1B1A17')} style={{paddingTop: 70}}>
        {children}
      </Box>
      
    </div>
  )
}

export default Layout