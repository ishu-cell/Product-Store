import { Box, Container, Heading, Input, useColorModeValue, VStack ,Button, useToast} from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router-dom";
import { Flex } from "@chakra-ui/react";




const CreatePage = () => {
    const [newProduct,setNewProduct ] = useState({
        name : "",
        price: "",
        image: "",

    });
const toast = useToast()
const navigate = useNavigate();



const {createProduct} = useProductStore()
const handleAddProduct = async ()=>{
  const {success,message}= await createProduct(newProduct)
  if(!success){
    toast({
      title:"Error",
      description:message ,
      status:"error",
      duration:3000,
      isClosable:true
    })
  }else if(success){
    toast({
      title:"success",
      description:message ,
      status:"success",
      duration:3000,
      isClosable:true
    });

  }
  


    
}
  return (
    <Container maxW={"container.sm"}>
        <VStack spacing={8}>
            <Heading as = {"h1"} size={"2xl"} textAlign={"center"} mb={8}>Create New Product</Heading>
            <Box w={"full"} bg={useColorModeValue("white","gray.800") } p={6} rounded={"lg"} shadow={"md"}>
                <VStack spacing={4}>
                    <Input placeholder="Product Name "
                     name="name"
                      value={newProduct.name}
                      onChange={(e)=> setNewProduct({ ...newProduct,name:e.target.value})}/>
                    
                    <Input placeholder="Product Price "
                     name="price"
                     type="number"
                      value={newProduct.price}
                      onChange={(e)=> setNewProduct({ ...newProduct,price:e.target.value})}/>
                    
                    <Input placeholder="image URL "
                     name="image"
                      value={newProduct.image}
                      onChange={(e)=> setNewProduct({ ...newProduct,image:e.target.value})}/>
                      
                    <Flex w="full" align="center" justify="space-between">
                   <Box flex="1" />
                   <Button colorScheme="blue" onClick={handleAddProduct}>Add Product</Button>
                   <Button variant="ghost" ml={4} onClick={() => navigate("/")}>Back</Button>
                   </Flex>

                    
                    
                    

                </VStack>
            </Box>

        </VStack>
    </Container>
  )
}

export default CreatePage
