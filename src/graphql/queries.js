/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getEmailSubscription = /* GraphQL */ `
  query GetEmailSubscription($id: ID!) {
    getEmailSubscription(id: $id) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listEmailSubscriptions = /* GraphQL */ `
  query ListEmailSubscriptions(
    $filter: ModelEmailSubscriptionFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listEmailSubscriptions(
      filter: $filter
      limit: $limit
      nextToken: $nextToken
    ) {
      items {
        id
        email
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
