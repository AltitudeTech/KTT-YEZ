/**
* GraphQl Company Mutations
*/
import gql from 'graphql-tag'

export const LOGIN_MANAGER_MUTATION = gql `
  mutation Login($phone: String!, $password: String!) {
    loginCenterManager ( phone: $phone, password: $password ) {
      jwt
      name {
        last
      }
    }
  }
`

export const MANAGER_CANDIDATE_BY_ID_DOCUMENT_UPLOAD_MUTATION = gql `
  mutation (
    $managedId: String!,
    # $managedModelType: String!,
    $fileTitle: String,
    $public_id: String,
    $version: Float,
    $signature: String,
    $format: String,
    $resource_type: String,
    $url: String,
    $width: Float,
    $height: Float,
    $secure_url: String,
  ){
    addCandidateDocument(managedId: $managedId,
      # managedModelType: $managedModelType,
      record:{
        fileTitle: $fileTitle,
        image: {
          public_id: $public_id,
          version: $version,
          signature: $signature,
          format: $format,
          resource_type: $resource_type,
          url: $url,
          width: $width,
          height: $height,
          secure_url: $secure_url,
        }
      }
    ){
      record {
        _id
        fileTitle
        fileURL
        uploadedBy
        createdAt
        updatedAt
      }
    }
  }
`

export const MANAGER_CANDIDATE_BY_ID_DOCUMENT_DELETE_MUTATION = gql `
mutation (
  $id: MongoID!,
  $managedId: String!,
  # $managedModelType: String!
) {
  deleteCandidateDocument(
    _id: $id,
    managedId: $managedId,
    # managedModelType: $managedModelType
  ){
    recordId
    record{
      fileTitle
    }
  }
}
`

export const MANAGER_CANDIDATE_BY_ID_CASE_FILE_CREATE_MUTATION = gql `
mutation (
  $managedId: String!,
  $title: String,
  $content: String
){
  addCandidateCaseFile(managedId: $managedId,
  record:{
    title: $title,
    content: $content
  }) {
    recordId
    record{
      _id
      title
      fileNumber
      authorManager
      candidate
      owner
      createdAt
      content
    }
  }
}
`
// export const SIGNUP_MANAGER_MUTATION = gql `
// mutation SignUpCompany($name: String!, $email: String!, $cacRegNo: String!, $password: String!) {
//   signUpCompany ( name: $name, email: $email, cacRegNo: $cacRegNo, password: $password ) {
//     jwt
//     name {
//       last
//     }
//   }
// }
// `
//
// export const UPDATE_MANAGER_MUTATION = gql `
// mutation updateCompany(
//   $id: MongoID!,
//   $phone: String,
//   $website: String,
//   $address: String,
//   $stateOfResidence: EnumCompanyStateOfResidence,
//   $description: String,
//   $yearFounded: Float,
//   $staffSize: EnumCompanyStaffSize,
//   $industry: MongoID
//   $industries: [MongoID]
// ){
//   companyUpdateById(record:{
//     _id: $id,
//     phone: $phone,
//     website: $website,
//     address: $address,
//     stateOfResidence: $stateOfResidence,
//     description: $description,
//     yearFounded: $yearFounded,
//     staffSize: $staffSize,
//     industry: $industry
//     industries: $industries,
//   }){
//     recordId
//     record{
//       _id
//       name
//       phone
//       email
//       website
//       address
//       stateOfResidence
//       description
//       cacRegNo
//       yearFounded
//       staffSize
//       industry
//       industries
//       isVerified
//     }
//   }
// }
// `
//
// export const ADD_MANAGER_JOB_MUTATION = gql `
//   mutation AddJob(
//     $role: String!,
//     $state: EnumJobState!,
//     $contactPhone: String!,
//     $contactEmail: String!,
//     $contactName: String!,
//     $salary: String!,
//     $industries: [MongoID],
//     $employmentType: EnumJobEmploymentType!,
//     $expiryDate: Date!,
//     $basicDescription: String!,
//     $fullDescription: String
//   ){
//   addJob(record:{
//     role: $role,
//     state: $state,
//     contactPhone: $contactPhone,
//     contactEmail: $contactEmail,
//     contactName: $contactName,
//     salary: $salary,
//     industries: $industries,
//     employmentType: $employmentType,
//     expiryDate: $expiryDate,
//     basicDescription: $basicDescription,
//     fullDescription: $fullDescription
//   }){
//     recordId
//     record{
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
//     }
//   }
// }
// `
// export const UPDATE_MANAGER_JOB_MUTATION = gql `
//   mutation UpdateJob(
//     $id: MongoID!,
//     $role: String!,
//     $state: EnumJobState!,
//     $contactPhone: String!,
//     $contactEmail: String!,
//     $contactName: String!,
//     $salary: String!,
//     $industries: [MongoID],
//     $employmentType: EnumJobEmploymentType!,
//     $expiryDate: Date!,
//     $basicDescription: String!,
//     $fullDescription: String
//   ){
//   updateJob(record:{
//     _id: $id,
//     role: $role,
//     state: $state,
//     contactPhone: $contactPhone,
//     contactEmail: $contactEmail,
//     contactName: $contactName,
//     salary: $salary,
//     industries: $industries,
//     employmentType: $employmentType,
//     expiryDate: $expiryDate,
//     basicDescription: $basicDescription,
//     fullDescription: $fullDescription
//   }){
//     recordId
//     record{
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
//     }
//   }
// }
// `
//
// export const DELETE_MANAGER_JOB_MUTATION = gql `
// mutation DeleteJob(
//   $id: MongoID!
// ) {
//   deleteJob(_id: $id){
//     recordId
//     record{
//       role
//     }
//   }
// }
// `
//
// export const CREATE_MANAGER_MESSAGE_MUTATION = gql `
//   mutation CreateMessage(
//     $company: MongoID!,
//     $title: String!,
//     $message: String!
//   ){
//   createCompanyMessage(record:{
//     company: $company,
//     title: $title,
//     message: $message,
//   }){
//     recordId
//     record{
//       title
//     }
//   }
// }
// `
