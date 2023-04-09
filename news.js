const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#searchBtn');
const searchResults = document.createElement('section');
document.body.appendChild(searchResults);

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent the default behavior of form submission
    const query = document.querySelector('#search-input').value;
    const apiKey = 'pub_202668307aded72323ad04d186950cf68ece4';
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data)
        searchResults.innerHTML = '';
        data.results.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.innerHTML = `<h3>${article.title}</h3><p>${article.summary}</p><a href="${article.link}" target="_blank">Read more</a>`;
            searchResults.appendChild(articleDiv);
        });

    } catch (error) {
        console.log(error);
    }
});
