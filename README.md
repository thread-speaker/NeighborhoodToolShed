# NeighborhoodToolShed

##Currently implemented features

1) Loads angular, angular-route, bootstrap (.css & .js), and jquery from CDN (we may want to install the packages to our app natively later)
#) Angular-route is configured for single page navigation intelligently through angular
#) Navbar is implemented in a basic sense. The navBar is already responsive between desktop and mobile. Try shrinking it to see the layout change.
#)

##Instructions for launch

You will need <a href="https://nodejs.org/en/">node.js</a>. The download there should bundle with it npm. If not, you will need to find and install <a href="https://www.npmjs.com/">npm</a> as well.

Once these are installed, open a gitbash. In gitbash:

```
cd <IntendedParentDirectory>
git clone "https://github.com/thread-speaker/NeighborhoodToolShed.git"
cd NeighborhoodToolShed/
npm install
node server.js
```

This will launch the local server, at which point you can navigate in any browser to localhost:3000 and test the most recently pushed build of Neighborhood Tool Shed
