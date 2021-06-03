import axios from 'axios'

const instance = axios.create({
  baseURL:'http://localhost:8881',
  //baseURL: 'https://www.fastmock.site/mock/c2662fb669b9378b206443199c38de89/learn',
  timeout: 10000
})

export const get = (url, params = {}) => {
  return new Promise((resolve, reject) => {
    instance.get(url, { params }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export const post = (url, data = {}) => {
  return new Promise((resolve, reject) => {
    instance.post(url, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}