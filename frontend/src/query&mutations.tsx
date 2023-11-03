import { gql } from "@apollo/client";

export const queryAllAds = gql`
    query Query($where: AdsWhere) {
        allAds(where: $where) {
            id
            title
            description
            owner
            price
            picture
            location
            createdAt
            category {
                id
                name
            }
            tags {
                id
                name
            }
        }
    }
`;

export const queryAllCategories = gql`
    query Query {
        allCategories {
        id
        name
        }
  }
`;

export const mutationCreateAd = gql`
    mutation CreateAd($data: AdCreateInput!) {
        createAd(data: $data) {
            id
            title
            description
            owner
            price
            picture
            location
            createdAt
            category {
                id
            }
        }
    }
`;

export const mutationUpdateAd = gql`
    mutation UpdateAd($data: AdUpdateInput!, $updateAdId: ID!) {
        updateAd(data: $data, id: $updateAdId) {
            id
            title
            description
            owner
            price
            picture
            location
            createdAt
            category {
                id
                name
            }
        }
    }
`;

export const mutationDeleteAd = gql`
    mutation DeleteAd($deleteAdId: ID!) {
        deleteAd(id: $deleteAdId) {
        id
        title
        description
        }
    }
`;