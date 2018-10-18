class Socket {
  constructor(url) {
    this.url = url;
  }

  request(method, url = undefined, data = {}) {
    url = url || this.url;
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open(method, url)
      xhr.onload = () => {
        if(xhr.status >= 200 && xhr.status < 300) {
          resolve(JSON.parse(xhr.response));
        } else {
          reject(new Error(xhr.response));
        }
      };
      xhr.onerror = () => {
        reject(new Error("Failed to " + method + " to " + url + "."));
      };
      if(method === "POST") xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.send(data);
    })
  }

  async get(url = undefined) {
    return this.request('GET', url);
  }

  async post(data, url = undefined) {
    return this.request('POST', url, data);
  }
}

export default Socket;