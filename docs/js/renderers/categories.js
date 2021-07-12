" use strict ";

import { parseHTML } from "/js/utils/parseHTML.js";


const categoriesRenderer = {
    categoriesGallery: function (categories) {
        let html=
        `<div id="sidebar-categories">
            <div class="rounded">
                <ul id="categoriesList">

                </ul>
            
            </div>
        </div>`

        let sideCategories = parseHTML(html);
        loadCategories(sideCategories, categories);
        return sideCategories;
    },
    categoryCard: function(category){
        let html=
        `<a href="categories.html?category=${category.category}">
            <li>
                #${category.category}
            </li>
        </a>`
        let card = parseHTML(html);

        return card;
    }

}

function loadCategories(sideCategories, categories){
    let lista = sideCategories.querySelector("#categoriesList");
    let i=0;
    for (let category of categories) {
        let categoryCard = categoriesRenderer.categoryCard(category);
        lista.appendChild(categoryCard);

        if(i==19){
            break;
        }
        i++;
    }
}



export { categoriesRenderer };