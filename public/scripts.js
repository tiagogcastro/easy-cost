const Mask = {
    apply(input, func) {
        setTimeout(function() {
            //  pegar o value do input e rodar a function passando o value para a function
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {    
        value = value.replace(/\D/g, "")
    
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value / 100)
    }
}

const currentPage = location.pathname
const menuItems = document.querySelectorAll('header .links a')

for (item of menuItems) {
    if (currentPage.includes(item.getAttribute('href'))) {
        item.classList.add('active')
    }
}

// Paginate
function paginate(selectedPage, totalPages) {

    let pages = [],
    oldPage

    for(let currentPage = 1; currentPage <= totalPages; currentPage++) {

        const firstAndLastPage = currentPage == 1 || currentPage == totalPages
        const pagesAfterSelectedPage = currentPage <= selectedPage + 2
        const pagesBeforeSelectedPage = currentPage >= selectedPage - 2

        if(firstAndLastPage || pagesBeforeSelectedPage && pagesAfterSelectedPage) {

            if(oldPage && currentPage - oldPage > 2) {
                pages.push('...')
            }

            if(oldPage && currentPage - oldPage == 2) {
                pages.push(oldPage + 1)
            }

            pages.push(currentPage)

            // page q o user esta
            oldPage = currentPage
        }
    }
    return pages
}

const pagination = document.querySelector('.pagination')

function createPagination(pagination) {
    const filter = pagination.dataset.filter
    const page = +pagination.dataset.page
    const total = +pagination.dataset.total
    const pages = paginate(page, total)
    
    let elements = ''

    for(let page of pages) {
        if(String(page).includes('...')) {
            elements += `<span>${page}</span>`
        } else {
            if (filter) {
                elements += `<a href="?page=${page}&filter=${filter}">${page}</a>`
            } else {
                elements += `<a href="?page=${page}">${page}</a>`
            }
        }
    }
    pagination.innerHTML = elements 
}

if (pagination) {
    createPagination(pagination)
}

const confirmDelete = location.pathname.includes('edit')
if (confirmDelete) {
    deleteOrNo()    
}

function deleteOrNo(req, res) {
    const formDelete = document.querySelector('.form-delete')
    formDelete.addEventListener('submit', function(event) {
        const confirmation = confirm('Deseja Deletar?')
        if(!confirmation) {
            event.preventDefault()
        } else {
            return res.redirect(currentPage)
        }
    })
}

deleteOrNo()
