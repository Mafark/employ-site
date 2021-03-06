import store from '../store';
import 'whatwg-fetch';
import { browserHistory } from 'react-router';
import { userData, search } from '../actionCreators';
import { correctImg } from './helpers';

export const site = '//emploilodcore.azurewebsites.net';
export const imgUrl = site + '/images/';

const profile = {
  id: 1,
  name: 'Адольф',
  surname: 'Гитлер',
  middleName: 'Гитлероевич',
  mail: 'kaput@mail.ru',
  institute: 'ИТАСУ',
  course: '5 курс',
  direction: 'Прикладная информатика',
  aboutMe: 'Ich bin schwer zu finden, leicht zu verlieren und unmöglich zu vergessen',
  contacts: [
    {
      name: 'vk',
      value: 'http://vk.com/id123124'
    },
    {
      name: 'skype',
      value: 'Gitleruga228'
    },
    {
      name: 'phoneNumber',
      value: '1823797982'
    }
  ],
  avatar: './img/gitler.jpg',
  tags: ['Жариться', 'на', 'сковородке'],
  portfolio: [
    {
      id: 1,
      title: 'Хапут',
      description:
        'In Russland haben Weihnachten und Silvester Plätze getauscht. Weihnachten fällt auf den 7. Januar und wird also nach Silvester gefeiert. Das wichtigste Ereignis des Abends vor Weihnachten ist ein stundenlanger Gottesdienst mit viel Gesang und schöne Lichter-Prozession.',
      imageUrl: './img/logo.png',
      tags: ['Программирование', 'Веб-дизайн', 'Андроид'],
      leader: {
        id: 3,
        name: 'Борис',
        surname: 'Вальдман'
      },
      members: [
        {
          id: 1,
          role: 'Копатель',
          name: 'Жамбыл',
          surname: 'Ермагамбет'
        },
        {
          id: 2,
          role: 'Копатель',
          name: 'Жамбыл',
          surname: 'Ермагамбет'
        },
        {
          id: 3,
          role: 'Тимлид',
          name: 'Борис',
          surname: 'Вальдман'
        }
      ]
    }
  ],
  organizations: [
    {
      id: 1,
      imageUrl: './img/logo.png',
      title: 'Лига'
    },
    {
      id: 2,
      imageUrl: './img/logo.png',
      title: 'Лига'
    }
  ]
};

const project = {
  id: 1,
  avatar: null,
  leader: {
    id: 79,
    name: 'Вася',
    surname: 'Пупкин'
  },
  name: 'Emploi',
  description:
    'Реализовать свои приобретенные навыки или найти нужного человека себе в команду, в этом вам поможет Emploi',
  tags: ['Программирование', 'Веб-дизайн', 'Андроид'],
  team: [
    {
      id: 21,
      member: {
        id: 79,
        name: 'Гоша',
        surname: 'Ваниль'
      },
      profession: 'Сиделка',
      description: 'Хорошая сиделка по отличной цене, очень пригодится, ваще кайф.',
      tags: ['Сижу', 'Не тужу']
    },
    {
      id: 24,
      profession: 'Сиделка',
      description: 'Хорошая сиделка по отличной цене, очень пригодится, ваще кайф.',
      tags: ['Сижу', 'Не', 'тужу']
    }
  ]
};

const vacancy = {
  id: 1,
  profession: 'Сиделка',
  description: 'Хорошая сиделка по отличной цене, очень пригодится, ваще кайф.',
  tags: ['Сижу', 'Не тужу']
};

export const getCurrentUser = () => {
  return fetch(site + '/current/', {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token')
    }
  }).then(function(response) {
    if (response.status === 200) {
      response.json().then(res => {
        // res.tags.push('Птички')
        // res.tags.push('Бабочки')
        // res.tags.push('Цветочки')
        console.log(res);
        store.dispatch(userData.updateUser(res));
      });
    } else {
      store.dispatch(userData.updateUser({}));
    }
  });
};

export const logOut = () => {
  return fetch(site + '/logOut', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token')
    }
  }).then(function(response) {
    console.log(response);
  });
};

export const authorization = (mail, pass) => {
  const data = {
    mail: mail,
    password: pass
  };
  fetch(site + '/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    function(response) {
      if (response.status === 200) {
        response.json().then(res => {
          console.log(res);
          // Checking for profile completeness
          if (res.user) {
            localStorage.setItem('token', res.token);
            store.dispatch(userData.updateUser(res.user));
          } else {
            browserHistory.push('/confirm/' + res.token);
          }
        });
      }
    },
    function(error) {
      // console.log(error);
    }
  );
};

