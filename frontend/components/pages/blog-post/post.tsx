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
import { DynamicComponents } from "components/common/dynamic";

export const BlogPostComponent: React.FC<{ blogPost: IBlogPost }> = ({ blogPost }) => {
  const shareIconSize = "48px";
  const url = window.location.href;
  const contentBlocks = blogPost.ContentBlocks || [];
  return (
    <>
      <h1 className="prose text-primary text-4xl">{blogPost.Title}</h1>
      <div className="mb-8 -mt-4">
        <span className="font-semibold text-sm">{dayjs(blogPost.DateWritten).format("MMM D, YYYY")} </span>
        <span>
          {blogPost.Tags.data.map((tag) => (
            <span key={tag.id} className="text-gray-500 text-sm">
              {tag.attributes.Tag}{" "}
            </span>
          ))}
        </span>
      </div>

      <DynamicComponents blocks={contentBlocks} />
      <div className="my-8">
        <div className="prose">Share this Blog with your community:</div>
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
            <FacebookIcon size={shareIconSize} />
          </FacebookShareButton>
          <TwitterShareButton
            url={url}
            hashtags={[`${blogPost.Title}`, "SAMIBlogs"]}
            title={`${blogPost.Title}`}
            windowWidth={750}
            windowHeight={600}
          >
            <TwitterIcon size={shareIconSize} />
          </TwitterShareButton>
          <LinkedinShareButton url={url} title={`${blogPost.Title}`}>
            <LinkedinIcon size={shareIconSize} />
          </LinkedinShareButton>
        </div>
      </div>
    </>
  );
};
