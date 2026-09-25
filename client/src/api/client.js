import axios from 'axios' 
import * as mock from '../data/mockData.js'
const api = axios.create({ baseURL: '/api', timeout: 10000 }) /// api being called from here by using axios
const delay = (ms) => new Promise((r) => setTimeout(r, ms))

export async function getDashboardStats() {
  await delay(150)
  return mock.dashboardStats
  // return (await api.get('/dashboard/stats')).data
}

export async function getUsers() {
  await delay(150)
  return mock.users
  // return (await api.get('/users')).data
}
export async function getEmployees() {
  await delay(150)
  return mock.employees
}

export async function getNotifications() {
  await delay(100)
  return mock.notifications
  // return (await api.get('/notifications')).data
}

export async function getConstructionSites() {
  await delay(150)
  return mock.constructionSites
  // return (await api.get('/construction-sites')).data
}

export async function getSiteEngineers() {
  await delay(150)
  return mock.siteEngineers
  // return (await api.get('/site-engineers')).data
}

export async function getMaterialLog() {
  await delay(150)
  return mock.materialLog
  // return (await api.get('/material-log')).data
}

export async function getNewsAlerts() {
  await delay(150)
  return mock.newsAlerts
  // return (await api.get('/news-alerts')).data
}

export async function sendChatMessage(message, history = []) {
  const { data } = await api.post('/chat', { message, history })
  return data.reply
}

export async function getRoles() {
  await delay(150)
  return mock.roles
  // return (await api.get('/roles')).data
}

export async function getActivityLog() {
  await delay(150)
  return mock.activityLog
  // return (await api.get('/users/activity')).data
}

export async function projects(){
  await delay(150)
  return mock.projects
  
}

