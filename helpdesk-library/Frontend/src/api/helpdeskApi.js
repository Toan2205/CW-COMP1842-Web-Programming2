import axios from 'axios';

const API_URL = 'http://localhost:3000/helpdesk';

export const getAllIssues = () => axios.get(API_URL);

export const getIssueById = (id) => axios.get(`${API_URL}/${id}`);

export const createIssue = (data) => axios.post(API_URL, data);

export const updateIssue = (id, data) => axios.put(`${API_URL}/${id}`, data);

export const deleteIssue = (id) => axios.delete(`${API_URL}/${id}`);
