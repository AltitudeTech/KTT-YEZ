import {Component} from 'react'
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
  ModalFooter
} from 'reactstrap'

import RichTextEditor from 'react-rte';
import SaveButton from './SaveButton'
// import UpdateButton from './UpdateButton'

import { PAST_YEARS, YEARS } from '../../../../../utils/common'

export default class DetailsModal extends Component{
  constructor(props) {
    super(props)
    this.state = {
      id: props.id,
      title: '',
      content: RichTextEditor.createEmptyValue()
    }
    this.handleFieldChange = this.handleFieldChange.bind(this);
    // this.resetState = this.resetState.bind(this);
  }

  // resetState(){
  //   this.setState({
  //     id: '',
  //     title: '',
  //     content: RichTextEditor.createEmptyValue()
  //   })
  // }

  componentWillReceiveProps(nextProps){
    // this.resetState();
  }

  handleFieldChange(field, value){
    this.setState({[field]: value});
    // this.updateDetails(field, value);
  }

  onChange = (content) => {
    this.setState({content});
    if (this.props.onChange) {
      // Send the changes up to the parent component as an HTML string.
      // This is here to demonstrate using `.toString()` but in a real app it
      // would be better to avoid generating a string on each change.
      this.props.onChange(
        content.toString('html')
      );
    }
  }

  render(){
    return(
      <Modal isOpen={this.props.isOpen} toggle={this.props.toggle} className='modal-lg modal-info'>
        <ModalHeader toggle={this.props.toggle}>Create Case File</ModalHeader>
        <Form encType="multipart/form-data" className="form-horizontal">
        <ModalBody>
          <FormGroup row>
            <Col md="1">
              <Label htmlFor="hf-password">Title :</Label>
            </Col>
            <Col xs="12" md="11">
              <Input type="text" id="hf-from" name="hf-password" placeholder="Enter a Title"
                onChange={(e)=>this.handleFieldChange('title', e.target.value)}
                value={this.state.title}/>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Col md={{offset: 1, size: 11}}>
              <RichTextEditor
                className={"form-control"}
                value={this.state.content}
                onChange={this.onChange}
                editorStyle={{minHeight: '300px'}}
                rootStyle={{border: '1px solid #c2cfd6', borderRadius: '0'}}
              />
            </Col>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <SaveButton {...this.state} close={this.props.toggle}/>{' '}
          <Button tyoe="reset" color="secondary" onClick={this.props.toggle}>Cancel</Button>
        </ModalFooter>
      </Form>
      </Modal>
    )
  }
}
