import {
  createPool,
} from 'slonik';

import type { DatabasePool } from "slonik";

import {
  createFieldNameTransformationInterceptor
} from 'slonik-interceptor-field-name-transformation';


// transforms underscore table names to camel case
const interceptors = [
  createFieldNameTransformationInterceptor({
    format: 'CAMEL_CASE'
  })
];


export async function getDBPool(): Promise<DatabasePool>  {
  let db: DatabasePool;
  try {
	  db = await createPool(process.env.DATABASE_URI, {interceptors});
  } catch(e) {
    console.log("Retrying db connection");
    setTimeout(getDBPool, 5000);
  }
	return db;
}
