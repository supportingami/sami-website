import type { Volunteer } from "../graphql/generated";

export interface IVolunteer extends Volunteer {
  id: string;
}
