declare global {
  namespace NodeJS {
    interface ProcessEnv {
      
      REACT_APP_google_testing_clientid: string;
      REACT_APP_apiKey: string;
      REACT_APP_authDomain: string;
      REACT_APP_databaseURL: string;
      REACT_APP_projectId: string;
      REACT_APP_storageBucket: string;
      REACT_APP_messagingSenderId: string;
      REACT_APP_appId: string;
      REACT_APP_measurementId: string;

      REACT_APP_Server: string;
      REACT_APP_Bucket: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}