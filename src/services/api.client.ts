import axios from 'axios';

import dotenv from 'dotenv';

dotenv.config();

const api = axios.create({
	baseURL: `${process.env.REACT_APP_PREFIX}`,
});

export default api;
