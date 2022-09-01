import { IBlogPost } from "types/blogpost";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import dayjs from "dayjs";

export const BlogPostComponent: React.FC<{ blogPosts: IBlogPost[]; title }> = ({ blogPosts, title }) => {
  const size = "28px";
  const url = global.window && window.location.href;
  return (
    <>
      {blogPosts
        .filter((blogPost) => blogPost.Title === title)
        .map((blogPost) => (
          <div>
            <h1 style={{ margin: "5px 0px 15px 0", fontSize: "25px", fontWeight: "600" }}>{blogPost.Title}</h1>
            <span>{dayjs(blogPost.DateWritten).format("MMM D, YYYY")} </span>
            <span>
              {" | "}
              {blogPost.Tags.data.map((tag) => (
                <span style={{ opacity: "0.7" }}>{tag.attributes.Tag} </span>
              ))}
            </span>
            <div dangerouslySetInnerHTML={{ __html: blogPost.Content }} style={{ margin: "10px 0 " }}></div>
            <div style={{ margin: "20px 0" }}>
              <div>Share this Blog with your community:</div>
              <hr />
              <div style={{ margin: "10px 0" }}>
                <FacebookShareButton
                  quote={`${blogPost.Summary}`}
                  hashtag={`${blogPost.Title}`}
                  title={`${blogPost.Title}`}
                  url={url}
                  windowWidth={750}
                  windowHeight={600}
                >
                  <FacebookIcon size={size} />
                </FacebookShareButton>
                <TwitterShareButton
                  url={url}
                  hashtags={[`${blogPost.Title}`, "SAMIBlogs"]}
                  title={`${blogPost.Title}`}
                  windowWidth={750}
                  windowHeight={600}
                >
                  <TwitterIcon size={size} />
                </TwitterShareButton>
                <LinkedinShareButton url={url} title={`${blogPost.Title}`}>
                  <LinkedinIcon size={size} />
                </LinkedinShareButton>
              </div>
            </div>
          </div>
        ))}
    </>
  );
};
