import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { imgUrl, uploadFile } from '../../common/ajaxRequests';
import { defaultImg } from '../../common/helpers';

class CreateProjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgStatus: 'Загрузить аватар',
      previewAvatar: null,
      project: {
        avatar: null
      }
    }
  }

  componentWillMount() {
    this.props.user.id ? null : browserHistory.push('/');
  }

  uploadImage(e) {
    this.setState({
      imgStatus: 'Загрузка картинки'
    });
    let file = new FormData();
    file.append('Content', e.target.files[0]);
    uploadFile(file).then((res) => {
      if (res.status) {
        if (res.status === 406) {
          this.setState({
            imgStatus: 'Разрешенные форматы: png, jpg, jpeg'
          });
        } else {
          this.setState({
            imgStatus: `Неизвестная ошибка: ${res.status}`
          });
        }
      } else {
        let newProject = Object.assign({}, this.state.project);
        newProject.avatar = imgUrl + res;
        this.setState({
          projects: newProject,
          previewAvatar: imgUrl + res,
          avatarStatus: 'Картинка загружена'
        })
      }
    })
  }

  render() {
    if (true) {
      return (
        <div>
          <div style={{ width: '300px' }} className="img-mask auto-img circle border">
            <img alt="pic" className=""
              src={this.state.previewAvatar === null ? defaultImg : this.state.previewAvatar} />
            <div className="img-upload">
              <p>{this.state.imgStatus}</p>
              <input type='file' onChange={this.uploadImage.bind(this)} />
            </div>
          </div>
          leader id
          <input type="text" />
          name
          <input type="text" />
          description
          <input type="text" />
          теги через пробел
          <input type="text" />
          ВАКАНСИИ
          профессия
          <input type="text" />
          описание
          <input type="text" />
          теги через пробел
          <input type="text" />
        </div>
      )
    } else {
      return (
        <div>
          <span className="preloader">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </span>
        </div>
      )
    }
  }
}

export default connect(
  state => ({
    user: state.userData
  })
)(CreateProjectPage);