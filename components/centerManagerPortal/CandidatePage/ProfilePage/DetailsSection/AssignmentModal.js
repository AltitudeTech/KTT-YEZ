import {Component} from 'react'
import Link from 'next/link'
import {
  Button,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Badge
} from 'reactstrap'
import Select from 'react-select'

// import SaveButton from './SaveButton'

// import { PAST_YEARS, YEARS } from '../../../../../utils/common'

export default class AssignmentModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      title: '',
    }
    this.onStaffTypeSelect = this.onStaffTypeSelect.bind(this);
  }

  onStaffTypeSelect = () => {
    console.log('selected');
  }

  render(){
    const staff = [
      {
        _id: '7912h3w0qdqdasda',
        name: {
          first: 'KIYI',
          last: 'Piasbda'
        },
        phone: '081999312013',
        candidates: 5
      },
      {
        _id: 'u9y9sad',
        name: {
          first: 'Pasdao',
          last: 'Gasiydas'
        },
        phone: '081999312313',
        candidates: 3
      }
      // {},
    ]
    return (
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-lg modal-info'>
        <ModalHeader toggle={this.props.toggle}>Change Assignment</ModalHeader>
        <Form encType="multipart/form-data" className="form-horizontal">
          <ModalBody>
            <FormGroup row>
              <Col md="2">
                <Label htmlFor="hf-password">Select Staff Type</Label>
              </Col>
              <Col xs="12" md="6">
                <Input type="text" id="hf-from" name="hf-password" placeholder="Enter a Title"
                  // onChange={(e)=>this.handleFieldChange('title', e.target.value)}
                  value={this.state.title}/>
              </Col>
            </FormGroup>
            <Table responsive="responsive">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Phone Number</th>
                  <th>Candidates Assigned</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {staff.map((staff)=>(
                  <tr>
                    <td>
                      <Link href={`/manager/staff?id=${staff._id}`} as={`/manager/staff/${staff._id}`}>
                        <a>{`${staff.name.last} ${staff.name.first}`}</a>
                      </Link>
                    </td>
                    <td>{staff.phone}</td>
                    <td>
                      {staff.candidates}
                    </td>
                    <td>
                      <Button color="primary" onClick={this.props.toggle}>Select This</Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </ModalBody>
          <ModalFooter>
            {/* <SaveButton {...this.state} close={this.props.toggle}/>{' '} */}
            <Button tyoe="reset" color="secondary" onClick={this.props.toggle}>Cancel</Button>
          </ModalFooter>
        </Form>
      </Modal>
    )
  }
}
