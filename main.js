const formEl = document.querySelector('#search-everything')

const generateQueryUrl = (queryTerm) => {
    return `https://newsapi.org/v2/everything?q=${queryTerm}&apiKey=17ace2f03d2046e686fc56e893bafec8`
}

const renderArticles = (articles) => {
    const newsContainerEl = document.querySelector('.news-container')
        // this to empty new container
    newsContainerEl.innerHTML = ''
    articles.forEach(article => {
        newsContainerEl.append(renderArticle(article))
    });
}

const renderArticle = (article) => {
    const articleContainerDiv = document.createElement('div')
    const titleEl = document.createElement('h2')
    titleEl.innerText = `Title: ${article?.title}`
    const authorEl = document.createElement('h3')
    authorEl.innerText = `Author: ${article?.author}`
    const sourceEl = document.createElement('h4')
    sourceEl.innerText = `Source : ${article?.source?.name}`
    const publisedDatetime = document.createElement('h4')
    publisedDatetime.innerText = `Published Datetime : ${article?.publishedAt}`

    articleContainerDiv.append(titleEl)
    articleContainerDiv.append(authorEl)
    articleContainerDiv.append(sourceEl)
    articleContainerDiv.append(publisedDatetime)
        // const articleImg = document.createElement('img')
        // const description = document.createElement('p')
        // const readMoreLink = document.createElement('a')
    return articleContainerDiv

}

// e === event
const formSubmitted = async(e) => {
    e.preventDefault()
    const inputEl = document.querySelector('#search-term')
    const searchTerm = inputEl.value
    try {
        const fetchEverythingResponse = await fetch(generateQueryUrl(searchTerm))
        const fetchEverythingJSON = await fetchEverythingResponse.json()
        const articlesToRender = fetchEverythingJSON.articles
        renderArticles(articlesToRender)
    } catch (e) {
        console.log(e)
    }
}

formEl.addEventListener("submit", formSubmitted)