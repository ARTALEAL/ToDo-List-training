//Список дел
const items = ['Что-то нужно сделать', 'Второе дело'];

const form = document.querySelector('.form');
const list = document.querySelector('.list');
const formInput = document.querySelector('.form__input');
const formButton = document.querySelector('.form__submit');
const itemTemplate = document.querySelector('.list-item-template').content;

form.addEventListener('submit', function (event) {
  event.preventDefault();
  if (formButton.value != 'Добавить') {
    handleEditConfirm();
  } else handleSubmit();
});
formInput.addEventListener('focus', () => (formInput.placeholder = ''));
formInput.addEventListener(
  'blur',
  () => (formInput.placeholder = 'Что-то нужно записать...')
);

formButton.addEventListener('click', handleSubmit);

function render() {
  items.forEach(renderItem);
}

//Подсказки на кнопках
let tooltipElem;

document.onmouseover = function (event) {
  let target = event.target;

  // если есть подсказка
  let tooltipHtml = target.dataset.tooltip;
  if (!tooltipHtml) return;

  //Cоздание подсказки

  tooltipElem = document.createElement('div');
  tooltipElem.className = 'tooltip';
  tooltipHtml === 'удалить' ? (tooltipElem.style.color = 'red') : '';
  tooltipElem.innerHTML = tooltipHtml;
  document.body.append(tooltipElem);

  // спозиционируем его сверху от аннотируемого элемента (top-center)
  let coords = target.getBoundingClientRect();

  let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2;
  if (left < 0) left = 0; // не заезжать за левый край окна

  let top = coords.top - tooltipElem.offsetHeight - 5;
  if (top < 0) {
    // если подсказка не помещается сверху, то отображать её снизу
    top = coords.top + target.offsetHeight + 5;
  }

  tooltipElem.style.left = left + 'px';
  tooltipElem.style.top = top + 'px';
};

document.onmouseout = function (e) {
  if (tooltipElem) {
    tooltipElem.remove();
    tooltipElem = null;
  }
};

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
  if (formInput.value != '') {
    renderItem(formInput.value);
    formInput.value = '';
  } else {
    alert('Давайте не будем тратить время в пустую');
  }
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
  tooltipElem.remove();
  resetEditMode();
}

//Редактируемый элемент
let editingItem = null;

function handleEdit(event) {
  editingItem = event.target.closest('.list-item');

  const currentHeadingText =
    editingItem.querySelector('.list-item__header').textContent;
  formInput.value = currentHeadingText;

  formButton.value = 'Изменить';
  formButton.removeEventListener('click', handleSubmit);
  formButton.addEventListener('click', handleEditConfirm);
  formInput.focus();
}

function handleEditConfirm() {
  editingItem.querySelector('.list-item__header').textContent = formInput.value;
  formInput.blur();
  resetEdit();
}

function resetEdit() {
  formInput.value = '';

  formButton.value = 'Добавить';

  formButton.removeEventListener('click', handleEditConfirm);
  formButton.addEventListener('click', handleSubmit);

  editingItem = null;
}

function handleDuplicate(event) {
  const currentListItem = event.target.closest('.list-item');
  const currentElementHeader =
    currentListItem.querySelector('.list-item__header');
  const text = currentElementHeader.textContent;
  renderItem(text);
}

render();
