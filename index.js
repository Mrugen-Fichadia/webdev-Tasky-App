const taskContainer = document.querySelector(".task__container");

let globalStore = []; // some values []

const generateNewCard = (taskData) => `
<div class="col-md-6 col-lg-4">
<div class="card">
  <div class="card-header d-flex justify-content-end gap-2">
    <button type="button" class="btn btn-outline-success" id=${taskData.id} onclick="editCard.apply(this, arguments)">
      <i class="fas fa-pencil-alt" id=${taskData.id} onclick="editCard.apply(this, arguments)"></i>
    </button>
    <button type="button" class="btn btn-outline-danger" id=${taskData.id} onclick="deleteCard.apply(this, arguments)">
      <i class="fas fa-trash-alt" id=${taskData.id} onclick="deleteCard.apply(this, arguments)"></i>
    </button>
  </div>
  <img
    src=${taskData.imageUrl}
    class="card-img-top"
    alt="..."
  />
  <div class="card-body">
    <h5 class="card-title" id = "edit1">${taskData.taskTitle}</h5>
    <p class="card-text" id = "edit2">
      ${taskData.taskDescription}
    </p>
    <a href="#" class="btn btn-primary" id = "edit3">${taskData.taskType}</a>
  </div>
  <div class="card-footer">
    <button type="button" class="btn btn-outline-primary float-end" id = "footer_btn" onclick="saveEditedCard.apply(this, arguments)">
      Open Task
    </button>
  </div>
</div>
</div>
`;

const loadInitialCardData = () => {
  // localstorage to get tasky card data
  const getCardData = localStorage.getItem("tasky");

  // convert from string to normal object
  const {cards} = JSON.parse(getCardData);

  // loop over those array of task object to create HTML card, 
  cards.map((cardObject) => {

    // inject it to DOM
    taskContainer.insertAdjacentHTML("beforeend", generateNewCard(cardObject));

    // update our globalStore
    globalStore.push(cardObject);
  })
 
};

const saveChanges = () => {
  const taskData = {
    id: `${Date.now()}`, // unique number for id
    imageUrl: document.getElementById("imageurl").value,
    taskTitle: document.getElementById("tasktitle").value,
    taskType: document.getElementById("tasktype").value,
    taskDescription: document.getElementById("taskdescription").value,
  };

  taskContainer.insertAdjacentHTML("beforeend", generateNewCard(taskData));

  globalStore.push(taskData);

  localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); // an object


};

const deleteCard = (event) => {
  event = window.event;
  // id
  const targetID = event.target.id;
  const tagname = event.target.tagName; // BUTTON
  // match the id of the element with the id inside the globalStore
  // if match found remove

  globalStore = globalStore.filter((cardObject) => cardObject.id !== targetID); 
  localStorage.setItem("tasky", JSON.stringify({cards:globalStore})); // an object
  // contact parent

  if(tagname === "BUTTON"){
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode);
  }else{
    return taskContainer.removeChild(event.target.parentNode.parentNode.parentNode.parentNode);
  }

};

const editCard = (event) => {

  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;
  
  document.getElementById("edit1").contentEditable="true";
  document.getElementById("edit2").contentEditable="true";
  document.getElementById("edit3").contentEditable="true";
  let name = document.getElementById("footer_btn");
  name.innerHTML = "Save Changes";
};

const saveEditedCard = (event) => {
  
  event = window.event;
  const targetID = event.target.id;
  const tagname = event.target.tagName;

  document.getElementById("edit1").contentEditable="false";
  document.getElementById("edit2").contentEditable="false";
  document.getElementById("edit3").contentEditable="false";
  
  let targetObject = globalStore.filter((cardObject) => cardObject.id !== targetID);
  //console.log(targetObject[0].taskDescription);
  targetObject[0].taskDescription = document.getElementById("edit2").innerText;
  targetObject[0].taskTitle = document.getElementById("edit1").innerText;
  targetObject[0].taskType = document.getElementById("edit3").innerText;

  localStorage.setItem("tasky", JSON.stringify({cards:globalStore}));

  let name = document.getElementById("footer_btn");
  name.innerHTML = "Open Task";
}