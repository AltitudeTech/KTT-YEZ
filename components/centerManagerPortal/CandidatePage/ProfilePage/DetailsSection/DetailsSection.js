import {Component} from 'react'
import Link from 'next/link'
import {Card, CardBody, CardTitle, CardGroup, Row, Col, Button} from 'reactstrap'
import {prettifyState} from '../../../../../utils/common'
import moment from 'moment'

import AssignmentModal from './AssignmentModal'

const styles = {
  image: {
    maxWidth: '90px',
    marginBottom: '10px'
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

export default class ProfileDetails extends Component{
  state = { modalOpen: true }

  toggle = () =>{
    this.setState({modalOpen: !this.state.modalOpen})
  }

  render() {
    const {user = {}, currentTime} = this.props;
    return (
      <CardGroup className="mb-4">
        <Card className="text-center">
          <CardBody>
            <Row>
              <Col sm="12">
                <img style={styles.image} src={'/static/images/5.jpg'} className="img-avatar" alt="bellooladipupo41@gmail.com"/>
                <CardTitle className="mb-0">{user ? `${user.name.first} ${user.name.last}` : `Lastname Firstname`}</CardTitle>
                <div className="small text-muted">{user.username ? `@${user.username}` : <div className="text-danger">username not specified</div>}</div>
                <div className="text-muted">{user.nationality ? user.nationality : <span className="text-danger">nationality not specified</span>}, {user.gender? user.gender : <span className="text-danger">gender not specified</span>}</div>
                <div className="text-muted">{user.address ? `${user.address},` : <span className="text-danger">address not specified</span>} {user.stateOfResidence? prettifyState(user.stateOfResidence) : <span className="text-danger">state of residence not specified</span>}</div>
              </Col>
            </Row>
            <hr/>
            {user.dateOfBirth ? (
              <div className="text-muted"><i className="icon-user"></i> {moment(user.dateOfBirth).format("DD/MM/YYYY")}, {moment(user.dateOfBirth, "YYYYMMDD").from(currentTime, true)}</div>
            ) : (
              <div className="text-danger">date of birth not specified</div>
            )}
            {user.phone ? (
              <div className="text-muted"><i className="icon-phone"></i> {user.phone}</div>
            ) : (
              <div className="text-danger">Phone No. not specified</div>
            )}
            {user.email ? (
              <div className="text-muted"><i className="icon-envelope"></i> {user.email}</div>
            ) : (
              <div className="text-danger">E-mail not specified</div>
            )}
          </CardBody>
        </Card>
        <Card className="text-white bg-teal text-center">
          <CardBody style={styles.steps}>
            <div>
              <p className="h2 text-dark">Current Assignment</p>
              <p className="h4" style={{color: '#c34847'}}>TRAINER</p>
              <Link href="/manager/staff/trainer"><a className="trainer"><p className="h4">{'<Bello Oladipupo>'}</p></a></Link>
              <br/>
              {/* <Link href="/centerManager/profile"> */}
              <Button className="btn-lg" outline color="dark"
                onClick={()=>this.setState({modalOpen: true})}>
                <i className="icon-pencil"></i>&nbsp; Change
              </Button>
              {/* </Link> */}
            </div>
          </CardBody>
        </Card>
        <AssignmentModal
          id={user._id}
          isOpen={this.state.modalOpen}
          toggle={this.toggle}
          // save={this.save}
        />
        <style jsx>{`
          .trainer {
            color: #29363d;
          }
          .trainer:hover {
            color: white;
            text-decoration: none;
          }
          `}</style>
        </CardGroup>
      )
    }
}
