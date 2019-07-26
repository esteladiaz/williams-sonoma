// fetch data from endpoint
const url = 'https://raw.githubusercontent.com/esteladiaz/jsontest/master/test.json'

// function to create DOM elements
const createNode = element => document.createElement(element)

// function to append children to DOM elements
const append = (parent, el) => parent.appendChild(el)

fetch(url)
    .then((response) => {
        if (response.ok && response.headers.get('content-type') === 'text/plain; charset=utf-8') {
            return response.json()
        }
        throw new Error("Network response was not ok. Please try again.")
    })
    .then(data => {
        let { groups } = data;
        return groups.map(group => {
            createProductList(group)
        })
    })
    .catch(error => console.error(`Error! ${error}`))


const createProductList = group => {
    // Destructure keys from Object
    const {
        id,
        thumbnail,
        name,
        links,
        priceRange,
    } = group
    console.log(id, thumbnail, name, links, priceRange)

    // Create container
    const container = document.getElementById('product-container')
    let div = createNode('div')
    div.classList.add('product')

    // Create image
    let img = createNode('img')
    img.src = thumbnail.href
    append(div, img)

    // Create h3 with product name
    let h3 = createNode('h3')
    h3.innerHTML = name

    append(div, h3)
    append(container, div)
}