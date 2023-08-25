import type { DocumentNode, OperationVariables } from "@apollo/client";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import type { ReactNode } from "react";
import type session from "types/session";

/** When calling graphql from browser include authenticated user credentials */
export const GraphQLProvider = ({ session, children }: { session: session; children: ReactNode }) => {
  const userToken = session?.jwt?.toString();
  const headers: any = {};
  if (userToken) {
    headers.authorization = `Bearer ${userToken}`;
  }
  const client = getClient(headers);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

/**
 * Execute a graphql query
 * @param graphqlQuery Document reference for query
 * @param variables Additional variables to pass to query, e.g. if query supports filters
 * ```ts
 * {
 *  filters: {
 *    Slug: { eq: 'my-slug'}
 *  }
 * }
 * ```
 * NOTE - any variables passed must first be defined from within the corresponding .graphql query
 */
export async function serverQuery<T>(graphqlQuery: DocumentNode, variables: OperationVariables = {}) {
  const client = graphQLServerClient();
  const res = await client
    .query<T>({
      query: graphqlQuery,
      variables,
    })
    .catch((err) => {
      // Network errors such as graphql schema errors are nested within
      // general error document. Extract and throw if exists
      const networkErrors: any[] = err?.networkError?.result?.errors;
      if (networkErrors) {
        console.error(networkErrors);
        const messages = networkErrors.map((n) => n.message).join("\n");
        throw new Error("Network error\n" + messages);
      }
      if (err.message === "Forbidden access") {
        const { STRAPI_READONLY_TOKEN } = process.env;
        if (!STRAPI_READONLY_TOKEN) {
          console.log("no token", process.env);
          throw new Error("No STRAPI_READONLY_TOKEN provided, please set one");
        }
        throw new Error("Invalid access token:" + STRAPI_READONLY_TOKEN);
      }
      // Throw regular error
      else {
        console.log("err", err.message);
        throw err;
      }
    });
  return res;
}

/** When calling client from server include strapi api token */
export const graphQLServerClient = () => {
  const serverToken = process.env.STRAPI_READONLY_TOKEN;
  const headers: any = {};
  if (serverToken) {
    headers.authorization = `Bearer ${serverToken}`;
  }
  return getClient(headers);
};

/** Common method used to generate graphQL client either on server or browser */
const getClient = (headers: any) =>
  new ApolloClient({
    uri: `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337"}/graphql`,
    credentials: "same-origin",
    cache: new InMemoryCache(),
    headers,
  });
