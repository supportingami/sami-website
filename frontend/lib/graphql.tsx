import {
  ApolloClient,
  ApolloProvider,
  DocumentNode,
  InMemoryCache,
} from "@apollo/client";
import { ReactNode } from "react";
import session from "types/session";

/** When calling graphql from browser include authenticated user credentials */
export const GraphQLProvider = ({
  session,
  children,
}: {
  session: session;
  children: ReactNode;
}) => {
  const userToken = session?.jwt?.toString();
  const headers: any = {};
  if (userToken) {
    headers.authorization = `Bearer ${userToken}`;
  }
  const client = getClient(headers);
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export async function serverQuery<T>(graphqlQuery: DocumentNode) {
  const client = graphQLServerClient();
  const res = await client
    .query<T>({
      query: graphqlQuery,
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
      // Throw regular error
      else {
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
    uri:
      `${process.env.NEXT_PUBLIC_API_URL}/graphql` ||
      "http://localhost:1337/graphql",
    credentials: "same-origin",
    cache: new InMemoryCache(),
    headers,
  });
