const API_KEY = "your api key";
const BUSINESS_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`;
const SPORTS_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${API_KEY}`;
const ENTERTAINMENT_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=entertainment&apiKey=${API_KEY}`;
const TECHNOLOGY_NEWS = `https://newsapi.org/v2/top-headlines?country=us&category=technology&pageSize=8&apiKey=${API_KEY}`;
const SEARCH_NEWS = `https://newsapi.org/v2/everything?q=`;

const ScrollLeft = (e) => {
  const scroller = e.parentElement.parentElement.children[2]
  scroller.scrollLeft = scroller.scrollLeft - 200
}
const ScrollRight = (e) => {
  const scroller = e.parentElement.parentElement.children[2]
  scroller.scrollLeft = scroller.scrollLeft + 200
}
const search__results = document.querySelector('.search__results')
const searchResults = document.querySelector('.news__content__search__results')
const search__results__title = document.querySelector('.search__results__title')
const search__form = document.querySelector('#search__form')


search__form.addEventListener('submit', async (e) => {
  e.preventDefault()
  search__results.classList.remove("d-none")
  search__results__title.innerText=`Search Results For -- ${e.target.searchnews.value}`
  searchResults.innerHTML = ""
  try{await fetch(`${SEARCH_NEWS}${e.target.searchnews.value}&apiKey=${API_KEY}`).then(res => res.json()).then(data => {
    displayer(data, searchResults)
  })}
  catch(err){
    searchResults.innerHTML=`<div class="mb-5 px-2 text-center d-flex w-100 justify-content-center align-items-center py-5 my-3"> Unable To Get search Results, Sorry There is a problem server </div>`
  }

})

const business = document.querySelector('.news__content__business')
const businessNews = async () => {
  try{await fetch(`${BUSINESS_NEWS}`).then(res => res.json())
  .then(data => {
    // alert(data)
    business.innerHTML = ""
    displayer(data, business)
  })}
  catch(err){
    business.innerHTML=`<div class="mb-5 px-2 text-center d-flex w-100 justify-content-center align-items-center py-5 my-3"> Unable To Get Business News, Sorry There is a problem server </div>`
  }
}
businessNews()

const sports = document.querySelector('.news__content__sports')
const sportNews = async () => {
    try{await fetch(`${SPORTS_NEWS}`).then(res => res.json())
    .then(data => {
      sports.innerHTML = ""
      displayer(data, sports)
    })}
    catch(err){
      sports.innerHTML=`<div class="mb-5 px-2 text-center d-flex w-100 justify-content-center align-items-center py-5 my-3"> Unable To Get Sport News, Sorry There is a problem server </div>`
    }
}
sportNews()
const technology = document.querySelector('.news__content__technology')
const technologyNews = async () => {
 
    try{ await fetch(`${TECHNOLOGY_NEWS}`).then(res => res.json())
    .then(data => {
      technology.innerHTML = ""
      displayer(data, technology)
    })}
    catch(err){
      technology.innerHTML=`<div class="mb-5 px-2 text-center d-flex w-100 justify-content-center align-items-center py-5 my-3"> Unable To Get Technology News, Sorry There is a problem server </div>`
    }
}
technologyNews()
const entertainment = document.querySelector('.news__content__entertainment')
const entertainmentNews = async () => {
  
    try{ await fetch(`${ENTERTAINMENT_NEWS}`).then(res => res.json())
    .then(data => {
      entertainment.innerHTML = ""
      displayer(data, entertainment)
    })}
    catch(err){
      entertainment.innerHTML=`<div class="mb-5 px-2 text-center d-flex w-100 justify-content-center align-items-center py-5 my-3"> Unable To Get Entertainment News, Sorry There is a problem server </div>`
    }
}
entertainmentNews()


const displayer = (data, category) => {
  return (data.articles.map((news) => {
    const { content, description, title, urlToImage, url, publishedAt } = news
    const date = new Date(news.publishedAt)
    const def = "https://rutecprojekt.de/assets/images/2/News_AdobeStock_116225048_neu-de28855b.jpg"
    var col = document.createElement('div');
    col.classList.add("col-lg-3")
    col.classList.add("col-12")
    col.classList.add("px-2")
    col.innerHTML = (`
        <div class="mb-5 px-2">
        <a href=${url} target='_blank' class="news__content__single__button">
        <div class="news__content__single__top">
          <div
            class="news__content__single__Image"
            style="
              background-image: url(${urlToImage ? urlToImage : def});
            "
          >
          <div class="news__content__single__content flex-column">
          <p class="description">${description}</p>
               <p>Read More</p>          
          
          </div>
         
          </div>
        </div>
        <div class="d-flex mt-2">
          <div class="news__content__single__date pe-2 d-flex flex-column align-items-center">
            <div class="month">${date.toLocaleString('default', { month: 'long' })}</div>
            <div class="date">${date.getDate()}</div>
            <div class="year">${date.getFullYear()}</div>
          </div>

          <div class="news__content__single__title fw-bold">
              <p>
                ${title}
              </p>
            </div>
         
        
      </div>
      </a>
      </div>`)
    category.appendChild(col)
  }))
}








