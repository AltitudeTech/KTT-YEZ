/**
* GraphQl CenterManager Queries
*/
import gql from 'graphql-tag'

export const HOME_VIEWER_MANAGER_QUERY = gql`
  query ViewerCenterManagerQuery{
    viewerCenterManager{
      centerManager{
        _id
        name{
          first
          last
        }
        phone
        username
        email
        stateOfResidence
      }
    }
  }
`

export const MANAGER_CANDIDATE_BY_ID_QUERY = gql`
  query ($id: MongoID!){
    currentTime
    managerCandidateById(_id: $id){
      _id
      name {
        first
        last
      }
      phone
      email
      username
      address
      stateOfResidence
      nationality
      gender
      stateOfOrigin
      dateOfBirth
      placeOfBirth
    }
  }
`

export const MANAGER_CANDIDATE_MANY_QUERY = gql`
  query {
    managerCandidateMany(limit: 5){
      _id
      name {
        first
        last
      }
      phone
    }
  }
`

export const MANAGER_CANDIDATE_PAGINATION_QUERY = gql`
  query ($page: Int, $perPage: Int){
    managerCandidatePagination(page: $page, perPage: $perPage, sort: CREATEDAT_DESC) {
      items {
        _id
        name {
          first
          last
        }
        phone
      }
      pageInfo {
        currentPage
        perPage
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
      }
    }
  }
`

export const MANAGER_CANDIDATE_BY_ID_EXPERIENCE_QUERY = gql`
query ($id: MongoID!){
  currentTime
  managerCandidateById(_id: $id){
    _id
    experience{
     _id
     companyName
     role
     fromYear
     fromMonth
     toYear
     toMonth
     startDate
     endDate
     address
     state
     salary
     duration
     isWorkingHere
    }
  }
}
`
export const MANAGER_CANDIDATE_BY_ID_EDUCATION_QUERY = gql`
query ($id: MongoID!){
  managerCandidateById(_id: $id){
    _id
    education {
      _id
      school
      degree
      field
      grade
      fromYear
      isSchoolingHere
      toYear
      startDate
      duration
    }
  }
}
`
export const MANAGER_CANDIDATE_BY_ID_CERTIFICATES_QUERY = gql`
query ($id: MongoID!){
  managerCandidateById(_id: $id){
    _id
    certificates{
      _id
      name
      authority
      licenseNumber
      url
      fromMonth
      fromYear
      doesNotExpire
      toMonth
      toYear
      duration
      startDate
    }
  }
}
`

export const MANAGER_CANDIDATE_BY_ID_REFEREES_QUERY = gql`
query ($id: MongoID!){
  managerCandidateById(_id: $id){
    _id
    referees{
      _id
      name {
        first
        last
      }
      phone
      gender
      email
      occupation
      relationship
      isVerified
    }
  }
}
`

export const MANAGER_CANDIDATE_BY_ID_DOCUMENTS_QUERY = gql`
query ($id: MongoID!, $page: Int, $perPage: Int){
  managerCandidateById(_id: $id){
    _id
    documentsPagination(page: $page, perPage: $perPage, sort: CREATEDAT_DESC) {
      pageInfo {
        currentPage
        perPage
        pageCount
        itemCount
        hasNextPage
        hasPreviousPage
      }
      items {
        _id
        fileTitle
        fileURL
        uploadedBy
        createdAt
        updatedAt
      }
    }
  }
}
`

export const MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY = gql`
query ($id: MongoID!){
  managerCandidateById(_id: $id){
    _id
    caseFiles(sort: FILENUMBER_DESC, limit: 5){
      title
      fileNumber
      authorManager
      createdAt
      content
    }
  }
}
`

export const MANAGER_CANDIDATE_BY_ID_ALL_CASE_FILES_QUERY = gql`
query ($id: MongoID!){
  managerCandidateById(_id: $id){
    _id
    caseFiles(sort: FILENUMBER_DESC){
      title
      fileNumber
      authorManager
      createdAt
      content
    }
  }
}
`

// export const HOME_MANAGER_JOBS_QUERY = gql`
//   query {
//     currentTime
//     viewerCenterManager{
//       centerManager{
//         _id
//         name
//         jobs(limit: 3){
//           _id
//           role
//           state
//           contactPhone
//           contactEmail
//           contactName
//           salary
//           industries
//           employmentType
//           expiryDate
//           basicDescription
//           fullDescription
//           publishedDate
//           isOnDisplay
//         }
//       }
//     }
//   }
// `
// export const MANAGER_JOBS_PAGINATION_QUERY = gql`
//   query JobsPagination($page: Int, $perPage: Int){
//     currentTime
//     viewerCenterManager{
//       centerManager{
//         _id
//         name
//         jobsPagination(page: $page, perPage: $perPage, sort: PUBLISHEDDATE_DESC) {
//           items {
//             _id
//             role
//             state
//             contactPhone
//             contactEmail
//             contactName
//             salary
//             industries
//             employmentType
//             expiryDate
//             basicDescription
//             fullDescription
//             publishedDate
//             isOnDisplay
//           }
//           pageInfo {
//             currentPage
//             perPage
//             pageCount
//             itemCount
//             hasNextPage
//             hasPreviousPage
//           }
//         }
//       }
//     }
//   }
// `
//
// export const MANAGER_SINGLE_JOB_QUERY = gql`
//   query ($id: MongoID!){
//     centerManagerJobById(_id: $id){
//       _id
//       role
//       state
//       contactPhone
//       contactEmail
//       contactName
//       salary
//       industries
//       employmentType
//       expiryDate
//       basicDescription
//       fullDescription
//       publishedDate
//       isOnDisplay
//     }
//   }
// `
//
// export const PROFILE_VIEWER_MANAGER_QUERY = gql`
//   query ViewerCenterManagerQuery{
//     viewerCenterManager{
//       centerManager{
//         _id
//         name
//         phone
//         email
//         website
//         address
//         stateOfResidence
//         description
//         cacRegNo
//         yearFounded
//         staffSize
//         industry
//         industries
//         isVerified
//       }
//     }
//   }
// `
// export const JOB_VIEWER_MANAGER_QUERY = gql`
//   query ViewerCenterManagerQuery{
//     viewerCenterManager{
//       centerManager{
//         _id
//         name
//         phone
//         email
//         website
//         address
//         stateOfResidence
//         description
//         cacRegNo
//         yearFounded
//         staffSize
//         industry
//         industries
//         isVerified
//       }
//     }
//   }
// `
// export const PROFILE_INDUSTRY_MANY_QUERY = gql`
//   query IndustryMany{
//     industryMany {
//       _id
//       name
//     }
//   }
// `
