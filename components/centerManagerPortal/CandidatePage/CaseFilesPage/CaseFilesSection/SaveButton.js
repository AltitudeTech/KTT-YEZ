import { Component, Fragment } from 'react'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify';
import { Button } from 'reactstrap'
import LaddaButton, { S, ZOOM_IN } from 'react-ladda';

import { TOAST_STYLE } from '../../../../../utils/common'
import { MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY } from '../../../../../lib/backendApi/queries'
import { MANAGER_CANDIDATE_BY_ID_CASE_FILE_CREATE_MUTATION } from '../../../../../lib/backendApi/mutations'

export default class SaveButton extends Component {
  constructor(props){
    super(props)
    this.save = this.save.bind(this);
    this.state = {
      id : props.id,
      loading: false
    }
  }

  shouldComponentUpdate(){
    return false
  }

  save = (e, runMutation) => {
    const {title, content, id} = this.props;
    const contentString = content.toString('html')

    if (title && contentString!="<p><br></p>" && id) {
      runMutation({
        variables: {
          title,
          content: contentString,
          managedId: id
        }
      })
    } else {
      let message ='Invalid inputs';
      if (!title) {
        message = 'Title field is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else if (contentString=="<p><br></p>") {
        message = 'content is empty';
        toast(message, {...TOAST_STYLE.fail});
      } else
        toast(message, {...TOAST_STYLE.fail});
    }
  }

  runUpdate = (cache, { data: { addCandidateCaseFile } }) => {
    // console.log(addCandidateCaseFile);
    const { id } = this.state;
    const data = cache.readQuery({ query: MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY, variables: {id: id} });

    // console.log('data');
    // console.log(data);
    // Add the new education to MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY
    data.managerCandidateById.caseFiles = [addCandidateCaseFile.record, ...data.managerCandidateById.caseFiles.slice(0, 4)]

    // Write our data back to the cache.
    cache.writeQuery({
      query: MANAGER_CANDIDATE_BY_ID_CASE_FILES_QUERY,
      variables: {id: id},
      data
     });
  }

  onCompleted = (data) => {
    const {addCandidateCaseFile: {record: {title}}} = data
    toast(`Your experience at ${title} has been added`, {...TOAST_STYLE.success});
    this.props.close();
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong", {...TOAST_STYLE.fail});
  }


  render(){
    return(
      <Mutation
        mutation={MANAGER_CANDIDATE_BY_ID_CASE_FILE_CREATE_MUTATION}
        update={this.runUpdate}
        onCompleted={this.onCompleted}
        onError={this.onError}>
        {(addCandidateCaseFile, {loading})=>(
          <Fragment>
            <LaddaButton
              className="btn btn-primary"
              loading={loading}
              onClick={e=>this.save(e, addCandidateCaseFile)}
              data-color="blue"
              data-spinner-color="blue"
              data-size={S}
              data-style={ZOOM_IN}
            >
              Save
            </LaddaButton>
            {/* <style jsx>{`
              button {
                display: inline-block;
                font-weight: 400;
                text-align: center;
                white-space: nowrap;
                vertical-align: middle;
                user-select: none;
                border: 1px solid transparent;
                padding: 0.375rem 0.75rem;
                font-size: 0.875rem;
                line-height: 1.5;
                border-radius: 0;
              }
            `}</style>
            <Button color="primary" onClick={e=>this.save(e, addCandidateCaseFile)}>Save</Button> */}
          </Fragment>
        )}
      </Mutation>
    )
  }
}
//export default SaveButton
