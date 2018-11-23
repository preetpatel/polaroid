// src/components/Header/index.js
import * as React from "react";
import { Component } from 'react';
import "./Header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOutAlt, faUserCircle, faUpload } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router-dom'
import LoginHOC from 'react-facebook-login-hoc';
import Modal from 'react-responsive-modal';
import { Button } from 'react-bootstrap';
import Camera from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';

const configureLoginProps = {
  scope: 'public_profile',
  xfbml: false,
  cookie: false,
  version: 2.6,
  language: 'en_US',
  appId: '820688131602902'
}

interface IProps {
  fb: any
}

interface IState {
  open: any,
  uploadFileList: any
}
class Header extends Component<IProps, IState>{

  public constructor(props: any) {
    super(props)
    this.state = {
      open: false,
      uploadFileList: []
    }
  }

  public render() {
    let profileContent;
    const { open } = this.state;
    const userData = localStorage.getItem("userData")
    let userDataJSON = { avatarUrl: undefined, name: undefined, id: undefined }
    if (userData != null) {
      userDataJSON = JSON.parse(userData)
    }
    if (userDataJSON.avatarUrl != null && userDataJSON.name != null) {
      profileContent = (
        <div className="collapse navbar-collapse flex-grow-0" id="navbarSupportedContent">
          <div className="pr-4">
            <button className="btn profile-edit-btn" onClick={this.onOpenModal}><FontAwesomeIcon icon={faUpload} /></button>
            <Modal open={open} onClose={this.onCloseModal} center>
              <div className="form pt-3">
                <h2>Upload an image</h2>
                <div className="form-group row">
                  <label className="col-sm-4 col-form-label">Caption</label>
                  <div className="col-sm-10">
                    <input className="form-control"
                      type="text"
                      name="caption"
                      id="caption"
                      placeholder="What does this picture mean?"
                    />
                  </div>
                </div>
              </div>
             
              <label className="col-form-label">Choose a method</label>
              <div className="btn-toolbar"style={{flexWrap: 'nowrap'}}>
              <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#takePicture" aria-expanded="false" aria-controls="takePicture">
                Take a picture
              </button>
              <button className=" btn btn-primary" type="button" data-toggle="collapse" data-target="#uploadPicture" aria-expanded="false" aria-controls="uploadPicture">
                Upload a picture
              </button>
              </div>
             
              <div className="collapse form-group row" id="uploadPicture">
              <input type="file" onChange={this.handleFileUpload} className="pl-4 form-control-file" id="polaroid-image-input" />
              </div>
              <div className="collapse pt-4 form-group row" id="takePicture">
              <div className="col-sm-12">
              <Camera
                onTakePhoto = { (dataUri: any) => { this.onTakePhoto(dataUri); } }
                isMaxResolution = {true}
              />
              </div>
              </div>
              <Button className="pl-4" onClick={this.uploadPhoto}>Upload Image</Button>

            </Modal>
          </div>
          <div className="Polaroid-user-avatar ml-auto">
            <img src={userDataJSON.avatarUrl} />
          </div>
          <ul className="navbar-nav text-right">
            <li className="nav-item active">
              <div className="dropdown">
                <a className="btn dropdown-toggle nav-link text-dark" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" href="#">{userDataJSON.name}</a>
                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                  <NavLink to={"/profile"} className="dropdown-item"><FontAwesomeIcon icon={faUserCircle} /> Profile</NavLink>
                  <NavLink onClick={this.props.fb.logout} to="/logout" className="dropdown-item"><FontAwesomeIcon icon={faSignOutAlt} /> Logout</NavLink>
                </div>
              </div>

            </li>
          </ul>
        </div>
      )
    }
    return (
      <nav className="navbar navbar-expand-sm navbar-light bg-white border-bottom sticky-top justify-content-end">
        <div className="navbar-brand">
          <NavLink to="/" className="Nav-brand-logo">Instagram</NavLink>
        </div>

        <div className="ml-auto" />

        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent">
          <span className="navbar-toggler-icon" />
        </button>

        {profileContent}
        <div className="pb-3" />
      </nav>
    );
  }

  public onOpenModal = () => {
    this.setState({ open: true });
  };

  public onCloseModal = () => {
    this.setState({ open: false });
  };

  public handleFileUpload = (fileList: any) => {
    this.setState({
      uploadFileList: fileList.target.files
    })
    console.log(fileList.target.files)
  }

  public uploadPhoto = () => {
    const caption = document.getElementById("caption") as HTMLInputElement
    const imageFile = this.state.uploadFileList[0]

    if (caption === null || caption.value === "" || imageFile === null) {
      return;
    }

    const captionText = caption.value
    let userID = "1"
    const userData = localStorage.getItem("userData")
    if (userData != null) {
      const userDataJSON = JSON.parse(userData)
      if (userDataJSON.id != null) {
        userID = userDataJSON.id
      }
    }
    const url = "https://apipolaroid.azurewebsites.net/api/PostItems/upload"

    const formData = new FormData()
    formData.append("UserID", userID)
    formData.append("Caption", captionText)
    formData.append("Image", imageFile)

    fetch(url, {
      body: formData,
      headers: { 'cache-control': 'no-cache' },
      method: 'POST'
    })
      .then((response: any) => {
        if (!response.ok) {
          // Error State
          alert(response.statusText)
        } else {
          location.reload()
        }
      })
  }

  public onTakePhoto = (dataUri: any) => {
    
    const imageBlob = this.dataURItoBlob(dataUri)
    const imageFile = this.blobToFile(imageBlob, "Image from camera")
    this.setState({
      uploadFileList: [imageFile]
    })
    console.log(imageFile)
  }

  public dataURItoBlob(dataURI:any) {
    // convert base64/URLEncoded data component to raw binary data held in a string
    let byteString;
    if (dataURI.split(',')[0].indexOf('base64') >= 0) {
        byteString = atob(dataURI.split(',')[1]);
    }else{
        byteString = unescape(dataURI.split(',')[1]);
    }
    // separate out the mime component
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

    // write the bytes of the string to a typed array
    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }

    return new Blob([ia], {type:mimeString});
}

public blobToFile = (theBlob: Blob, fileName:string): File => {
  const b: any = theBlob;
  // A Blob() is almost a File() - it's just missing the two properties below which we will add
  b.lastModifiedDate = new Date();
  b.name = fileName;

  // Cast to a File() type
  return b
}

}
export default LoginHOC(configureLoginProps)(Header);