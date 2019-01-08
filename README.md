# webpack 4 base configuration

A tiny project, which includes a base webpack configuration.

* sass compiler
* ES6 / babel compiler
* EJS
* React

Created on Debian 9.5.0 amd64 via [VirtualBox 5.2.12](https://virtualbox.org/).

---

Note! Use **`--no-bin-links`** to install the node modules on a virtual machine (e.g. **`npm install --no-bin-links`**).


## Requirements

* [node.js 6.4.1+](https://nodejs.org/en/)

---

      npm run server:dev = incl. => (webpack-dev-server --mode=development)

      (bundle output folder / in dev mode watcher is still available)
      npm run output:dev = incl. => (webpack --mode=development)
      npm run output:prod = incl. => (webpack --mode=production)
