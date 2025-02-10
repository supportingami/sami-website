import type { ProjectType } from "../graphql/generated";

export interface IProject extends Omit<ProjectType, "__typename"> {}
