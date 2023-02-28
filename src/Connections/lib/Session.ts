const axios = require("axios").default;
const uuid = require("uuid").v4;

const Linkregex = new RegExp(/^(https?|ftp):\/\/[^ "]+$/);

let Slink = process.env.REACT_APP_Server || "http://localhost:4000";
let Spath = "/";
//todo: Add CRSF Token to further authenticate Users, CRSF should be saved to only Document no other storage device 
let Token = uuid()


interface ServerInfo {
  /**
   * @param link is the location link to the backend server
   * @requires link to not have a '/' or a endpoint at the end to be valid
   * @example 'https://example.com'
   * @default 'http://localhost:4000'
   */
  link?: string;

  /** 
   * @param path is the endpoint after base link to the backend server
   * @requires link to be valid
   * @default "/"
   */
  path?: string;

  response?: any
}

interface Registation {
  /**
   * @param firstName - User First Name
   */
  firstName: string;
  /**
   * @param lastName - User Last Name
   */
  lastName: string;
  /**
   * @param email - User Email
   * @description email must be a valid email
   * @example 'example@email.com'
   */
  email: string;
  /**
   * @param username - User Username
   */
  username: string;
  /**
   * @param password - User Password
   * @description password must be at least 8 characters long, contain at least one number, one uppercase letter, and one special character
   * @example 'password123'
   */
  password: string;
}

interface Login{
  /**
   * @param type - Type of Login (standard, google, facebook, etc.) ~
   * standard - username and password form,
   * google - google login Input Required: {data}.credential
   */
  type: 'standard' | 'google'
  /**
   * @param cred - User Login Credentials
   * @description cred is required for standard login
   * @example { username: 'username', password: 'password' }
   * @example { username: 'example@emailhost.com', password: 'Case Sensitive password' }
   */
  cred: { username: string; password: string };
  /**
   * @param data - Data to send to server mostly used for google and facebook
   * @description data is required for param goog google login
   * @example { credential: {google's credential} }
   */
  data: { credential?: object };
}

interface Auth_Methods {
  /**
   * @method Registation
   * @param user - User Information to Register
   * @param ServerInfo - Connection parameters to server (link, path) This is optional and will use the default if not provided
   * @returns a promise from server
   */
  register (user: { firstName: Registation['firstName'], lastName: Registation['lastName'], email: Registation['email'], username: Registation['username'], password: Registation['password']}, serverInfo?: ServerInfo): Promise<any>;

  /**
   * @method Login
   * @param type - Type of Login (standard, google, facebook, etc.)
   * @param data - Use the correct params to authenticate, Standard uses Credentials while 3rdParties use PartyData
   * @param ServerInfo - Connection parameters to server (link, path) This is optional and will use the default if not provided
   * @returns a promise from server
   */
  login (type: Login['type'], data: {credentials?: Login['cred'], partyData?: Login['data']}, serverInfo?: ServerInfo): Promise<any>;

  /**
   * @method Logout
   * @description logs the user out of the server
   * @beware this will delete the session and refresh the page
   * @param ServerInfo - Connection parameters to server (link, path) This is optional and will use the default if not provided
   * @returns a promise from server
   */
  logout (serverInfo?: ServerInfo): Promise<any>;

  /**
   * @method Varify
   * @description verifies the user session weather logged in or not
   * @param ServerInfo - Connection parameters to server (link, path) This is optional and will use the default if not provided
   * @returns a promise from server
   */
  verify (serverInfo?: ServerInfo): Promise<any>;
}

/**
 *  server is a API that has useful tools to interact with the backend server
 *  @description communicates with the backend server
 *  @returns {object} the server object
 */
const server: Auth_Methods = {

  // API User Home Interactions //

  login: async function login(type, data, serverInfo?) {
    if (!type) type = "standard";
    if (serverInfo?.link) Slink = serverInfo.link;
    if (serverInfo?.path) Spath = serverInfo.path;
    else Spath = "/auth/login";
    if (!Linkregex.test(Slink + Spath)) {
      throw new Error("Invalid link");
    }
    const promise = new Promise((resolve, reject) => {
      switch (type) {
        case 'standard': {
          axios.post(Slink + Spath, data.credentials, { withCredentials: true })
            .then((response: any) => {
              if (response.data[1]) {
                const menubg = document.querySelector(".burger");
                const openmenu = document.querySelector(".sidenav");
                const topnavcolor = document.querySelector(".topnav");
                const login = document.querySelector(".login_modal");
                if (!menubg || !openmenu || !topnavcolor || !login) return;
                menubg.classList.remove("open");
                openmenu.classList.remove("open");
                topnavcolor.classList.remove("open");
                login.classList.remove("open");
                localStorage.setItem("prfs", response.data[1]);
                window.location.assign(window.location.href);
                resolve(response);
              } else {
                alert(response.data.messageAuth);
              }
            })
            .catch((error: any) => {
              console.log(error);
              reject(error);
            })
          break;
        }
        case "google": {
          axios.post(Slink + Spath, { user: data.credentials }, { withCredentials: true })
            .then((result: any) => {
              //get prefrences
              if (result.data[1]) {
                localStorage.setItem("prfs", result.data[1]);
                window.location.assign("/");
              } else {
                alert(result.data.messageAuth);
              }
              //Otherwise register
            });
        }
        break;
      }
    })
    return await promise;
  },
  
  register: async function register(user, serverInfo?): Promise<any> {
    if (serverInfo?.link) Slink = serverInfo.link;
    if (serverInfo?.path) Spath = serverInfo.path;
    else Spath = "/reg";
    if (!Linkregex.test(Slink + Spath)) {
      throw new Error("Invalid link");
    }

    let data = {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      username: user.username,
      password: user.password,
    };

    const promise = new Promise((resolve, reject) => {
      axios.post(Slink + Spath, data, { withCredentials: true })
        .then((response: any) => {
          if (response.data.username_error || response.data.email_error) {
            alert(response.data?.email_error || response.data?.username_error);
          } else {
            this.login( 'standard', {credentials: {username: user.username, password: user.password}});
          }
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    return await promise;
  },

  logout: async function logout(serverInfo?): Promise<any> {
    if (serverInfo?.link) Slink = serverInfo.link;
    if (serverInfo?.path) Spath = serverInfo.path;
    else Spath = "/auth/logout";
    if (!Linkregex.test(Slink + Spath)) {
      throw new Error("Invalid link");
    }

    const promise = new Promise((resolve, reject) => {
      axios.get(Slink + Spath, { withCredentials: true })
        .then((response: any) => {
          window.location.reload();
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    return promise;
  },

  verify: async function verify(serverInfo?): Promise<any> {
    if (serverInfo?.link) Slink = serverInfo.link;
    if (serverInfo?.path) Spath = serverInfo.path;
    else Spath = "/verify";
    if (!Linkregex.test(Slink + Spath)) {
      throw new Error("Invalid link");
    }

    const promise = new Promise((resolve, reject) => {
      axios.get(Slink + Spath, { withCredentials: true })
        .then((response: any) => {
          resolve(response);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
    return await promise;
  },

};

export default server;
