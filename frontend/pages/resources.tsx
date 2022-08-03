import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next'
import { IResource } from 'types/resourse'
import { gql } from '@apollo/client'
import { graphQLServerClient } from 'lib/graphql';
import Head from 'next/head';
import { ResourcesPageComponent } from 'components/pages/resources';

const resourceQuery = gql 
`query getResources{
    resources{
        data{
            id
            attributes{
                title
                image{           
                    data{
                        id
                    }
                }
                description
                download_link
            }
        }
        meta{
            pagination{
                page
                pageSize
                total
                pageCount
            }
        }
    }
}
`
interface IResourceQueryResult {
    resources: {
        data: { 
            id: string; 
            attributes: { 
                Title: string; 
                Image: any; 
                Description: string; 
                Media:string 
            } 
        }[];
    };
    meta: {
        pagination: {
            page: number;
            pageSize: number;
            total: number;
            pageCount: number;
        };
    };
}

export const getServerSideProps = async ({ }: GetServerSidePropsContext) => {
    const client = graphQLServerClient();
    const { data } = await client.query<IResourceQueryResult>({
        query: resourceQuery,
    });

    const resources: IResource[] =
        data.resources.data.map((r) => ({ ...r.attributes, id: r.id })) || [];
    return {
        props: {
            resources,
        },
    };
};

const ResourcesPage = ({
    resources,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
        <Head>
            <title>Resources Page</title>
        </Head>
        <ResourcesPageComponent resources={resources}/>
        </>
    );
};

export default ResourcesPage;