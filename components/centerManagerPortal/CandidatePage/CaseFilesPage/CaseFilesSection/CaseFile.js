import { Component } from 'react'
// import Router from 'next/router'
import dynamic from 'next/dynamic'
import { Query } from 'react-apollo'
import moment from 'moment'

import {
  Card,
  CardHeader,
  CardBody,
  Button,
  CardTitle,
  Row,
  Col,
  Collapse
} from 'reactstrap'

// import {HOME_COMPANY_JOBS_QUERY} from '../../../../../lib/backendApi/queries'
// import RichTextEditor from 'react-rte';
const RichTextEditor = dynamic(import('./CaseFileContent'))

// import CandidatesList from './CandidatesList'

const EmptySpace = props => (
  <p className="display-4" style={{padding: '10px 0px 10px'}}>
    <i className="icon-ghost"></i> This space is lonely
  </p>
)

export default class extends Component {
  constructor(props){
    super(props)
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: false,
      // value: RichTextEditor.createValueFromString(props.caseFile.content, 'html')
     };
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render(){
    const { caseFile = {} } = this.props
    const { title, authorManager, createdAt, content, fileNumber } = caseFile
    return (
      <Row >
        <Col xs="2" md="1" className="text-center">
          <img src="/static/img/case-file.png"/>
          <br />
          <span style={{fontWeight: '500'}}>#{fileNumber}</span>
        </Col>
        <Col xs="10" md="11">
          <Card>
            <CardHeader onClick={this.toggle}>
              <b className="float-left">{title}</b>
              <div className="float-right">
                <span style={{fontWeight: '500'}}>
                  {moment(createdAt).format('h:mm A')}, {moment(createdAt).fromNow()}
                </span>
                {' by '}
                <a href="#!" style={{fontWeight: '500'}}>asidasu</a>
              </div>
            </CardHeader>
            <Collapse isOpen={this.state.collapse}>
              <CardBody>
                <RichTextEditor
                  fileNumber={fileNumber}
                  content={content}
                  />
              </CardBody>
            </Collapse>
          </Card>
        </Col>
      </Row>
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
