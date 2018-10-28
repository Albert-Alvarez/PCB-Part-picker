function validProductPage() {
    var page = document.getElementById('page');

    if (page === null) {
        return false;
    }

    if (page.classList.contains('productDisplay')) {
        return true;
    }

    return false;
}

function getProduct() {
    let productPage = document.getElementById('product');
    let child = productPage.querySelectorAll('*');
    let prop;
    let priceList = [];
    let product = {
        "distributor": 'Farnell',
        "sku": '',
        "manufacturerId": '',
        "description": '',
        "url": '',
        "stockAvailable": null, 
        "minimum": null,
        "multiple": null,
        "curreny": null,
        "price": []
    };

    product.url = location.href;

    for(let i = 0; i < child.length; i++) {
        prop = child[i].getAttribute('itemprop');
        switch (prop) {
            case 'name':
                product.description = child[i].textContent.trim();
                break;
            case 'mpn':
                product.manufacturerId = child[i].textContent.trim();
                break;
            case 'http://schema.org/sku':
                product.sku = child[i].textContent.trim();
                break;
            case 'priceCurrency':
                product.curreny = child[i].getAttribute('content');
                break;
        }

        switch(true) {
            case child[i].classList.contains('avalabilityContainer'):
                let availability = child[i].getElementsByTagName('link')[0];
                if (availability.getAttribute('itemprop') === 'availability') {
                    if (availability.getAttribute('href') === 'http://schema.org/InStock') {
                        product.stockAvailable = true;
                    } else if (availability.getAttribute('href') === 'http://schema.org/OutOfStock') {
                        product.stockAvailable = false;
                    }
                }
                break;
            case child[i].classList.contains('multqty'):
                product.multiple = child[i].getElementsByTagName('strong')[0].innerHTML.trim();
                product.minimum = child[i].getElementsByTagName('strong')[1].innerHTML.trim();
                break;
            case child[i].classList.contains('tableProductDetailPrice'):
                let priceTable = child[i].getElementsByTagName('tbody')[0].getElementsByTagName('tr');
                for(let n = 0; n < priceTable.length; n++) {
                    let qty = priceTable[n].getElementsByClassName('qty')[0].textContent.trim();
                        qty = qty.substring(0, qty.length - 2);
                        qty = parseFloat(qty.replace('.','').replace(',','.').replace(' ',''));
                    let price = priceTable[n].getElementsByClassName('threeColTd')[0].textContent.trim();
                        price = price.substring(0, price.length - 2);
                        price = parseFloat(price.replace('.','').replace(',','.').replace(' ',''));
                    priceList.push({
                                        "quantity": qty,
                                        "price": price
                                    });
                }
                product.price = priceList;
                break;
        } 
    }
    
    return product;
}

if (validProductPage()){
    console.log(getProduct());
}