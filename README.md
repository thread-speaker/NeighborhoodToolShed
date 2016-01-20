# NeighborhoodToolShed

##Important notes

If you add a new node package, you have to add it to the "dependencies" array in package.json. If you don't, your package won't install for other users on the repository.

Consequently, if something isn't working right for you, try an npm install. It's possible somebody add a node package that you don't have.

##Instructions for first-time launch

You will need <a href="https://nodejs.org/en/">node.js</a>. The download there should bundle with it npm. If not, you will need to find and install <a href="https://www.npmjs.com/">npm</a> as well.

Once these are installed, open a <a href="http://www.git-scm.com/downloads">gitbash</a>. In gitbash:

```
cd <IntendedParentDirectory>
git clone "https://github.com/thread-speaker/NeighborhoodToolShed.git"
cd NeighborhoodToolShed/
npm install
node server.js
```

This will launch the local server, at which point you can navigate in any browser to localhost:3000 and test the most recently pushed build of Neighborhood Tool Shed.

##Recently implemented features

Loads angular, angular-route, bootstrap (.css & .js), and jquery from CDN (we may want to install the packages to our app natively later)

Angular-route is configured for single page navigation intelligently through angular. Right now it only has 3 pages: Home, Page1, Page2. If you want to modify any of those pages, just modify the .html file for the corresponding page inside the /web/pages/ directory.

Navbar is implemented in a basic sense. The navBar is already responsive between desktop and mobile. Try shrinking it to see the layout change. NavBar is styled using the sandstone theme from <a href="http://bootswatch.com/">bootswatch</a>

There are dummy search and dropdown menu components commented out in the navbar for future use if we want them. They will need to be styled properly.

Folder structure should be easily maintainable through initial builds