export const preRegistration = (mail, pass) => {
  const data = {
    mail: mail,
    password: pass
  };
  fetch(site + '/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(
    function(response) {
      console.log(response);
    },
    function(error) {
      // console.log(error);
    }
  );
};

export const editUser = (token, userData) => {
  return fetch(site + '/users/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + token
    },
    body: JSON.stringify(userData)
  }).then(function(response) {
    console.log(response);
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const confirmToken = token => {
  return fetch(site + '/users/confirm/' + token, {
    method: 'POST'
  }).then(function(response) {
    return response;
  });
};

export const getUserByID = id => {
  return fetch(site + '/users/' + id, {
    method: 'GET'
  }).then(function(response) {
    if (response.status === 200) {
      return response.json().then(user => {
        console.log(user);
        user.avatar = correctImg(user.avatar);
        user.portfolio.forEach(function(project) {
          project.avatar = correctImg(project.avatar);
        });
        return user;
      });
    }
  });
};

export const uploadFile = file => {
  return fetch(site + '/file', {
    method: 'POST',
    body: file
  }).then(function(response) {
    console.log(response);
    if (response.status === 200) {
      return response.json();
    } else {
      return response;
    }
  });
};

export const editTags = (token, tags) => {
  return fetch(site + '/users/tags/', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + token
    },
    body: JSON.stringify({ tags: tags })
  }).then(function(response) {
    console.log(response);
  });
};

export const getBestStudents = () => {
  let mas = [];
  for (let i = 0; i < 5; i++) {
    mas.push({
      id: 1,
      name: 'Вася',
      surname: 'Пупкин',
      avatar: null
    });
  }
  mas.forEach(unit => {
    unit.avatar = correctImg(unit.avatar);
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(mas);
    }, 1000);
  });
};

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/*Projects*/
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
export const getProject = id => {
  //dell
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     let res = Object.assign({}, project);
  //     res.avatar = correctImg(res.avatar);
  //     console.log(res);
  //     resolve(res);
  //   }, 1000);
  // });
  //dell
  return fetch(site + '/projects/' + id, {
    method: 'GET'
  }).then(function(response) {
    if (response.status === 200) {
      return response.json().then(function(res) {
        res.avatar = correctImg(res.avatar);
        console.log(res);
        return res;
      });
    }
  });
};

export const createProject = project => {
  /*
    body: {
      avatar,
      name,
      description,
      tags
    }
  */
  return fetch(site + '/projects/', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  }).then(function(response) {
    return response;
    console.log(response);
  });
};

export const editProject = (id, project) => {
  /*
  body: {
    avatar,
    name,
    description,
    tags
  }
  */
  return fetch(site + '/projects/' + id, {
    method: 'PUT',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(project)
  }).then(function(response) {
    return response;
    console.log(response);
  });
};

export const deleteProject = projectID => {
  return fetch(site + '/projects/' + projectID + '/delete/', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token')
    }
  }).then(function(response) {
    return response;
    console.log(response);
  });
};

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/*Vacancies*/
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
export const getVacancy = (projectID, vacancyID) => {
  //dell
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     let res = Object.assign({}, vacancy);
  //     resolve(res);
  //   }, 1000);
  // });
  //dell
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID, {
    method: 'GET'
  }).then(function(response) {
    if (response.status === 200) {
      return response.json();
    }
  });
};

export const createVacancy = (projectID, vacancy) => {
  /*
    body: {
      profession,
      description,
      tags[]
    }
  */
  return fetch(site + '/projects/' + projectID + '/vacancies/', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vacancy)
  }).then(function(response) {
    return response;
    console.log(response);
  });
};

export const editVacancy = (projectID, vacancyID, vacancy) => {
  /*
  body: {
    profession,
    description,
    tags[]
  }
  */
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID, {
    method: 'PUT',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(vacancy)
  }).then(function(response) {
    return response;
    console.log(response);
  });
};

export const deleteVacancy = (projectID, vacancyID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/delete/', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token')
    }
  }).then(function(response) {
    console.log(response);
  });
};

export const assignToVacancy = (projectID, vacancyID, userID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/assign/', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      memberId: userID
    })
  }).then(function(response) {
    console.log(response);
  });
};

export const unassignToVacancy = (projectID, vacancyID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/unassign/', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token')
    }
  }).then(function(response) {
    console.log(response);
  });
};

export const getVacancyLink = (projectID, vacancyID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/token/', {
    method: 'GET',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token')
    }
  }).then(function(response) {
    console.log(response);
    return response.json();
  });
};

