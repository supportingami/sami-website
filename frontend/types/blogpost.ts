import { BlogPost } from "../graphql/generated";

export interface IBlogPost extends BlogPost {
  id: string;
}
