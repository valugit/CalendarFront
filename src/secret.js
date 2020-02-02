import { getEnv } from '@babel/core/lib/config/helpers/environment';

const dev = () => ({
    apiUrl: 'http://localhost:3001',
});

const prod = () => ({
    apiUrl: 'https://rpg-calendar.herokuapp.com',
});

export default getEnv() === 'production' ? prod() : dev();