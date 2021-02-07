### Serverless Single Page Image Rotator Application

Upload an image file, give an angle (degree) and click apply!

Give it a try --> [Live](https://ardahan-kisbet.github.io/image-rotator/)

**Approach:**
Point Rotation with given angle around central origin

```
    (x, y) -->  (x', y'):
        x' = ((x-a)*cos(theta) - (y-b)*sin(theta)) + a
        y' = ((x-a)*sin(theta) + (y-b)*cos(theta)) + b
```

Used Stack:

```
- ReactJS (CRA)
- HTML
- CSS
- Javascript
```

---

### Setup (development mode)

```
$ git clone https://github.com/Ardahan-Kisbet/image-rotator DESTINATION_FOLDER
$ cd ../DESTINATION_FOLDER
$ npm install
$ npm start
```

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

---

### Setup (production mode)

```
$ git clone https://github.com/Ardahan-Kisbet/image-rotator DESTINATION_FOLDER
$ cd ../DESTINATION_FOLDER
$ npm install
$ npm run build
```

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
