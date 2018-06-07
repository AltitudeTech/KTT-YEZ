import { Component } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'

import { TOAST_STYLE, removeEmpty, enumifyState } from '../../../../utils/common'
import { HOME_COMPANY_JOBS_QUERY } from '../../../../lib/backendApi/queries'
import { DELETE_COMPANY_JOB_MUTATION } from '../../../../lib/backendApi/mutations'


export default class DeleteButton extends Component {
  constructor(props){
    super(props)
    this.doDelete = this.doDelete.bind(this);
  }

  shouldComponentUpdate(){
    return false
  }

  doDelete = (e, runMutation) => {
    let data = this.props.details;
    // console.log(data);
    runMutation({
      variables: {id: data.id},
      update: (proxy, { data: { deleteJob } }) => {
        // Read the data from our cache for this query.
        const data = proxy.readQuery({ query: HOME_COMPANY_JOBS_QUERY });

        // Remove the deleted jobs from HOME_COMPANY_JOBS_QUERY
        data.viewerCompany.company.jobs = data.viewerCompany.company.jobs.filter(e => e._id != deleteJob.recordId);

        // Write our data back to the cache.
        proxy.writeQuery({ query: HOME_COMPANY_JOBS_QUERY, data });
      }
    })
    this.props.toggleConfirm();
  }

  onCompleted = (data) => {
    const {deleteJob: {record: {role}}} = data
    toast(`Your ${role} job has been deleted`, {...TOAST_STYLE.success});
    this.props.toggleConfirm();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }

  render(){
    return(
      <Mutation mutation={DELETE_COMPANY_JOB_MUTATION} onCompleted={this.onCompleted} onError={this.onError}>
        {(deleteJob)=>(
          <Button color="danger" onClick={e=>this.doDelete(e, deleteJob)}>Delete</Button>
        )}
      </Mutation>
    )
  }
}
//export default DeleteButton
