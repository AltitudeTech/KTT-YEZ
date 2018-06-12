import {Component} from 'react'
import Head from 'next/head'
import { Query } from 'react-apollo'
import { Row, Col } from 'reactstrap'
import { toast } from 'react-toastify';

import { PROFILE_VIEWER_CANDIDATE_QUERY } from '../../lib/backendApi/queries'

import withCandidatePortal from '../../components/withCandidatePortal'
import DetailsSection from '../../components/portal/ProfilePage/DetailsSection/DetailsSection'
import ExperienceSection from '../../components/portal/ProfilePage/ExperienceSection/ExperienceSection'
import EducationSection from '../../components/portal/ProfilePage/EducationSection/EducationSection'
import ProfileSection from '../../components/portal/ProfilePage/ProfileSection/ProfileSection'
import MoreDetails from '../../components/portal/ProfilePage/MoreDetails/MoreDetails'
import CertificatesSection from '../../components/portal/ProfilePage/CertificatesSection/CertificatesSection'
import RefereesSection from '../../components/portal/ProfilePage/RefereesSection/RefereesSection'

class Page extends Component {
  render(){

    // const { candidate } = this.props.data.viewerCandidate
    return (
      <div className="animated fadeIn">
        <Head>
          <title>KTT Youth Empowerment Zone | Profile</title>
        </Head>
        <Query query={PROFILE_VIEWER_CANDIDATE_QUERY}>
          {({loading, error, data}) => {
            if (loading)
              return "Loading...";
            if (error)
              return `Error! ${error.message}`;

            const {viewerCandidate: {candidate}} = data;
            return (
              <div>
                <Row>
                  <Col md="8" xs="12">
                    <ProfileSection user={candidate} update={this.props.update}/>
                  </Col>
                  <Col md="4" xs="12">
                    <DetailsSection user={candidate}/>
                  </Col>
                </Row>
                <Row>
                  <Col md="8">
                    <MoreDetails user={candidate} update={this.props.update}/>
                    <ExperienceSection />
                    <EducationSection />
                    <CertificatesSection />
                    <RefereesSection />
                    </Col>
                  </Row>
              </div>
            )
          }}
        </Query>
      </div>
    )
  }
}

// export default Page
export default withCandidatePortal(Page)