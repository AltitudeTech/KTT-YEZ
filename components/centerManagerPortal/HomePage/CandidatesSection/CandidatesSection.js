import {Component} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import {Query} from 'react-apollo'
import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Table,
  Badge
} from 'reactstrap'

import {MANAGER_CANDIDATE_MANY_QUERY} from '../../../../lib/backendApi/queries'
import Loading from '../../../common/LoadingIcon/LoadingIcon'


// import CandidatesList from './CandidatesList'

const EmptySpace = props => (
  <p className="display-4" style={{padding: '10px 0px 10px'}}>
    <i className="icon-ghost"></i>
    This space is lonely
  </p>
)

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      modalOpen: false
    }
  }

  render() {
    return (
      <Card>
        <CardBody >
          <CardTitle className="mb-0">
            <Button className="float-right" size="sm" color="dark" onClick={() => Router.push('/manager/candidates')}>
              <i className="icon-docs"></i> View All
            </Button>
            Candidates
          </CardTitle>
          <hr/>
          <Table responsive="responsive">
            <thead>
              <tr>
                <th>Name</th>
                <th>Tests Taken</th>
                <th>Phone Number</th>
                <th>Assignment</th>
              </tr>
            </thead>
            <Query query={MANAGER_CANDIDATE_MANY_QUERY}>
              {({loading, error, data}) => {
                if (loading)
                  return <Loading />
                if (error)
                  return `Error! ${error.message}`;

                  const {managerCandidateMany} = data;
                  const candidate = managerCandidateMany;
                return(
                  <tbody>
                    {managerCandidateMany.map((candidate)=>(
                      <tr>
                        <td><Link href={`/manager/candidate?id=${candidate._id}`} as={`/manager/candidate/${candidate._id}`}><a>{`${candidate.name.last} ${candidate.name.first}`}</a></Link></td>
                        <td>
                          <Badge color="success">Skill Analysis</Badge>{' '}
                          <Badge color="primary">Job Seeker</Badge>{' '}
                          <Badge color="danger">Entrepreneur</Badge>
                        </td>
                        <td>{candidate.phone}</td>
                        <td>Trainer {`<Bello Oladipupo>`}</td>
                      </tr>
                    ))}
                  </tbody>
                )}}
              </Query>
          </Table>
        </CardBody>
      </Card>
    )
  }
}
/*
<Query query={HOME_COMPANY_JOBS_QUERY}>
  {({loading, error, data}) => {
    if (loading)
    return (
      <CardBody >
        <CardTitle className="mb-0">
          Jobs Posted
        </CardTitle>
        <hr />
        Loading...
      </CardBody>
    );
    if (error)
    return `Error! ${error.message}`;

    const {viewerCenterManager: {centerManager}, currentTime} = data;
    return(
      <CardBody >
        <CardTitle className="mb-0">
          {
            (centerManager.jobs.length>0) && (
              <Button className="float-right" size="sm" color="primary"
                onClick={()=>Router.push('/centerManager/job/create')}>
                <i className="icon-plus"></i> Add
              </Button>)
            }
            Jobs Posted
          </CardTitle>
          <hr/> {
            (!centerManager.jobs.length>0)
            ? (<div className="text-center">
              <EmptySpace/>
              <Button size="lg" color="primary" onClick={()=>Router.push('/centerManager/job/create')}>
              <i className="icon-plus"></i> Add Jobs
            </Button>
          </div>)
          : (<div>
            <JobsList centerManager={centerManager} currentTime={currentTime}/>
          </div>)
        }
      </CardBody>
    )}}
  </Query>
*/
