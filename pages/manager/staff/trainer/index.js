import { Component, Fragment } from 'react'
//import Router from 'next/router'
import Head from 'next/head'
import {Query} from 'react-apollo'

import withCenterManagerPortal from '../../../../components/withCenterManagerPortal'
import DetailsSection from '../../../../components/centerManagerPortal/StaffPage/DetailsSection/DetailsSection'
// import MessageSection from '../../../../components/centerManagerPortal/HomePage/MessageSection/MessageSection'
import CandidatesSection from '../../../../components/centerManagerPortal/StaffPage/CandidatesSection/CandidatesSection'
import NoStaff from '../../../../components/common/Error/NoStaff/NoStaff'
import Loading from '../../../../components/common/LoadingIcon/LoadingIcon'

import { MANAGER_CANDIDATE_BY_ID_QUERY } from '../../../../lib/backendApi/queries'

class Page extends Component {
  static async getInitialProps ({ query }) {
    return { query }
  }

  render(){
    // if (!this.props.query.id)
      // return <NoStaff />
    const managerTrainerById = {
      _id: "aisduo19hb283013n23121",
      name: {
        first: 'Ladi',
        last: 'Bello'
      },
      username: 'Davy',
      stateOfResidence: 'FCTAbuja',
      phone: '08188555611',
      email: 'bellooladipupo41@gmail.com',
      candidates: [
        {
          _id: '19723b12301wdqgsad89sdn13',
          name: {
            first: 'Loppp',
            last: 'Kiopp'
          },
          phone: '08188555613',
        },
        {
          _id: '19723b12301wdqgsad89sdn14',
          name: {
            first: 'Real',
            last: 'Person'
          },
          phone: '08188555617',
        }
      ]
    }

    return (
      <div className="animated fadeIn">
        <Head>
          <title>KTT Youth Empowerment Zone | Home</title>
        </Head>
        {/* <Query query={MANAGER_CANDIDATE_BY_ID_QUERY} variables={{ id: this.props.query.id}}>
          {({loading, error, data}) => {
            if (loading)
              return <Loading />;
            if (error){
              if (error.message == `GraphQL error: Cast to ObjectId failed for value "${this.props.query.id}" at path "_id" for model "Candidate"`)
                return <NoStaff />
              if (error.message == `GraphQL error: This company cannot view this document`)
                return <NoStaff />
              return `Error! ${error.message}`;
            }

            const {managerCandidateById, currentTime} = data;
            // console.log(managerCandidateById);
            if (!managerCandidateById) {
              return <NoStaff />
            }
            return (
              <Fragment>
                <DetailsSection staff={managerCandidateById}/>
                //<MessageSection centerManager={centerManager}/>
                <CandidatesSection Candidates={managerCandidateById.candidates}/>
              </Fragment>
            )}}
          </Query> */}
          <Fragment>
            <DetailsSection staff={managerTrainerById}/>
            {/* <MessageSection centerManager={centerManager}/> */}
            <CandidatesSection candidates={managerTrainerById.candidates}/>
          </Fragment>
      </div>
    )
  }
}

// export default Page
export default withCenterManagerPortal(Page)
