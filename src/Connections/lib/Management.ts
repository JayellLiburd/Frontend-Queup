import axios from "axios";
import { BusinessTypes } from './@Types'
let Slink = process.env.REACT_APP_Server || "http://localhost:4000";
let Spath = "/";
const Linkregex = new RegExp(/^(https?|ftp):\/\/[^ "]+$/);

interface ServerInfo {
  /**
   * @param url - Server URL
   * @requires url to not have a '/' or a endpoint at the end to be valid
   * @default 'http://localhost:4000'
   * @type string
   * @memberof ServerInfo
   */
  link?: string;
  /**
   * @param path - Server Endpoint
   * @requires url to be valid
   * @default "/"
   * @type string
   * @memberof ServerInfo
   */
  path?: string;
}

interface Filter {
  /**
   * @param query - Search Database with Inputed String
   */
  query?: string;
  /**
   * @param catagory - Filter Database with Inputed Catagory Type
   * @description catagory can be any string or shorthand
   */
  catagory?: string;
  /**
   * @param sort - Sort Query via Ascending or Descending
   */
  sort?: string;
  /**
   * @param page - Limit Number of results per page
   */
  page?: number;

  /**
   * @param all - Get all Media from Database
   * @warning this will return all media in the database no matter the catagory or query
   * @default false
   * @type boolean
   */
  all?: boolean;
}

interface Connection {

  /**
  * @method Filter
  * @param filters - Filters database Gallery
  * @description filters the data weather it be a search, catagory, sort, or page
  */
  filter: ({}: Filter, serverInfo?: ServerInfo) => Promise<any>;

  /**
   * @method Patch
   * @param BusinessForm - User Information to Register
   * @param ServerInfo - Connection parameters to server (link, path) This is optional and will use the default if not provided
   * @type BusinessForm - Object
   * @returns a promise from server
   */
  patch: ({}: BusinessTypes, serverInfo?: ServerInfo) => Promise<any>;
}

const management: Connection = {
  // API Query Interactions //

  filter: async function filter(filters, serverInfo?): Promise<any> {
    let promise = null;
    if (serverInfo?.link) Slink = serverInfo.link;
    if (serverInfo?.path) Spath = serverInfo.path;
    else Spath = "/api/gallery";
    if (!Linkregex.test(Slink + Spath)) {
      throw new Error("Invalid link");
    }

    axios.post(Slink + Spath, filters, { withCredentials: true })
      .then((response: any) => {
        promise = response;
      })
      .catch((error: any) => {
        console.log(error);
      })
    return promise;
  },

  patch: async function patch(Form, serverInfo?) {
    let promise = null;
    if (serverInfo?.link) Slink = serverInfo.link;
    if (serverInfo?.path) Spath = serverInfo.path;
    else Spath = "/api/update";
    if (!Linkregex.test(Slink + Spath)) {
      throw new Error("Invalid link");
    }

    axios.patch(Slink + Spath, Form, { withCredentials: true })
      .then((response: any) => {
        promise = response;
      })
      .catch((error: any) => {
        console.log(error);
      })
    return promise;
  }
}

export default management;