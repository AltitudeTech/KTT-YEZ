import { Component } from 'react'
import Router from 'next/router'
import { Mutation } from 'react-apollo'
import moment from 'moment'

import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip
} from 'reactstrap';

import { prettifyState } from '../../../../../utils/common'

import DeleteButton from './DeleteButton'

export default class EducationList extends Component {
  constructor(props){
    super(props)
    this.state = {
      showConfirmModal: false,
      modalOpen: false,
      isEmpty: true,
      selectedjob: {},
      deleteJobId: ''
    }
    this.toggleConfirm = this.toggleConfirm.bind(this);
  }

  toggleConfirm(job){
    // console.log(job);
    if (job._id) {
      this.setState({selectedjob: job});
    };
    this.setState({showConfirmModal: !this.state.showConfirmModal});
  }

 render(){
   return(
    <div>
      <ListGroup>
        {this.props.centerManager.jobs.map((job, index)=>(
          <ListGroupItem key={index} className="animated fadeIn">
            <ListGroupItemHeading>
              <div className="float-right">
                <Button className="btn-sm" outline color="primary"
                  onClick={()=>Router.push(
                    `/centerManager/job/edit?id=${job._id}`,
                    `/centerManager/job/${job._id}/edit`
                  )}><i className="icon-pencil"></i>&nbsp; Edit</Button>
                {' '}<Button onClick={()=>this.toggleConfirm(job)} className="btn-sm" outline color="danger"><i className="icon-trash"></i></Button>
              </div>
              <a href="#!" id={`UncontrolledTooltipExample${index}`}>
                <i className={job.isOnDisplay ? 'text-success icon-check' : 'text-danger icon-close'}></i>
              </a>
              <UncontrolledTooltip placement="top" target={`UncontrolledTooltipExample${index}`}>
                 {job.isOnDisplay ? 'is being displayed' : 'is not being displayed'}
               </UncontrolledTooltip>
              {' '}
              <a href='#'
                onClick={()=>Router.push(
                  `/centerManager/job?id=${job._id}`,
                  `/centerManager/job/${job._id}`
                )}>{job.role}</a>
            </ListGroupItemHeading>
            <div>
              <p style={{marginBottom: '0px'}}><i className="icon-organization"></i> {this.props.centerManager.name}</p>
              <p className="text-muted" style={{marginBottom: '0px', fontWeight: '300', lineHeight: '1.2'}}>
                {/*`${job.address}, */`${prettifyState(job.state)}`}
              </p>
              <p style={{marginBottom: '0px', fontWeight: '300', lineHeight: '1.2'}}>
                {job.basicDescription}
              </p>
              <p className="text-muted">{`${moment(job.publishedDate).from(this.props.currentTime)}`}</p>
            </div>
          </ListGroupItem>
        ))}
      </ListGroup>
      <Modal isOpen={this.state.showConfirmModal} toggle={()=>this.toggleConfirm({})} className='modal-md modal-danger' centered>
        <ModalBody className="text-center">
          <p className={'display-4 text-danger'} style={{fontSize: '1.9rem'}}>Are you sure you want to delete this <b className="text-dark">{this.state.selectedjob.role}</b> job?</p>
        </ModalBody>
        <ModalFooter>
          <DeleteButton details={{id: this.state.selectedjob._id}} toggleConfirm={()=>this.toggleConfirm({})}/>
          <Button color="secondary" onClick={this.toggleConfirm}>No thanks</Button>
        </ModalFooter>
      </Modal>
    </div>
   )
  }
}
