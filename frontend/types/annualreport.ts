import type { AnnualReport } from "../graphql/generated";

export interface IAnnualReport extends AnnualReport {
  id: string;
}
