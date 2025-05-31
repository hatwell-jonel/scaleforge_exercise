import { gql } from '@apollo/client';

export const GET_MEMBERS = gql`
  query ($first: Int, $after: Cursor, $filter: MemberFilterInput) {
    members(first: $first, after: $after, filter: $filter) {
      edges {
        node {
          id
          ... on Member {
            name
            verificationStatus
            emailAddress
            mobileNumber
            domain
            dateTimeCreated
            dateTimeLastActive
            status
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;


export const GET_VERIFICATION_STATUS_VALUES = gql`
  query GetMemberVerificationStatus {
    __type(name: "MemberVerificationStatus") {
      enumValues {
        name
      }
    }
  }
`


export const GET_STATUS_VALUES = gql`
  query GetMemberStatus {
    __type(name: "MemberStatus") {
      enumValues {
        name
      }
    }
  }
`