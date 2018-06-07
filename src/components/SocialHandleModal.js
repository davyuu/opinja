import React from 'react'
import PropTypes from 'prop-types'
import gql from 'graphql-tag'
import {graphql, compose} from 'react-apollo'
import Modal from 'react-modal'
import keys from '../constants/keys'
import './SocialHandleModal.css'

Modal.setAppElement('#app')

class SocialHandleModal extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
      id: null,
      handleType: null,
      handle: ''
    }

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onHandleSubmit = this.onHandleSubmit.bind(this);
  }

  componentDidMount() {
    this.props.onRef(this)
  }

  componentWillUnmount() {
    this.props.onRef(undefined)
  }

  openModal(id, handleType, handle) {
    this.setState({
      modalIsOpen: true,
      id,
      handleType,
      handle: handle || ''
    });
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
      id: null,
      handleType: null,
      handle: ''
    });
  }

  onHandleChange(event) {
    this.setState({handle: event.target.value})
  }

  onHandleSubmit() {
    const {id, handleType, handle} = this.state;
    if(!handle) {
      alert('Please enter a handle')
      return
    }

    if(handleType === keys.TWITTER) {
      this.props.setTwitterHandle({
        variables: {
          id,
          twitterHandle: handle
        },
      }).then(({data}) => {
        this.props.refresh();
      }).catch(error => {
        alert(error)
      })
    } else if(handleType === keys.INSTAGRAM) {
      this.props.setInstagramHandle({
        variables: {
          id,
          instagramHandle: handle
        },
      }).then(({data}) => {
        this.props.refresh();
      }).catch(error => {
        alert(error)
      })
    }

    this.closeModal()
  }

  render() {
    const {handleType, handle} = this.state;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        onRequestClose={this.closeModal}
        className='social-modal'
        overlayClassName='social-modal-overlay'
      >
        <div className='social-modal-container'>
          <div className='social-modal-title'>
            Set {handleType} handle
          </div>
          <div className='social-modal-handle'>
            @
            <input
              className='social-modal-input'
              onChange={this.onHandleChange}
              value={handle}
            />
          </div>
          <div
            className='social-modal-submit'
            onClick={this.onHandleSubmit}
          >
            Submit
          </div>
        </div>
      </Modal>
    )
  }
}

SocialHandleModal.propTypes = {
  onRef: PropTypes.func.isRequired,
  refresh: PropTypes.func.isRequired
}

const MUTATION_TWITTER = gql`
  mutation setTwitterHandle($id: String!, $twitterHandle: String!){
    setTwitterHandle(id: $id, twitterHandle: $twitterHandle) {
      id
      name
      twitterHandle
    }
  }
`

const MUTATION_INSTAGRAM = gql`
  mutation setInstagramHandle($id: String!, $instagramHandle: String!){
    setInstagramHandle(id: $id, instagramHandle: $instagramHandle) {
      id
      name
      instagramHandle
    }
  }
`

export default compose(
  graphql(MUTATION_TWITTER, {name: 'setTwitterHandle'}),
  graphql(MUTATION_INSTAGRAM, {name: 'setInstagramHandle'})
)(SocialHandleModal)
