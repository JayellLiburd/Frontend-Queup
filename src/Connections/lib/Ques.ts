import axios from "axios";

type Connection = {
  // API Query Interactions //

  Que(line_id: string): Promise<any>;
};

const Slink = process.env.REACT_APP_Server || "http://localhost:4000";
const management: Connection = {
  // API Query Interactions //
  Que(line_id) {
    let Spath = "/management";
    return new Promise((resolve, reject) => {
      axios.post(`${Slink}${Spath}/staff`, { line_id }, { withCredentials: true })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};

export default management;