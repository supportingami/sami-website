import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
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
