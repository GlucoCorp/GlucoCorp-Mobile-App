/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createEmailSubscription = /* GraphQL */ `
  mutation CreateEmailSubscription(
    $input: CreateEmailSubscriptionInput!
    $condition: ModelEmailSubscriptionConditionInput
  ) {
    createEmailSubscription(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const updateEmailSubscription = /* GraphQL */ `
  mutation UpdateEmailSubscription(
    $input: UpdateEmailSubscriptionInput!
    $condition: ModelEmailSubscriptionConditionInput
  ) {
    updateEmailSubscription(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const deleteEmailSubscription = /* GraphQL */ `
  mutation DeleteEmailSubscription(
    $input: DeleteEmailSubscriptionInput!
    $condition: ModelEmailSubscriptionConditionInput
  ) {
    deleteEmailSubscription(input: $input, condition: $condition) {
      id
      email
      createdAt
      updatedAt
      __typename
    }
  }
`;
