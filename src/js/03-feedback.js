import throttle from 'lodash.throttle';
const ref = {
  parent: document.querySelector('.feedback-form'),
  email: document.querySelector('label>input'),
  message: document.querySelector('label> textarea'),
};

getToLocalSTorage();
ref.parent.addEventListener('input', throttle(saveFormData), 500);

function saveFormData(event) {
  const formData = objDataCreate(ref.email.value, ref.message.value);
  addToLocalStorage(formData);
}

function objDataCreate(email, text) {
  return {
    email,
    text,
  };
}

function addToLocalStorage(obj, key = 'feedback - form - state') {
  localStorage.setItem(key, JSON.stringify(obj));
}

function getToLocalSTorage(key = 'feedback - form - state') {
  const stringData = localStorage.getItem(key);
  if (stringData) {
    const data = JSON.parse(stringData);
    ref.email.value = data.email;
    ref.message.value = data.text;
  }
  return;
}

ref.parent.addEventListener('submit', onSubmitInit);

function onSubmitInit(event) {
  event.preventDefault();

  const stringData = localStorage.getItem('feedback - form - state');
  if (stringData) {
    console.log(JSON.parse(stringData));
    ref.parent.reset();
    localStorage.removeItem('feedback - form - state');
  }
}
