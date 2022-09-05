import { Box, Button } from "@chakra-ui/core";
import Image from "next/image";
import { getStrapiMedia } from "lib/media";
import React from "react";
import { IBlogPost } from "types/blogpost";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import dayjs from "dayjs";

export const BlogCardComponent: React.FC<{
  blog: IBlogPost;
}> = ({ blog }) => (
  <Box borderWidth="1px" borderBottom="1px solid #ddd" maxWidth="300px">
    {blog.FeatureImage && <Image src={getStrapiMedia(blog.FeatureImage)} alt={"image"} height="150px" width="300px" />}
    <Box p="6" borderBottom="0.6px solid #ddd">
      <Box textTransform="capitalize" fontWeight="bold" letterSpacing="0.6px">
        {blog.Title}
      </Box>
      <Box textTransform="capitalize" fontWeight="bold" letterSpacing="0.6px">
        <CalendarMonthIcon />
        {dayjs(blog.DateWritten).format("MMM D, YYYY")}
      </Box>
    </Box>
    <Box>
      <Box p="3">{blog.Summary}</Box>
    </Box>
    <a href={`/blog-posts/${blog.Title}`}>
      <Button size="md" backgroundColor="#0ff">
        Read More
      </Button>
    </a>
  </Box>
);
