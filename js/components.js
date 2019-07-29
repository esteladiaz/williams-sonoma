let wishlist = []

const renderBody = group => {
    // Destructure keys we will use from Object
    const {
        id,
        thumbnail,
        name,
        links,
        priceRange,
    } = group

    // Create container, add product <a> element to DOM
    const container = document.getElementById('product-container')
    let product = createNode('a')
    product.classList.add('product')
    append(container, product)

    // Add open function to Product container's onclick attribute
    // Add close function to overlay container's onclick attribute
    // Add close on esc key
    let closeButton = document.getElementById('close')
    let wishlistLink = document.getElementById('wishlist')
    product.onclick = () => openModal(group)
    overlay.onclick = () => closeModal(group)
    closeButton.onclick = () => closeModal(group)
    wishlistLink.onclick = openWishlist
    document.onkeydown = e => e.key === "Escape" ? closeModal() : false

    // Append product hover effects
    product.onmouseover = mouseOnEffects
    product.onmouseout = mouseOffEffects

    // Check if it's a special product from the priceRange keys. If so, add a flag!
    isProductSpecial(product, priceRange)

    product.style = `background-image: url(${thumbnail.href});`

    // create container for product information
    let productInformation = createNode('div')
    productInformation.classList.add('product-information')
    append(product, productInformation)

    // Create h3 with product name, place in product information div
    let h3 = createNode('h3')
    h3.innerHTML = name
    append(productInformation, h3)

    // Get product prices
    getPriceRanges(productInformation, priceRange)
}

// To create the special flag on grid
const isProductSpecial = (product, prices) => {
    if (prices) {
        if (prices.type && prices.type === 'special') {
            let specialFlag = createNode('div')
            specialFlag.classList.add('special')
            specialFlag.innerHTML = 'Special!'
            append(product, specialFlag)
        }
    }
}

// To get price range text
const getPriceRanges = (productInformation, prices) => {
    let priceContainer = createNode('div')
    priceContainer.classList.add('price')
    append(productInformation, priceContainer)
    if (!prices) {
        priceContainer.id = 'no-price'
        priceContainer.innerHTML = 'No price available.'
    } else {
        const { regular, selling } = prices

        // check which kinds of ranges exist
        if (regular && !selling) {
            priceContainer.innerHTML = `$${regular.low} - $${regular.high}`
        } else if (!regular && selling) {
            priceContainer.innerHTML = `$${selling.low} - $${selling.high}`
        } else if (regular && selling) {
            let regularPrice = `$${regular.low} - $${regular.high}`
            let sellingPrice = `$${selling.low} - $${selling.high}`
            priceContainer.innerHTML = `<p id="regular">${regularPrice}</p><p id="selling">${sellingPrice}</p>`
        }
    }
}

// Function to add item to wishlist storage
const addItemToWishlistStorage = name => {
    wishlist.totalItems = 0
    wishlist.push(name)
    for (let i = 0; i < wishlist.length; i++) {
        if (wishlist.includes(wishlist[i])) {
            wishlist.totalItems++
        }
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist))
}

// Create function to open wishlist modal
const openWishlist = () => {
    document.getElementById('overlay').classList.add('is-open')
    let modal = document.getElementById('modal')
    modal.classList.add('is-open');

    let wishlistItemsList = createNode('ul')
    wishlistItemsList.id = 'wishlist-items'
    let wishlistHeader = createNode('h2')
    wishlistHeader.innerHTML = "Wishlist"
    append(wishlistItemsList, wishlistHeader)
    append(modal, wishlistItemsList)
    if (localStorage.wishlist) {
        const { wishlist } = localStorage
        let items = JSON.parse(wishlist)
        items.map(item => {
            let listItem = createNode('li')
            listItem.innerHTML = item
            listItem.classList.add('wishlist-item')
            append(wishlistItemsList, listItem)
            return listItem
        })

        let clearStorageButton = createNode('button')
        clearStorageButton.id = 'clear-storage'
        clearStorageButton.onclick = clearStorage
        clearStorageButton.innerHTML = "Clear list"
        append(wishlistItemsList, clearStorageButton)
    }
}

const removeItemFromWishlist = () => {
    let test = document.querySelector('.wishlistItem')
    console.log(test)
}

// Create function to clear local storage
const clearStorage = () => {
    localStorage.clear()
    closeModal()
}

// Create function to open "More information" modal
const openModal = group => {
    document.getElementById('overlay').classList.add('is-open');
    let modal = document.getElementById('modal')
    modal.classList.add('is-open');

    const productInfoContainer = createNode('div')

    const {
        name,
        priceRange,
        thumbnail
    } = group

    productInfoContainer.id = group.id
    productInfoContainer.classList.add('product-info-container')

    let productInfoDetails = createNode('div')
    productInfoDetails.classList.add('details')
    let productName = createNode('h3')
    productName.innerHTML = name

    append(productInfoDetails, productName)
    append(productInfoContainer, productInfoDetails)

    const imageContainer = createNode('div')
    imageContainer.classList.add('image-container')
    const productImage = createNode('img')
    productImage.src = thumbnail.href
    append(imageContainer, productImage)
    append(productInfoContainer, imageContainer)

    const productCTAContainer = createNode('div')
    productCTAContainer.classList.add('cta-container')
    const seeItemAnchor = createNode('a')
    seeItemAnchor.setAttribute('target', '_blank')
    seeItemAnchor.setAttribute('href', group.links.www)

    const seeItemButton = createNode('button')
    seeItemButton.innerHTML = "See More"
    append(seeItemAnchor, seeItemButton)
    append(productCTAContainer, seeItemAnchor)

    const addToWishlist = createNode('button')
    addToWishlist.innerHTML = "Add to Wishlist"
    addToWishlist.onclick = () => addItemToWishlistStorage(name)
    append(productCTAContainer, addToWishlist)
    append(productInfoContainer, productCTAContainer)
    append(modal, productInfoContainer)
}

// Create function to close "More information" modal
const closeModal = group => {
    document.getElementById('overlay').classList.remove('is-open');
    document.getElementById('modal').classList.remove('is-open');
    let currentProduct = document.querySelector('.product-info-container')
    let wishlistInModal = document.getElementById('wishlist-items')
    if (currentProduct) {
        document.getElementById('modal').removeChild(currentProduct)
    }
    if (wishlistInModal) {
        document.getElementById('modal').removeChild(wishlistInModal)
    }
}

const mouseOnEffects = () => {
    document.querySelector('.product').classList.add('mouseOn')
}

const mouseOffEffects = () => {
    document.querySelector('.product').classList.remove('mouseOn')
}