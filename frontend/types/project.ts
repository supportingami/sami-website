import type { Country, Project, ProjectType } from "../graphql/generated";

export interface IProject extends Project {
  id: string;
}
