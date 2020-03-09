import React, { Component } from 'react'
import Spinner from './Spinner';
import Buttons from './Buttons';
import { ROOT_URL } from '../config/config';
import axios from 'axios';

export default class ProductAdd extends Component {
  
  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    const files = Array.from(e.target.files);
    console.log(files);
    const formData = new FormData();

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    axios.defaults.headers.common['Authorization'] ='JWT ' + localStorage.getItem('bazaar_token');

    console.log('formData', formData);
   
    axios
    .post(`${ROOT_URL}/api/admin/products`, {
      body: formData
    })
    .then(res => res.json())
    .then(images => {
      this.setState({ 
        uploading: false,
        images
      })
    })
  }
  
  render() {
    const { uploading, images } = this.state

    const content = () => {
      switch(true) {
        case uploading:
          return <Spinner />
        default:
          return <Buttons onChange={this.onChange} />
      }
    }

    return (
      <div>
        <div className='buttons'>
          {content()}
        </div>
      </div>
    )
  }
}