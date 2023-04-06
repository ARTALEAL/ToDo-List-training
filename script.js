console.log('test script');
const list = document.querySelector('.list');
const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__submit');
const itemTemplate = document.querySelector('.list-item-template').content;

formInput.addEventListener('focus', () => (formInput.placeholder = ''));
formInput.addEventListener(
  'blur',
  () => (formInput.placeholder = 'Что-то нужно записать...')
);

formButton.addEventListener('click', handleSubmit);

//Отрисовка нового дела
function renderItem(text) {
  const newElement = itemTemplate.cloneNode(true);
  const header = newElement.querySelector('.list-item__header');
  header.textContent = text;

  setListenersForItem(newElement);
  list.appendChild(newElement);
}

//Сабмит
function handleSubmit() {
  renderItem(formInput.value);
}

function setListenersForItem(element) {
  const deleteButton = element.querySelector('.delete');
  deleteButton.addEventListener('click', handleDelete);

  const editButton = element.querySelector('.edit');
  editButton.addEventListener('click', handleEdit);

  const duplicateButton = element.querySelector('.duplicate');
  duplicateButton.addEventListener('click', handleDuplicate);
}

function handleDelete(event) {
  const currentListItem = event.target.closest('.list-item');
  currentListItem.remove();
  resetEditMode();
}

function handleEdit() {}

function handleDuplicate() {}
