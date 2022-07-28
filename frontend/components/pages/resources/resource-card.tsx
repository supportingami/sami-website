import { Box, Button, Image } from "@chakra-ui/core";
import Link from "next/link";
import React from "react";
import { IResource } from "types/resourse";

export const ResourceCardComponent: React.FC<{
    resource: IResource;
}> =({resource})=>(
    <Box borderWidth='1px' borderBottom='1px solid #ddd' maxWidth='300px'>
        <Image src={resource.image} alt={'image'} height='150px' width='300px'/>
        <Box p='6' borderBottom='0.6px solid #ddd'>
            <Box 
            textTransform='capitalize' 
            fontWeight='bold' 
            letterSpacing='0.6px'
            >
                {resource.title}
            </Box>
        </Box>
        <Box>
            <Box p='3'>
                {resource.description}
            </Box>
        </Box>
        <Link href={resource.download_link === null ? '#' : resource.download_link}>
            <Button size="md" backgroundColor='#0ff'>
                Download
            </Button>
        </Link>
    </Box>
)