import { DeleteIcon, EditIcon } from "@chakra-ui/icons"
import { Box, Heading, HStack, IconButton, Image, useColorModeValue,Text, useToast, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, VStack ,Input,ModalFooter,Button} from "@chakra-ui/react"
import { useDisclosure } from "@chakra-ui/react";
import { useProductStore } from "../store/product";
import { useState } from "react";



const ProductCard = ({product}) => {

    const [updatedProduct,setUpdatedProduct] = useState(product);
    const textColor = useColorModeValue("gray.600","gray.200");
    const bg=useColorModeValue("white","gray.800");
    const { isOpen, onOpen, onClose } = useDisclosure()

    const {deleteProduct,updateProduct} = useProductStore();
    const toast = useToast();

    const handleDeleteProduct =async (pid) => {
        const {success,message} =   await deleteProduct(pid)
        if(!success){
       toast({
       title:"Error",
       description:message ,
       status:"error",
       duration:3000,
       isClosable:true
       })
     }else{
       toast({
       title:"success",
       description:message ,
       status:"success",
       duration:3000,
       isClosable:true
    });

  }

    }


  const handleUpdateProduct = async(pid,updatedProduct) => {
     const {success } = await  updateProduct(pid,updatedProduct);
     onClose();
     if(!success){
       toast({
       title:"Error",
       description:"Please input all fields correctelly" ,
       status:"error",
       duration:3000,
       isClosable:true
       })
     }else{
       toast({
       title:"success",
       description:"Product Updated Successfully" ,
       status:"success",
       duration:3000,
       isClosable:true
    });

  }

  }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{transform : "translate(-5px)", shadow:"xl"}}
    bg={bg}>
        <Image src={product.image} alt ={product.name} h={48} w='full' objectFit='cover'/>
        <Box p={4}>
            <Heading as = "h3" size = 'md' mb={2}>{product.name}</Heading>
            <Text fontWeight='bold' fontSize = 'xl' color={textColor} mb={4}>₹{product.price}</Text>

            <HStack spacing={2}>
                <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme="blue"/>
                <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)} colorScheme="red"/>

            </HStack>
        </Box>
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Update Product</ModalHeader>
                <ModalCloseButton></ModalCloseButton>
                <ModalBody>
                    <VStack>
                        <Input placeholder = "Product Name" name="name" value={updatedProduct.name} onChange={(e)=> setUpdatedProduct({...updatedProduct,name : e.target.value})}/>
                        <Input placeholder= "Product Price" name="price" type="number" value={updatedProduct.price}  onChange={(e)=> setUpdatedProduct({...updatedProduct,price : e.target.value})}/>
                        <Input placeholder = "Image URL" name = "image" value={updatedProduct.image}  onChange={(e)=> setUpdatedProduct({...updatedProduct,image : e.target.value})}/>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                  <Button variant='ghost' onClick={() => handleUpdateProduct(product._id,updatedProduct)}>Update</Button>
            
            <Button colorScheme='blue' ml={3} onClick={onClose}>Close</Button>
          </ModalFooter>

            </ModalContent>

        </Modal>

    </Box>
  )
}

export default ProductCard
