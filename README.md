# Face detection
A React.js project beautified with Ant Design. You should run with a flask back end: [face-detection-flask](https://github.com/Combo819/face-detection-flask)

## APIs
You should install and import `flask_cors` to avoid crossing-domain. You should also install and import `jsonify` so that all the information can be jsonfied before return.
### `/`,`/homepage`,`/registerpage`,`/mainpage`
+ methods: GET
+ return: render_template('index.html')

### `/home`
+ methods: GET, POST
+ return: 
    - GET: check if this username is in session. For yes: you should return jsonfied dictionary.
        ```python
        {
        'login': True,
        'name': session['username'], 
        'avaSrc': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        }
        ```
        for no: just return jsonfied a dictionary:`{'login': False}`
    - POST: you will receive a post requst like this
        ```python
        { 
        'username': username,
        'password': password, 
        }
        ```
        your should check if the username exists and the password is correct. for yes, you should add the user into session and return a json
        ```python
        { 
        'login': True,
        'name': session['username'], 
        'avaSrc': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
        }
        ```
        for no:
        ```python
        { 
        'login': False
        }
        ```
### `/logout`
+ methods: GET
+ return:  
    ```python
        {
        'login': True/False, # true for logging out seccessfully
        }
        ```

### `/loadImage`
+ methods: GET
+ description: for every image uploaded by user, you should do processing and generate an dictionary like 
    ```python
    {
        'thumbnail': (String)thunmbnail url,
        'afterUrl': (String)the processed image url,
        'beforeUrl': (String)the original image url,
        'uploadTime': (String)the uploaded time
    }
    ```
    Then push every dictionary into a list called `images` and return the `images`

+ return:  
    ```python
        {
        'iamges': (List)images
        }
        ```
        
### `/upload`
+ methods: POST
+ return:
     ```python
     {
     'error':(Boolean)False or True # return False if uploaded sucessfully
     'message':(String)'Image uploaded!', 'File not selected' or something like this
     }
     ```
 
 ### `/register`
 + methods: POST
 + return:
     ```python
     {
     'error':(Boolean)False or True # return True if register sucessfully
     'message':(String)'Sign Up sucessfully!', 'the username already exists' or something like this
     }
     ```
 ### `/main`
 + methods: GET
 + return: if username in session
    ```python
    { 
    'login': True,
    'name': session['username'], 
    'avaSrc': 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
    }
    ```
    if no:
    ```python
    {
    'login': False
    }
    ```
    Since `/main` has same behavior with `/home` in GET. I'm considering if I can replace `/main` with `/home`
## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
