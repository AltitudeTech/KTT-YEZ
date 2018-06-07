import Link from 'next/link'
import {Card, CardBody, CardTitle, CardGroup, Row, Col, Button} from 'reactstrap'
import {Query} from 'react-apollo'

import {HOME_VIEWER_MANAGER_QUERY} from '../../../../lib/backendApi/queries'
import { prettifyState } from '../../../../utils/common'
import Loading from '../../../common/LoadingIcon/LoadingIcon'

const styles = {
  image: {
    maxHeight: '80px',
    marginBottom: '10px'
  },
  details: {
    marginLeft: '-15px',
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  steps: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'center',
    fontSize: '19px',
    fontWeight: '500'
  }
}

export default props => (
  <CardGroup className="mb-4">
    <Card className="border-teal text-center">
      <Query query={HOME_VIEWER_MANAGER_QUERY}>
        {({loading, error, data}) => {
          if (loading)
            return <Loading />;
            // return "Loading...";
          if (error)
            return `Error! ${error.message}`;

          const {viewerCenterManager: {centerManager}} = data;
          // const centerManager = centerManager;
          // console.log(centerManager);

          return (
            <CardBody>
              <Row>
                <Col sm="12">
                  <img style={styles.image} src={'/static/images/5.jpg'} className="img-avatar" alt="bellooladipupo41@gmail.com"/>
                  <CardTitle className="mb-0">{centerManager ? `${centerManager.name.first} ${centerManager.name.last}` : `Lastname Firstname`}</CardTitle>
                  <div className="small text-muted">{centerManager.username ? `@${centerManager.username}` : `@pick a username`}</div>
                  <div className={'text-muted ' + centerManager.stateOfResidence ? '' : 'text-danger'}><i className="icon-globe"/> {centerManager.stateOfResidence ? `${prettifyState(centerManager.stateOfResidence)}` : `No state of residence selected, contact an admin to resolve this`}</div>
                </Col>
              </Row>
              <hr/>
              {centerManager.phone && (<div className="text-muted"><i className="icon-phone"></i> {centerManager.phone}</div>)}
              {centerManager.email && (<div className="text-muted"><i className="icon-envelope"></i> {centerManager.email}</div>)}
            </CardBody>
          )
        }}
      </Query>
    </Card>
    <Card className="text-white bg-teal text-center">
      <CardBody style={styles.steps}>
        <div>
          <p className="display-4 text-dark">Edit Your Details</p>
          <Link href="/centerManager/profile">
          <Button className="btn-lg" outline color="dark"><i className="icon-pencil"></i>&nbsp; Edit</Button>
        </Link>
        </div>
      </CardBody>
    </Card>
  </CardGroup>
)
