import type { IBlogPost } from "types/blogpost";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import dayjs from "dayjs";
import type { ComponentCommonHtml } from "../../../graphql/generated";
import { DynamicComponents } from "components/common/dynamic";

export const BlogPostComponent: React.FC<{ blogPost: IBlogPost }> = ({ blogPost }) => {
  const size = "28px";
  const url = global.window && window.location.href;
  let contentBlocks = blogPost.ContentBlocks || [];
  // If using legacy html content convert into a single block
  if (blogPost.Content) {
    const htmlBlock: ComponentCommonHtml = { HTML: blogPost.Content, id: "1", __typename: "ComponentCommonHtml" };
    contentBlocks = [htmlBlock];
  }
  console.log({ contentBlocks });
  return (
    <>
      <div className="font-serif px-32">
        <h1 className="font-semibold text-4xl capitalize font-sans">{blogPost.Title}</h1>
        <span className="font-semibold text-sm">{dayjs(blogPost.DateWritten).format("MMM D, YYYY")} </span>
        <span>
          {" | "}
          {blogPost.Tags.data.map((tag) => (
            <span key={tag.id} className="text-gray-500 text-sm">
              {tag.attributes.Tag}{" "}
            </span>
          ))}
        </span>
        <DynamicComponents blocks={contentBlocks} />
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
    </>
  );
};
