import { Box, Flex } from "@chakra-ui/core";
import React from "react";
import { IBlogPost } from "types/blogpost";
import { BlogCardComponent } from "./blog-card";

export const BlogPageComponent: React.FC<{ blogs: IBlogPost[] }> = ({ blogs }) => {
  return (
    <>
      <h1 style={{ margin: "5px 0px 15px 0", fontSize: "25px", fontWeight: "600" }}>News</h1>
      <Box mt="50px">
        <Flex justifyContent="space-between" flexWrap="wrap">
          <div style={{ display: "grid", gridTemplateColumns: "2fr 2fr", gridGap: "15px" }}>
            {blogs.map((blog) => (
              <BlogCardComponent key={blog.id} blog={blog} />
            ))}
          </div>
        </Flex>
      </Box>
    </>
  );
};
