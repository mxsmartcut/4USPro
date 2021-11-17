import axios from 'axios';
import apiConfig from '../config/config.json';

const client = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: { 
    'Content-Type': 'application/json;charset=UTF-8',
    "Access-Control-Allow-Origin": "*",
  }})



export default client;
