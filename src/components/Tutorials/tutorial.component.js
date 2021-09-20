import React, { useState, useEffect } from 'react'
// import { useParams } from 'react-router-dom'
import TutorialDataService from '../../services/tutorial.service'

const Tutorial = props => {
  // let { id } = useParams()

  const initialTutorialState = {
    id: null,
    title: '',
    description: '',
    published: false
  }

  const [tutorial, setTutorial] = useState(initialTutorialState)
  const [message, setMessage] = useState('')

  useEffect(() => {
    getTutorial(props.match.params.id)
  }, [props.match.params.id])
  
  const handleInputChanges = (e) => {
    const { name, value } = e.target
    setTutorial({...tutorial, [name]: value})
  }

  const getTutorial = (id) => {
    TutorialDataService.get(id)
      .then(response => {
        setTutorial(response.data)
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const updatePublished = (status) => {
    var data = {
      id: tutorial.id,
      title: tutorial.title,
      description: tutorial.description,
      published: status
    }

    TutorialDataService.update(tutorial.id, data)
      .then(response => {
        setTutorial({...tutorial, published: status})
        console.log(response.data)
      })
      .catch(e => {
        console.log(e)
      })
  }

  const updateTutorial = () => {
    TutorialDataService.update(
      tutorial.id,
      tutorial
    )
      .then(response => {
        console.log(response.data)
        setMessage('The tutorial was updated successfully!')
      })
      .catch(e => {
        console.log(e)
      })
  }

  const deleteTutorial = () => {
    TutorialDataService.deleteById(tutorial.id)
      .then(response => {
        console.log(response.data)
        props.history.push('/tutorials')
      })
      .catch(e => {
        console.log(e)
      })
  }

  return (
    <div>
      {tutorial ? (
        <div className='edit-form'>
          <h4>Tutorial</h4>
          <form>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                className='form-control'
                id='title'
                value={tutorial.title}
                onChange={handleInputChanges}
              />
            </div>
            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <input
                type='text'
                className='form-control'
                id='description'
                value={tutorial.description}
                onChange={handleInputChanges}
              />
            </div>

            <div className='form-group'>
              <label>
                <strong>Status:</strong>
              </label>
              {tutorial.published ? 'Published' : 'Pending'}
            </div>
          </form>

          {tutorial.published ? (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className='badge badge-primary mr-2'
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}

          <button
            className='badge badge-danger mr-2'
            onClick={deleteTutorial}
          >
            Delete
          </button>

          <button
            type='submit'
            className='badge badge-success'
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  )
}

export default Tutorial