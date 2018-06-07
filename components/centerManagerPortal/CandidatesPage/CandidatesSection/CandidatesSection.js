import { Component, Fragment } from 'react'
import Link from 'next/link'
import { Query } from 'react-apollo'
import Pagination from "react-js-pagination"

import {
  Card,
  CardBody,
  Button,
  CardTitle,
  Table,
  Badge,
  InputGroup,
  InputGroupAddon,
  Input,
  Row,
  Col
} from 'reactstrap'

import {MANAGER_CANDIDATE_PAGINATION_QUERY} from '../../../../lib/backendApi/queries'
import Loading from '../../../common/LoadingIcon/LoadingIcon'
// import CandidatesList from './CandidatesList'

const EmptySpace = props => (
  <p className="display-4" style={{padding: '10px 0px 10px'}}>
    <i className="icon-ghost"></i> This space is lonely
  </p>
)

export default class extends Component {
  constructor(props){
    super(props)
    this.handlePageChange = this.handlePageChange.bind(this)
    this.state = {
      currentPage: 1,
      perPage: 10,
      modalOpen: false,
      isSearch: false
    }
  }

  handlePageChange(pageNumber) {
    this.setState({currentPage: pageNumber});
  }

  render(){
    return (
      <Card>
        <CardBody >
          <CardTitle className="mb-0">
            Candidates
          </CardTitle>
          <hr />
          <Query query={MANAGER_CANDIDATE_PAGINATION_QUERY}
            variables={{ page: this.state.currentPage, perPage: this.state.perPage }}>
            {({loading, error, data}) => {
              if (loading)
                return <Loading />;
              if (error)
                return `Error! ${error.message}`;

              const {managerCandidatePagination} = data;
              return(
                <Fragment>
                  <Row>
                    <Col md="8">
                      showing
                      <b>
                        {` ${!managerCandidatePagination.pageInfo.hasPreviousPage ? 1 : (1+(managerCandidatePagination.pageInfo.currentPage-1)*managerCandidatePagination.pageInfo.perPage)}
                        -
                        ${!managerCandidatePagination.pageInfo.hasNextPage ? managerCandidatePagination.pageInfo.itemCount : (managerCandidatePagination.pageInfo.perPage+(managerCandidatePagination.pageInfo.currentPage-1)*managerCandidatePagination.pageInfo.perPage)} `}</b>
                        of
                        <b> {managerCandidatePagination.pageInfo.itemCount}</b> Candidates
                      </Col>
                      <Col md="4">
                        <InputGroup>
                          <Input type="text" id="searchBar" placeholder="Search.."/>
                          <InputGroupAddon addonType="prepend">
                            <Button type="button" color="primary"><i className="icon-magnifier"></i></Button>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>
                  </Row>
                  <br />
                  <Table responsive>
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Tests Taken</th>
                        <th>Phone Number</th>
                        <th>Assignment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {managerCandidatePagination.items.map(candidate=>(
                        <tr>
                          <td key={candidate._id}><Link href={`/manager/candidate?id=${candidate._id}`} as={`/manager/candidate/${candidate._id}`}><a>{`${candidate.name.last} ${candidate.name.first}`}</a></Link></td>
                          <td>
                            <Badge color="success">Skill Analysis</Badge>{' '}
                            <Badge color="primary">Job Seeker</Badge>{' '}
                            <Badge color="danger">Entrepreneur</Badge>
                          </td>
                          <td>{candidate.phone}</td>
                          <td>Trainer {`<Bello Oladipupo>`}</td>
                        </tr>
                      ))}
                      <tr>
                        <td>Samppa Nori</td>
                        <td>
                          <Badge color="success">Skill Analysis</Badge>{' '}
                        </td>
                        <td>08188555611</td>
                        <td>Trainer {`<Bello Oladipupo>`}</td>
                      </tr>
                      <tr>
                        <td>Samppa Nori</td>
                        <td>
                        </td>
                        <td>08188555611</td>
                        <td>Trainer {`<Bello Oladipupo>`}</td>
                      </tr>
                      <tr>
                        <td>Samppa Nori</td>
                        <td>
                          <Badge color="success">Skill Analysis</Badge>{' '}
                          <Badge color="danger">Entrepreneur</Badge>
                        </td>
                        <td>08188555611</td>
                        <td>Trainer {`<Bello Oladipupo>`}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <div style={{textAlign: 'center', width: 'fit-content', margin: 'auto'}}>
                    <br/>
                    <Pagination
                      activePage={this.state.currentPage}
                      itemsCountPerPage={managerCandidatePagination.pageInfo.perPage}
                      totalItemsCount={managerCandidatePagination.pageInfo.itemCount}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                </Fragment>
              )}}
            </Query>
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
                onClick={()=>Link.push('/centerManager/job/create')}>
                <i className="icon-plus"></i> Add
              </Button>)
            }
            Jobs Posted
          </CardTitle>
          <hr/> {
            (!centerManager.jobs.length>0)
            ? (<div className="text-center">
              <EmptySpace/>
              <Button size="lg" color="primary" onClick={()=>Link.push('/centerManager/job/create')}>
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
