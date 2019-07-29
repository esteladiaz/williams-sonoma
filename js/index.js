// fetch data from endpoint
const url = 'https://raw.githubusercontent.com/esteladiaz/jsontest/master/test.json'

// function to create DOM elements
const createNode = element => document.createElement(element)

// function to append children to DOM elements
const append = (parent, child) => parent.appendChild(child)

// function to remove children to DOM elements
const remove = (parent, child) => parent.removeChild(child)

// fetching data from sample endpoint
fetch(url)
    .then((response) => {
        /* If the response is ok (or could have used status === 200) 
           and is of content-type text, as is expected from the sample endpoint,
           then return the response as a JSON. If it's not the right content-type, show error.
        */
        if (response.ok && response.headers.get('content-type') === 'text/plain; charset=utf-8') {
            return response.json()
        }
        throw new Error("Doesn't look like we got the right network response. Please try again!")
    })
    // If the promise resolves, render the page body.
    .then(data => {
        let { groups } = data;
        return groups.map(group => {
            renderBody(group)
        })
    })
    // If there's an error, log it to the console.
    .catch(error => showErrorContent(error))

// If there's an error fetching the data, show this error message content:
const showErrorContent = error => {
    // create container for error message
    let container = document.getElementById('page-container')
    let errorContainer = createNode('div')
    errorContainer.classList.add('error')
    append(container, errorContainer)

    // add error message text
    let errorText = createNode('h2')
    errorText.innerHTML = '<span role="img" aria-label="error-face">😬</span><br/>Oops! Looks like something went wrong.'
    errorText.classList.add('animated', 'fadeInUp', 'delay-2s')
    append(errorContainer, errorText)

    // log the error to the console if you want ¯\_(ツ)_/¯
    console.error(error)
}