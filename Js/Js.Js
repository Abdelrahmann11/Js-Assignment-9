// window.history.pushState("", "", "/");

var BookName = document.getElementById("BookmarkerName");
var SiteURL = document.getElementById("BookmarkerURL");
var TableBody = document.getElementById("TableContent");
var NameError = document.getElementById("NameError");
var URLError = document.getElementById("URLError");

var BookList;
if(localStorage.getItem("BookList")){
    BookList = JSON.parse(localStorage.getItem("BookList"));
    DisplayBook(BookList);
} else{
    BookList = [];
}

function getBook(){
    // console.log("Clicked");
    // console.log(BookName.value);
    // console.log(SiteURL.value);

    if(BookNameValidation() && BookURLValidation()){
        var Book = {
            name : BookName.value,
            URL: SiteURL.value,
        }
    
        BookList.push(Book);
    } else {
        console.log("Validation Error");
    }
    // console.log(BookList);
    SaveToLocalStorage();

    DisplayBook(BookList);

    BookName.value = "";
    SiteURL.value = "";

}

function DisplayBook(BookList){
    // console.log(BookList);
    var Cartoona = "";
    for(var i =0;i<BookList.length ;i++){
        // console.log(BookList[i]);
        Cartoona +=`<tr>
        <td>${i}</td>
        <td>${BookList[i].name}</td>
        <td>
            <button class="btn btnVisit">
                <a href="//${BookList[i].URL}" style="text-decoration: none; color: white;">
                    <i class="fa-solid fa-eye pe-2" style="color: white;"></i>
                    Visit
                </a>
            </button>
        </td>
        <td>
            <button class="btn btnDelete pe-2" onclick="BookDelete(${i})">
                <i class="fa-solid fa-trash-can" style="color: #ffffff;"></i>
                Delete
            </button>
        </td>
    </tr>`
    }
    // console.log(Cartoona);
    TableBody.innerHTML = Cartoona;
}

function BookDelete(i){
    // console.log("del", i);
    BookList.splice(i, 1);
    SaveToLocalStorage();
    // console.log(BookList);
    DisplayBook(BookList);
}

function SaveToLocalStorage(){
    localStorage.setItem("BookList", JSON.stringify(BookList))
}

function BookNameValidation(){
    var regex = /^[a-zA-Z]{2,}$/

    if(regex.test(BookName.value)){
        NameError.classList.replace("d-block", "d-none")
        BookName.classList.add("is-valid");
        BookName.classList.remove("is-invalid");
        return true;
    } else{
        NameError.classList.replace("d-none", "d-block")
        BookName.classList.add("is-invalid");
        BookName.classList.remove("is-valid");
        return false;
    }
}

function BookURLValidation(){
    // var regex = /^www[A-Z]{1}|[a-z]{1}[a-z]{1,}\.[c]{1}[o]{1}[m]{1}$/;
    // var regex = /^www\.[a-zA-Z]{1}[a-z]{1,}\.com$/;
    // ^((https)|(http))|(www.)[a-zA-Z]{1,}(\.com)$
    // var regex = /^((https:\/\/)|(http:\/\/))(www\.)[a-zA-Z]{1,}(\.com)$/;
    var regex = /^((https:\/\/)|(http:\/\/))|(www\.)[a-zA-Z]{1,}(\.com)$/;

    if(regex.test(SiteURL.value)){
        URLError.classList.replace("d-block", "d-none")
        SiteURL.classList.add("is-valid");
        SiteURL.classList.remove("is-invalid");
        return true;
    } else{
        URLError.classList.replace("d-none", "d-block")
        SiteURL.classList.add("is-invalid");
        SiteURL.classList.remove("is-valid");
        return false;
    }

}
var regex = /^www\.[a-z]{1,}\.com$/;
console.log(regex.test("www.ddd.com"));