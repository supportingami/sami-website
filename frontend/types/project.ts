import type { Country, Project, ProjectType } from "../graphql/generated";

export interface ICountry extends Country {
  id: string;
}

export interface IProjectType extends ProjectType {
  id: string;
}

export interface IProject extends Project {
  id: string;
}
