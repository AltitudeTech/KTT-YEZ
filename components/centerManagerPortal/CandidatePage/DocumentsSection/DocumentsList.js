import { Component } from 'react'
import dynamic from 'next/dynamic'
import { Query } from 'react-apollo'
import moment from 'moment'
import { Mutation } from 'react-apollo'
import { toast } from 'react-toastify'

import { TOAST_STYLE, removeEmpty } from '../../../../utils/common'
import { MANAGER_CANDIDATE_BY_ID_DOCUMENTS_QUERY } from '../../../../lib/backendApi/queries'
import { MANAGER_CANDIDATE_BY_ID_DOCUMENT_DELETE_MUTATION } from '../../../../lib/backendApi/mutations'

import {
  ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  UncontrolledTooltip
} from 'reactstrap';
import Pagination from "react-js-pagination"
import Img from 'react-image'
import Dropzone from 'react-dropzone'
// import Lightbox from 'react-image-lightbox'
const Lightbox = dynamic(import('react-image-lightbox'), { loading: () => `` })

import Loading from '../../../common/LoadingIcon/LoadingIcon'

import UploadModal from './UploadModal'

const EmptySpace = props => (
  <p className="display-4" style={{ padding: '10px 0px 10px' }}>
    <i className="icon-ghost"></i> This space is lonely
  </p>
)

