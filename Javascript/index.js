const list = document.getElementById("list");
const addButton = document.getElementById("addButton")
const inputValue = document.getElementById("name-input");
const searchInput = document.getElementById("search-input");
const deleteStorage = document.getElementById("deleteStorage");


let listArray = [];
let itemId = 0;


let storageData = localStorage.getItem("listArray")
if (storageData) {
    listArray = JSON.parse(storageData);
    loadListItems(listArray);
    itemId = listArray.length;
} else {
    listArray = [];
    itemId = 0;
}

function loadListItems(array) {
    array.forEach(element => {
        addItem(element);
    });
};


deleteStorage.addEventListener("click", function (event) {
    // listArray = [];
    // itemId=0;
    localStorage.clear();
    location.reload();
    loadListItems(listArray)
})


inputValue.addEventListener("keyup", function (event) {
    if (event.keyCode == 13) {
        var inputValue = document.getElementById("name-input").value;
        if (inputValue === '') {
            alert("You must write something!");
        } else {
            var listObject = {id: itemId, inputValue: inputValue, complete: false, visible: true};
            listArray.push(listObject);
            addItem(listObject)
            localStorage.setItem("listArray", JSON.stringify(listArray))
            itemId++
        }
    }
})

addButton.addEventListener("click", function (event) {
    var inputValue = document.getElementById("name-input").value;
    if (inputValue === '') {
        alert("You must write something!");
    } else {
        var listObject = {id: itemId, inputValue: inputValue, complete: false, visible: true};
        listArray.push(listObject);
        addItem(listObject)
        localStorage.setItem("listArray", JSON.stringify(listArray))
        itemId++
    }
})

searchInput.addEventListener("keyup", function (event) {
        search()
    }
)

function search() {
    var searchInput = document.getElementById("search-input");
    var filter = searchInput.value.toUpperCase();
    var list = document.getElementsByTagName('li');
    for (var i = 0; i < list.length; i++) {
        var name = list[i].innerHTML;
        if ((name.toUpperCase().indexOf(filter) != -1) && listArray[parseInt(list[i].id)].visible)
            list[i].style.display = 'list-item';
        else
            list[i].style.display = 'none';
    }
}

function addItem(item) {
    var li = document.createElement("li");
    li.id = item.id;
    var div = document.createElement("div")
    div.className = "listDiv"

    var textContainer = document.createElement("p")
    textContainer.className = "inputContainer"
    var t = document.createTextNode(item.inputValue);

    textContainer.appendChild(t)
    div.appendChild(textContainer)
    li.appendChild(div);

    list.appendChild(li);
    if (item.complete == true) {
        div.className = "listDivComplete";

    } else {
        li.className = "listItem";
    }

    document.getElementById("name-input").value = "";
    // var complete = document.createElement("button")

    var complete = document.createElement("button")
    complete.className = "complete"
    complete.innerText = "I'm done"
    // var done = document.createElement("i")
    // done.className = "material-icons";
    // done.id = "doneButton";
    // done.innerText = "done";
    // complete.appendChild(done)
    div.appendChild(complete)

    var removeButton = document.createElement("BUTTON")
    removeButton.className = "removeButton"
    var i = document.createElement("i")
    i.className = "material-icons";
    i.id = "removeSign";
    i.innerText = "remove";
    removeButton.appendChild(i)
    div.appendChild(removeButton)

    if (!item.visible) {
        li.style.display = "none";
    }
    complete.onclick = function () {
        div.className = "listDivComplete";
        listArray[parseInt(li.id)].complete = true;
        localStorage.setItem("listArray", JSON.stringify(listArray))

    }

    removeButton.onclick = function () {
        li.style.display = "none";
        listArray[item.id].visible = false;
        localStorage.setItem("listArray", JSON.stringify(listArray))

    }
}



