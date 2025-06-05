
import { Box  } from "@chakra-ui/react";
import { Route , Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/homepage";
import Navbar from "./components/navbar";
import { useColorModeValue } from "@chakra-ui/react";


function App() {
 

  return (
    <Box minH={"100vh"} bg ={ useColorModeValue("blue.100","gray.900")}>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/create" element={<CreatePage/>}/>
      </Routes>
   

     
    </Box>
  )
}

export default App
