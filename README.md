# Author
<!-- Tables -->
|Name|Email|
|----|-----|
|Rolandas Gedgaudas - T.|rolandas.gt@gmail.com|
# App description

This project is a Reactjs app bootstrapped with [Create React App](https://github.com/facebook/create-react-app) version 16.9.0, that means app has functional components.
App uses API provided by [date.nager.at](https://date.nager.at/)  for fetching the data. 

## App functionalities: 
* Displays a list of all available countries 
* Filters the available countries list based on an input field

## Folder Structure

    └── src
        ├── api
        │   ├── countriesData.js
        ├── components
        │   ├── Country.css
        │   ├── Country.js
        │   ├── FilterCountryForm.css
        │   └── FilterCountryForm.js
        ├── images
        │   ├── bg01a.jpg
        │   ├── bg02.jpg
        │   ├── grundfoslogo.png
        │   └── user-icon.pmg
        ├── App.css
        ├── App.js
        ├── index.css
        └── index.js

countriesData.js file exports a function useFetch which is used in the Country.js component to get available countries from the API as json array.

```javascript
function useFetch(url) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUrl = async () => {
            let response = await axios.get(url, {
                method: 'GET',
                mode: 'no-cors',
                headers: {
                    'Access-Contro-Alow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            }).catch(function (error) {
                console.log(error);
            });
            setData(response.data);
            setLoading(false);
        }
        fetchUrl();
    }, [url]);
    return [data, loading];
}

export {
    useFetch
};
```

Country.js component sorts the data alhabetically and if input has value filters data.
```javascript
useEffect(() => {
    setCountries(data.sort(sortByProperty('value')));
    if (props.filterValue && props.filterValue !== '') {
        filterData();
    } 
  }, [props, data, allCountriesUrl, suggestions]);

  var sortByProperty = function (property) {
    return function (x, y) {
        return ((x[property] === y[property]) ? 0 : ((x[property] > y[property]) ? 1 : -1));
      };
  };
```

FilterCountryForm.js is a componet which has an input form and sends value using props to the App.js where value as a prop is send to the Country.js component. Also reference is set to the input to focus when the page is loaded in the browser.

```javascript
const inputValue = props.countryFilter
const countryNameInput = useRef(null);
  useEffect(() => {
    countryNameInput.current.focus();
  }, []);


<input
    className='col-12'
    placeholder='Enter country name'
    type='text'
    ref={countryNameInput}
    onChange={(e) => {inputValue(e, e.target.value)}}
/>
```

In the App.js component
```javascript
const [filterValue, setFilterValue] = useState('');
const countryFilter = (e, value) =>{
    setFilterValue(value)
}
<FilterCountryForm countryFilter={countryFilter}/>
<Country filterValue={filterValue}/>
```

Input value is used to fiter data from json array.

```javascript
const filterData = ()=> {
    if(props.filterValue.length > 0){ //if input value is not empty
      const suggestedCountries = data.filter((country) => { //filters data and assigns to new array

      // sets array item to lowercase then uses include function to check for the match
        return country.value.toLowerCase().includes (props.filterValue.toLowerCase()); // input is also is set to lowercase to eiminate case sensitivity.
      }
      );
      setCountries(suggestedCountries); // using useState filtered array is set.
      //if there is no match 
      if (suggestedCountries.length === 0){
          // sets true to show message "no suggestions"
        setSuggestions(true);
      }else{
          // sets suggestions to false which makes empty message and available countries are shown
        setSuggestions(false);
      }
    }
  }
```

Data is rendered with render data function which maps countires state. 
It also checks the first letter of the country name and if letter has changed in the next letter in the aphabet it is assigned to the variabe which is shown in front of the country list relating to countries of the same letter.

```javascript
const renderData = countries.map((item, index) => {
    if(firstLetter !== item.value.charAt(0)){
      firstLetter = item.value.charAt(0);
      letter = firstLetter;
      hr = true;
    }else{
      letter = '';
      hr = false;
    }
    return (
      <div key={index} className="country-name" >
        {hr ? (
         <>
          <hr></hr>
          <h2 className='letter'>{letter}</h2>
          <p className="country">{item.value}, {item.key}</p>
         </>
        ) : (
          <p className="country">{item.value}, {item.key}</p>
        )}
      </div>
    )
  });
```

## Data fetching
[Axios](https://www.npmjs.com/package/axios) - Promise based HTTP client for the browser and node.js

## Responsive design

Responsive web layout with [bootstrap-4-grid](https://www.npmjs.com/package/bootstrap-4-grid)

### CSS
Pretty straightforward. Just get css/grid.min.css or css/grid.css and add it to your project.

### How to install bootstrap-4-grid using npm
npm install bootstrap-4-grid

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


