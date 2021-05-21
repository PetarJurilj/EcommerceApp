var updateBtns = document.getElementsByClassName('update-cart')

for (let i = 0; i < updateBtns.length; i++) {
    updateBtns[i].addEventListener('click', function() {
        var productId = this.dataset.product
        var action = this.dataset.action
        console.log('product', productId)
        console.log('action', action)

        console.log('user', user)
        if (user === 'AnonymousUser') {
            addCookieItem(productId, action)
        } else {
            UpdateUserOrder(productId, action)
        }
    })
}

function addCookieItem(productId, action) {
    console.log('not log')

    if(action == 'add') {
        if(cart[productId] == undefined) {
            cart[productId] = {'quantity': 1}
        }else {
            cart[productId]['quantity'] += 1
        }
    }

    if(action == 'remove') {
        cart[productId]['quantity'] -= 1

        if(cart[productId]['quantity'] <= 0) {
            console.log('Removed item')
            delete cart[productId]
        }
    }

    console.log('Cart: ', cart)
    document.cookie ='cart=' + JSON.stringify(cart) + ";domain=;path=/"
    location.reload()
}

function UpdateUserOrder(productId, action) {
    console.log('logged')

    var url = '/update-item/'

    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken':csrftoken,
        },
        body: JSON.stringify({
            'productId': productId,
            'action': action
        })
    }).then((response) => {
        return response.json()
    }).then((data) => {
        console.log('data', data)
        location.reload()
    })
}