let images = [];
let pages = [];
export default class DocumentsList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showConfirmModal: false,
      deleteItemId: '',
      modalOpen: false,
      photoIndex: 0,
      isOpen: false,
      files: [],
      //Pagination variables
      currentPage: 1,
      perPage: 4,
      // pages: [1]
    }
    this.toggle = this.toggle.bind(this);
    this.save = this.save.bind(this);
    // this.toggleConfirm = this.toggleConfirm.bind(this);
    this.doDelete = this.doDelete.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
    this.onCompleted = this.onCompleted.bind(this);
    this.closeConfirm = this.closeConfirm.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ currentPage: pageNumber });
  }

  onDrop(files) {
    // console.log(files);
    this.setState({
      files,
      modalOpen: true
    });
  }

  toggleConfirm(item){
    this.setState({deleteItemId: item._id || ''})
    this.setState({showConfirmModal: !this.state.showConfirmModal})
  }

  closeConfirm(){
    this.setState({showConfirmModal: false})
  }

  toggle() {
    //destroy the object URL when closing preview modal
    (this.state.modalOpen) && (window.URL.revokeObjectURL(this.state.files[0].preview));
    this.setState({ modalOpen: !this.state.modalOpen })
  }

  doDelete = (e, runMutation) => {
    e.preventDefault()
    e.stopPropagation()
    const { deleteItemId } = this.state;

    // console.log(deleteItemId);
    // console.log(this.props.id,);

    if (deleteItemId) {
      runMutation({ variables: {
        id: deleteItemId,
        managedId: this.props.id,
        managedModelType: 'Candidate'
      }})
    }
  }

  onCompleted = (data, pageInfo) => {
    // console.log(data);
    const {deleteCandidateDocument: {record: {fileTitle}}} = data
    toast(`${fileTitle} has been deleted`, {...TOAST_STYLE.success});
    this.closeConfirm();
    if (pageInfo.currentPage > 1 && pageInfo.itemCount == (1+(pageInfo.currentPage-1)*pageInfo.perPage)){
      console.log('switchPage');
      //remove page from pages array
      this.setState({currentPage: pageInfo.currentPage - 1})
    }
    //TODO reload current page
  }

  onError = (error) => {
    console.log(error);
    toast("Something Went wrong while deleting document", {...TOAST_STYLE.fail});
  }

  save() {
    //console.log('saving');
    setTimeout(() => this.setState({ modalOpen: !this.state.modalOpen }), 2000)
  }

  render() {
    const { photoIndex, isOpen, files, currentPage, perPage } = this.state;
    // console.log(currentPage);
    return (
      <div>
        <Row>
          <Col xs="12" sm="12" md="12">
            <Card className="border-teal">
              <CardBody>
                <Dropzone onDrop={this.onDrop.bind(this)}
                  style={{
                    borderStyle: 'inherit',
                    borderRadius: '5px'
                  }}
                  accept="image/*"
                  multiple={false}>
                  <div className="text-center">
                    <p className="display-3"><i className="icon-cloud-upload"></i></p>
                    <p className="display-4" style={{ fontSize: '2rem' }}>Drop a file here or click to upload</p>
                  </div>
                </Dropzone>
              </CardBody>
            </Card>
          </Col>
          <UploadModal
            candidateId={this.props.id}
            currentPage= {currentPage}
            perPage= {perPage}
            pages={pages}
            isOpen={this.state.modalOpen}
            toggle={this.toggle}
            save={this.save}
            file={this.state.files[0]} />
        </Row>

        <Query query={MANAGER_CANDIDATE_BY_ID_DOCUMENTS_QUERY}
          variables={{
            // id: this.props.id,
            id: "5b0c1d38fc700ece3051f97b",
            page: currentPage,
            perPage: perPage
          }}>
          {({ loading, error, data }) => {
            if (loading)
              return <Loading />

            if (error)
              return `Error! ${error.message}`

            const { managerCandidateById } = data;
            console.log(this.props.id);
            console.log(data);
            console.log('managerCandidateById.documentsPagination.length');
            console.log(managerCandidateById.documentsPagination.items.length);
            const { documentsPagination } = managerCandidateById;
            const candidate = managerCandidateById;
            images = documentsPagination.items.map((doc) => ({
              imgUrl: doc.fileURL,
              title: doc.fileTitle
            }));
            // console.log(images);
            !pages.includes(documentsPagination.pageInfo.currentPage) && (pages.push(documentsPagination.pageInfo.currentPage))
            return (
              <div>
                <Row>
                  {documentsPagination.items.map((doc, index) => (
                    <Col key={index} xs="12" sm="4" md="3">
                      <Card className="border-teal">
                        <CardHeader>
                          <b>{doc.fileTitle}</b>
                          <div className="float-right">
                            <Button onClick={() => this.toggleConfirm(doc)} className="btn-sm" outline color="danger"><i className="icon-close"></i></Button>
                          </div>
                        </CardHeader>
                        <CardBody>
                          <div style={{ height: '160px', margin: 'auto' }}
                            onClick={() => this.setState({ isOpen: true, photoIndex: index })}>
                            <Img src={doc.fileURL} style={{ width: '100%', maxHeight: '100%' }} />
                          </div>
                        </CardBody>
                      </Card>
                    </Col>
                  )
                  )}
                </Row>
                {(documentsPagination.pageInfo.itemCount > this.state.perPage) && (
                  <div style={{ textAlign: 'center', width: 'fit-content', margin: 'auto' }}>
                    <Pagination
                      activePage={currentPage}
                      itemsCountPerPage={documentsPagination.pageInfo.perPage}
                      totalItemsCount={documentsPagination.pageInfo.itemCount}
                      pageRangeDisplayed={5}
                      onChange={this.handlePageChange}
                    />
                  </div>
                )}
                <Modal isOpen={this.state.showConfirmModal} toggle={()=>this.closeConfirm()} className='modal-md modal-danger' centered>
                  <ModalBody className="text-center">
                    <p className={'display-4 text-danger'} style={{fontSize: '1.9rem'}}>Are you sure you want to delete this document?</p>
                  </ModalBody>
                  <ModalFooter>
                    <Mutation mutation={MANAGER_CANDIDATE_BY_ID_DOCUMENT_DELETE_MUTATION}
                      onCompleted={data=>this.onCompleted(data, documentsPagination.pageInfo)}
                      onError={this.onError}
                      refetchQueries={()=> pages.map(page=>({
                        query: MANAGER_CANDIDATE_BY_ID_DOCUMENTS_QUERY,
                        variables: {
                          page: page,
                          id: this.props.id,
                          perPage: perPage
                        }
                      }))}
                      >
                      {(deleteCandidateDocument)=>(
                        <Button color="danger" onClick={e=>this.doDelete(e, deleteCandidateDocument)}>Confirm</Button>
                      )}
                    </Mutation>
                    <Button color="secondary" onClick={()=>this.closeConfirm()}>No thanks</Button>
                  </ModalFooter>
                </Modal>
              </div>
            )
          }}
        </Query>
        {isOpen && (
          <Lightbox
            mainSrc={images[photoIndex].imgUrl}
            nextSrc={images[(photoIndex + 1) % images.length].imgUrl}
            prevSrc={images[(photoIndex + images.length - 1) % images.length].imgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
            onMovePrevRequest={() =>
              this.setState({
                photoIndex: (photoIndex + images.length - 1) % images.length,
              })
            }
            onMoveNextRequest={() =>
              this.setState({
                photoIndex: (photoIndex + 1) % images.length,
              })
            }
            imageTitle={images[photoIndex].title}
          // discourageDownloads
          />
        )}
      </div>
    )
  }
}
