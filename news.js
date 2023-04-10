const searchForm = document.querySelector('.search-form');
const searchBtn = document.querySelector('#searchBtn');
const searchResults = document.createElement('section');
searchResults.classList.add('search-results');
document.body.appendChild(searchResults);

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const query = document.querySelector('#search-input').value;
    const apiKey = 'pub_202668307aded72323ad04d186950cf68ece4';
    const apiUrl = `https://newsdata.io/api/1/news?apikey=${apiKey}&q=${query}&country=us`; //displays news data from the US only.

    const nullImageSource = "https://picsum.photos/300/200"

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        searchResults.innerHTML = '';
        data.results.forEach(article => {
            const articleDiv = document.createElement('div');
            articleDiv.classList.add('card'); // add card styling
            let imageSrc = article.image_url;
            if (imageSrc === null) {
                imageSrc = nullImageSource;
            }
            articleDiv.innerHTML = `
                <h2>${article.title}</h2>
              </div>
              <img src="${imageSrc}" alt="${article.title}">
                <p class="card-text">${article.description ? article.description : "Description not found"}</p>
                <a href="${article.link}" class="card-link" target="_blank">Read more</a>
              </div>
            `;
            searchResults.appendChild(articleDiv);
        });

        // hide top stories section
        const topStoriesSection = document.querySelector('.top-stories');
        topStoriesSection.style.display = 'none';

        // insert search results above top stories
        topStoriesSection.insertAdjacentElement('beforebegin', searchResults);

    } catch (error) {
        console.log(error);
    }
});
