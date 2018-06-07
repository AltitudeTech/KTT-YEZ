import {Component} from 'react'
// import dynamic from 'next/dynamic'
//import Router from 'next/router'
import Head from 'next/head'
import { Query } from 'react-apollo'
import { Row, Col } from 'reactstrap'
import { toast } from 'react-toastify';
import scrollToComponent from 'react-scroll-to-component-ssr';


import { MANAGER_CANDIDATE_BY_ID_QUERY } from '../../../lib/backendApi/queries'

import NoCandidate from '../../../components/common/Error/NoCandidate/NoCandidate'
import withCenterManagerPortal from '../../../components/withCenterManagerPortal'
// import Widgets from '../../../components/centerManagerPortal/CandidatePage/Widgets/Widgets'
import DetailsSection from '../../../components/centerManagerPortal/CandidatePage/ProfilePage/DetailsSection/DetailsSection'
// import DocumentsSection from '../../../components/centerManagerPortal/CandidatePage/DocumentsSection/DocumentsSection'
import CaseFilesSection from '../../../components/centerManagerPortal/CandidatePage/CaseFilesPage/CaseFilesSection/CaseFilesSection'
// import ExperienceSection from '../../../components/centerManagerPortal/CandidatePage/ProfilePage/ExperienceSection/ExperienceSection'
// import EducationSection from '../../../components/centerManagerPortal/CandidatePage/ProfilePage/EducationSection/EducationSection'
// import CertificatesSection from '../../../components/centerManagerPortal/CandidatePage/ProfilePage/CertificatesSection/CertificatesSection'
// import RefereesSection from '../../../components/centerManagerPortal/CandidatePage/ProfilePage/RefereesSection/RefereesSection'

class Page extends Component {
  static async getInitialProps ({ query}) {
    return {query}
  }

  constructor(props){
    super(props)
    this.scrollTo = this.scrollTo.bind(this);
  }

  scrollTo(component) {
    console.log(scrollToComponent);
    scrollToComponent(this[component], { offset: -15, align: 'top', duration: 1000, ease:'inCirc'})
  }

  render(){
    //console.log(this.props);
    if (!this.props.query.id)
      return <NoCandidate />

    return (
      <div className="animated fadeIn">
        <Head>
          <title>KTT Youth Empowerment Zone | Manager</title>
          <link rel="stylesheet" href="/static/css/react-image-lightbox/style.css"/>
        </Head>
        <Query query={MANAGER_CANDIDATE_BY_ID_QUERY} variables={{ id: this.props.query.id}}>
          {({loading, error, data}) => {
            if (loading)
              return "Loading...";
            if (error){
              if (error.message == `GraphQL error: Cast to ObjectId failed for value "${this.props.query.id}" at path "_id" for model "Candidate"`)
                return <NoCandidate />
              if (error.message == `GraphQL error: This company cannot view this document`)
                return <NoCandidate />
              return `Error! ${error.message}`;
            }

            const {managerCandidateById, currentTime} = data;
            // console.log(managerCandidateById);
            if (!managerCandidateById) {
              return <NoCandidate />
            }
            return (
              <div>
                {/* <Widgets scrollTo={this.scrollTo}/> */}
                <DetailsSection user={managerCandidateById} currentTime={currentTime}/>
                <div id="case-files" ref={(div) => { this.caseFiles = div; }}>
                  <CaseFilesSection id={this.props.query.id}/>
                </div>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

// export default Page
export default withCenterManagerPortal(Page)