export const applyToVacancy = (projectID, vacancyID, message) => {
  return fetch(site + '/project/' + projectID + '/vacancy/' + vacancyID + '/apply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      message: message ? message : null
    })
  }).then(function(response) {
    console.log(response);
  });
};
export const inviteToVacancy = (projectID, vacancyID, userID) => {
  return fetch(site + '/projects/' + projectID + '/vacancies/' + vacancyID + '/invite', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Basic ' + localStorage.getItem('token')
    },
    body: JSON.stringify({
      userId: userID
    })
  }).then(function(response) {
    console.log(response);
  });
};

export const applyToVacancyByToken = inviteToken => {
  return fetch(site + '/vacancies/applyByToken', {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + localStorage.getItem('token'),
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      vacancyToken: inviteToken
    })
  }).then(function(response) {
    return response;
  });
};

/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// Search
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
/////////////////////////////////////
// export const getStudentsSearchPreview = () => {
//   // на пустую строку популярные тэги
//   /// //////DELETE
//   // send data
//   let st = store.getState().search.searchString;
//   console.log('Строка: ', st);
//   let tags = store.getState().search.searchSelectedTags;
//   console.log('Выбранные тэги: ', tags);
//   let config = store.getState().search.searchConfig;
//   console.log('Конфиг ', config);
//   console.log('-----------------------------------------');
//   // get data
//   let mas = [];
//   for (let i = 0; i < 10; i++) {
//     mas = [
//       ...mas,
//       {
//         id: 79,
//         name: 'Василий',
//         surname: 'Пупкин',
//         avatar: '/img/avatar.jpg',
//         tags: ['Программирование', 'Веб-дизайн', 'Андроид']
//       }
//     ];
//   }
//   return {
//     tags: ['Программирование', 'Веб-дизайн', 'Заоза'],
//     data: mas
//   };
// };

export const getTagsByString = (str, returnMod = false) => {
  let searchString = str ? str : store.getState().search.searchString;
  // if (!returnMod) {
  //   store.dispatch(search.updateTags(['lala', 'lolo']));
  // } else {
  //   return new Promise((resolve, reject) => {
  //     resolve(['lala', 'lolo']);
  //   });
  // }
  return fetch(site + '/tags/' + searchString, {
    method: 'GET'
  }).then(function(response) {
    return response.json().then(res => {
      let selectedTags = store.getState().search.searchSelectedTags;
      let tags = res.tags.filter(tag => {
        return selectedTags.indexOf(tag) === -1;
      });
      if (!returnMod) {
        store.dispatch(search.updateTags(tags));
      } else {
        return new Promise((resolve, reject) => {
          resolve(tags);
        });
      }
    });
  });
};

export const getStudentsSearchDataByPage = (page = 1, returnMod = false) => {
  let searchString = store.getState().search.searchString;
  let selectedTags = store.getState().search.searchSelectedTags;
  let config = store.getState().search.searchConfig;

  return fetch(
    site +
      '/users/search/byPage?page=' +
      page +
      '&str=' +
      searchString +
      '&tags=' +
      JSON.stringify(selectedTags) +
      '&course=' +
      config.course +
      '&institute=' +
      config.institute,
    {
      method: 'GET'
    }
  ).then(function(response) {
    return response.json().then(users => {
      for (let i = 0; i < users.length; i++) {
        users[i].avatar = correctImg(users[i].avatar);
      }
      if (!returnMod) {
        store.dispatch(page === 1 ? search.updateData(users) : search.pushData(users));
      } else {
        return new Promise((resolve, reject) => {
          resolve(users);
        });
      }
    });
  });
};

export const getProjectsSearchDataByPage = (page = 1, returnMod = false) => {
  let searchString = store.getState().search.searchString;
  let selectedTags = store.getState().search.searchSelectedTags;

  return fetch(
    site +
      '/projects/search/byPage?page=' +
      page +
      '&str=' +
      searchString +
      '&tags=' +
      JSON.stringify(selectedTags),
    {
      method: 'GET'
    }
  ).then(function(response) {
    return response.json().then(projects => {
      for (let i = 0; i < projects.length; i++) {
        projects[i].avatar = correctImg(projects[i].avatar);
      }
      if (!returnMod) {
        store.dispatch(page === 1 ? search.updateData(projects) : search.pushData(projects));
      } else {
        return new Promise((resolve, reject) => {
          resolve(projects);
        });
      }
    });
  });
};

export const getHomePageData = () => {
  fetch('http://jsonplaceholder.typicode.com/posts/1', {
    method: 'GET'
  }).then(
    function(response) {
      response.json().then(data => {
        // console.log(profile);
      });
    },
    function(error) {
      // console.log(error);
    }
  );
};
