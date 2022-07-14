const elList = document.querySelector('.js-list');
const elForm = document.querySelector('.js-form');
const elInput = document.querySelector('.js-input');
const elModal = document.querySelector('.modal');
const elOverlay = document.querySelector('.overlay');

const modalgaChiqarator = (el, node) => {
	elModal.innerHTML = '';
	const elImg = document.createElement('img');
	const elDiv = document.createElement('div');
	const elButton = document.createElement('button');
	const elTitle = document.createElement('h3');
	const elType = document.createElement('p');
	const elYear = document.createElement('p');

	elTitle.textContent = el.Title;
	elDiv.setAttribute('width', '500');
	elDiv.classList.add('box2');
	elButton.textContent = 'X';
	elButton.setAttribute('class', 'close-btn');
	elImg.src = el.Poster;
  elImg.setAttribute("class", "modal-img");
	elType.textContent = el.Type;
	elYear.textContent = el.Year;

	node.appendChild(elButton);
	elDiv.appendChild(elTitle);
	elDiv.appendChild(elType);
	elDiv.appendChild(elYear);
	node.appendChild(elDiv);
	node.appendChild(elImg);
};

const renderFilms = (array, node) => {
	elList.innerHTML = '';
	array.forEach((film) => {
		let elItem = document.createElement('li');
		let elSubheader = document.createElement('h3');
		let elImg = document.createElement('img');
		let elBox = document.createElement('div');
		let elBookMarkButton = document.createElement('button');
		let elModalButton = document.createElement('button');

		elItem.classList.add('item');
		elBox.classList.add('box');
		elSubheader.setAttribute('class', 'subheader');
		elBookMarkButton.classList.add('bookmark');
		elBookMarkButton.dataset.filmId = film.imdbID;
		elModalButton.classList.add('modal-btn');
		elModalButton.dataset.filmId = film.imdbID;

		elImg.src = film.Poster;
		elSubheader.textContent = film.Title;
		elModalButton.textContent = 'More...';
		elBookMarkButton.textContent = 'Add to bookmark list';

		elItem.appendChild(elImg);
		elBox.appendChild(elSubheader);
		elBox.appendChild(elBookMarkButton);
		elBox.appendChild(elModalButton);
		elItem.appendChild(elBox);
		node.appendChild(elItem);
	});
};

elForm.addEventListener('submit', (evt) => {
	evt.preventDefault();
	(async () => {
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=6e537db6&s=${elInput.value}`,
		);
		console.log(response);
		const data = await response.json();
		const newArray = data.Search;
		renderFilms(newArray, elList);
    console.log(newArray);
		elInput.value = '';
		elList.addEventListener('click', function (evt) {
			if (evt.target.matches('.modal-btn')) {
				elOverlay.classList.add('open');
				const findedFilm = evt.target.dataset.filmId;
				const findedModalFilm = newArray.find((e) => e.imdbID == findedFilm);
        // console.log(findedFilm);
        // findedFilm => undefined 
				modalgaChiqarator(findedModalFilm, elModal);
			}
		});
	})();
});

elModal.addEventListener('click', function (evt) {
	if (evt.target.matches('.close-btn')) {
		elOverlay.classList.remove('open');
	}
});

elOverlay.addEventListener('click', function () {
	elOverlay.classList.remove('open');
});
