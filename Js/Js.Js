let NameError = document.getElementById("NameError");
let EmailError = document.getElementById("EmailError");
let PassError = document.getElementById("PassError");

function UserNameValidation(){
    var regex = /^[a-zA-Z]{2,}|\s[a-zA-Z]{2,}$/

    if(regex.test(enteredSignUpName.value)){
        NameError.classList.replace("d-block", "d-none")
        return true;
    } else{
        NameError.classList.replace("d-none", "d-block")
        return false;
    }
}

function UserEmailValidation(){
    var regex = /^[a-zA-Z]{2,}[0-9]{0,}(@)((gmail\.com)|(hotmail\.com))$/

    if(regex.test(enteredSignUpEmail.value)){
        EmailError.classList.replace("d-block", "d-none")
        return true;
    } else{
        EmailError.classList.replace("d-none", "d-block")
        return false;
    }
}

function UserpassValidation(){
    var regex = /^[a-zA-Z]{8,}[0-9]{0,}((@){0,}(%){0,})$/

    if(regex.test(enteredSignUpPass.value)){
        PassError.classList.replace("d-block", "d-none")
        return true;
    } else{
        PassError.classList.replace("d-none", "d-block")
        return false;
    }
}





var enteredSignUpName = document.getElementById("SignUpNameInput");
var enteredSignUpEmail = document.getElementById("SignUpEmailInput");
var enteredSignUpPass = document.getElementById("SignUpPassInput");

var enteredSignInEmail = document.getElementById("SignInEmailInput");
var enteredSignInPass = document.getElementById("SignInPassInput");

var SignUpP = document.getElementById("SignUpP");
var SignInP = document.getElementById("InCorrect");

var HomeUserName = document.getElementById("HomeUserName");

var userName = localStorage.getItem("UserName")

// let x = location.pathname

// console.log(x)
// /Pages/home.html
if(location.pathname === "/Pages/home.html" && userName == null){
    location.href="/index.html"
}

if(userName){
    HomeUserName.innerHTML= "Welcome " + userName
    console.log("Welcom " + userName);
}

var UserArray;
if(localStorage.getItem("UserData") == null){
    UserArray = []
} else{
    UserArray = JSON.parse(localStorage.getItem("UserData"))
}

function InputEmptyChecker(){
    if(enteredSignUpName.value == "" || enteredSignUpEmail.value == "" || enteredSignUpPass.value == ""){
        return false
    } else {
        return true
    }
}

function SignUp(){
    if(InputEmptyChecker() == false){
        SignUpP.innerHTML='<span class="text-danger m-3">All Input Fields Are Required</span>'
        return false
    }
    if(UserEmailValidation() && UserNameValidation() && UserpassValidation()){
        var UserData = {
            name : enteredSignUpName.value,
            email : enteredSignUpEmail.value,
            pass : enteredSignUpPass.value,
        }
            UserArray.push(UserData)
            localStorage.setItem("UserData",JSON.stringify(UserArray))
            SignUpP.innerHTML='<span class="text-success m-3">Success</span>'
            InputFieldEmpty()
            location.href="/index.html"
            return true
    }
        if(EmailExistChecker() == false){
            SignUpP.innerHTML='<span class="text-danger m-3">Email Already Exist</span>'
        } else{
            UserArray.push(UserData)
            localStorage.setItem("UserData",JSON.stringify(UserArray))
            SignUpP.innerHTML='<span class="text-success m-3">Success</span>'
            InputFieldEmpty()
        }
}

function EmailExistChecker(){
    for(var i =0;i<UserArray.length; i++){
        if(UserArray[i].email.toLowerCase() == enteredSignUpEmail.value.toLowerCase()){
            return false
        }
    }
}

function InputFieldEmpty(){
    enteredSignUpName.value=""
    enteredSignUpEmail.value=""
    enteredSignUpPass.value=""
}

function LoginEmpty(){
    if(enteredSignInEmail.value == "" || enteredSignInPass.value == ""){
        return false
    } else{
        return true
    }
}

function Login(){
    if(LoginEmpty() == false){
        SignInP.innerHTML='<span class="text-danger m-3">All Input Fields Are Required</span>'
    }
    
    var LoginEmail = enteredSignInEmail.value;
    var LoginPass = enteredSignInPass.value;
    
    for(var i =0; i<UserArray.length; i++){
        if(UserArray[i].email.toLowerCase() == LoginEmail.toLowerCase() && UserArray[i].pass.toLowerCase() == LoginPass.toLowerCase()){
            localStorage.setItem("UserName", UserArray[i].name)
            location.href = "/Pages/home.html"
        } else{
            SignInP.innerHTML='<span class="text-danger m-3">InCorrect Email or Password</span>'
        }
    }
}

function LogOut(){
    localStorage.removeItem("UserName");
}