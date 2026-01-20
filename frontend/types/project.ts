import type { ProjectType } from "../graphql/generated";

export type IProject = Omit<ProjectType, "__typename">;
