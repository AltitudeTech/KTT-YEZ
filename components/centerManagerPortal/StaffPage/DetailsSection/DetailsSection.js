import {Card, CardBody, CardTitle, CardGroup, Row, Col, Button} from 'reactstrap'

import { prettifyState } from '../../../../utils/common'

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
  }
}

export default props => {
  const {staff} = props;
  return (
    <Card className="border-teal text-center">
      <CardBody>
        <Row>
          <Col sm="12">
            <img style={styles.image} src={'/static/images/5.jpg'} className="img-avatar" alt="bellooladipupo41@gmail.com"/>
            <CardTitle className="mb-0">{staff ? `${staff.name.first} ${staff.name.last}` : `Lastname Firstname`}</CardTitle>
            <div className="text-danger">Trainer</div>
            <div className={'text-muted ' + staff.stateOfResidence ? '' : 'text-danger'}><i className="icon-globe"/> {staff.stateOfResidence ? `${prettifyState(staff.stateOfResidence)}` : `No state of residence selected, contact an admin to resolve this`}</div>
          </Col>
        </Row>
        <hr/>
        {staff.phone && (<div className="text-muted"><i className="icon-phone"></i> {staff.phone}</div>)}
        {staff.email && (<div className="text-muted"><i className="icon-envelope"></i> {staff.email}</div>)}
      </CardBody>
    </Card>
  )
}
