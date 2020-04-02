// targeting
const clear = document.querySelector('.header__reset');
const date = document.querySelector('.header__date');
const list = document.querySelector('.content__list');
const input = document.querySelector('#add-to-do-input');
const addButton = document.querySelector('#add-to-do-button');

// variables
let itemsList = [];
let id = 0;

// short access to class name
const classCheck = 'content__list__item__check--true';
const classDone = 'content__list__item--done';

// get item from localstorage
let data = localStorage.getItem('TODO');
if (data) {
	itemsList = JSON.parse(data);
	id = itemsList.length;
	loadList(itemsList);
}

// clear localstorage
clear.addEventListener('click', () => {
	localStorage.clear();
	location.reload();
});

// loadList function
function loadList(arr) {
	arr.forEach(item => {
		addToDo(item.name, item.id, item.done, item.trash);
	});
}

// date
const options = {
	weekday: 'long',
	day: 'numeric',
	month: 'long'
};
const today = new Date();
date.innerHTML = today.toLocaleDateString('pl-PL', options);

// add-to-do function
function addToDo(toDo, id, done, trash) {
	if (trash) {
		return;
	}

	const CHECK = done ? classCheck : '';
	const DONE = done ? classDone : '';

	const newItem = `<li class="content__list__item ${DONE}" id="${id}">
						<button class="content__list__item__check ${CHECK}" job='complete'></button>
						<p>${toDo}</p>
						<button class="content__list__item__delete" job='delete'></button>
                    </li>`;
	list.insertAdjacentHTML('beforeend', newItem);
}
// add item by Enter
document.addEventListener('keyup', () => {
	if (event.keyCode == 13) {
		const toDo = input.value;
		if (toDo) {
			addToDo(toDo, id);
			itemsList.push({
				name: toDo,
				id: id,
				done: false,
				trash: false
			});
			input.value = '';
			id++;
			// add item to localstorage, this code must be added where the itemList array is updated
			localStorage.setItem('TODO', JSON.stringify(itemsList));
		}
	}
});
// add item by Button
addButton.addEventListener('click', () => {
	const toDo = input.value;
	if (toDo) {
		addToDo(toDo, id);
		itemsList.push({
			name: toDo,
			id: id,
			done: false,
			trash: false
		});
		input.value = '';
		id++;
		// add item to localstorage, this code must be added where the itemList array is updated
		localStorage.setItem('TODO', JSON.stringify(itemsList));
	}
});

// complete to-do function
function completeToDo(element) {
	element.classList.toggle(classCheck);
	element.parentNode.classList.toggle(classDone);

	itemsList[element.parentNode.id].done = itemsList[element.parentNode.id].done
		? false
		: true;
}

// remove to-do function
function removeToDo(element) {
	element.parentNode.parentNode.removeChild(element.parentNode);
	itemsList[element.parentNode.id].trash = true;
}

// target items created dynamically
list.addEventListener('click', e => {
	if (e.target.tagName.toLowerCase() === 'button') {
		const element = e.target;
		const elementJob = element.attributes.job.value;

		if (elementJob === 'complete') {
			completeToDo(element);
		} else if (elementJob === 'delete') {
			removeToDo(element);
		}
		// add item to localstorage, this code must be added where the itemList array is updated
		localStorage.setItem('TODO', JSON.stringify(itemsList));
	}
});
