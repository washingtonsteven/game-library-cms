import axios from "axios";

/**
 * fetchConfig = {
 *  method: String,
 *  url: String,
 *  data: Object
 *  headers: Object
 * }
 */

class FunctionCall {
  setNetlifyIdentity(netlifyIdentity) {
    this.netlifyIdentity = netlifyIdentity;
  }
  generateHeaders() {
    const headers = { "Content-Type": "application/json" };
    if (this.netlifyIdentity && this.netlifyIdentity.currentUser) {
      return this.netlifyIdentity
        .currentUser()
        .jwt()
        .then(token => {
          return { ...headers, Authorization: `Bearer ${token}` };
        });
    }
    return Promise.resolve(headers);
  }

  call({ fetchConfig }) {
    return this.generateHeaders().then(headers => {
      return axios({
        ...fetchConfig,
        headers: { ...headers, ...(fetchConfig.headers || {}) }
      });
    });
  }
}

export default new FunctionCall();
