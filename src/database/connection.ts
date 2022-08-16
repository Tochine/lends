import Knex from 'knex';
import config  from '../../knexfile';


const knex = Knex(config[process.env.NODE_ENV!])

export default knex;