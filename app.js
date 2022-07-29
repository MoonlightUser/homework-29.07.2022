// document.getElementsByClassName("products")[0].textContent = "" //cleaner
createElements(TECH)
let techNow = TECH

document.getElementById("rating")?.addEventListener("click", ()=>{ 
    if(user.login === false) alert("You arent log in");
    else{
    let newTech = techNow.sort((a, b)=>b.rating-a.rating)
    console.log(newTech);
    createElements(newTech)
    }
})

document.getElementById("chep-exp")?.addEventListener("click", ()=>{
    if(user.login === false) alert("You arent log in")
    else{
    let newTech = techNow.sort((a, b)=>a.price-b.price)
    console.log(newTech);
    createElements(newTech)
    }
})

document.getElementById("exp-chep")?.addEventListener("click", ()=>{
    if(user.login === false) alert("You arent log in")
    else{
    let newTech = techNow.sort((a, b)=>b.price-a.price)
    console.log(newTech);
    createElements(newTech)
    }
})

document.getElementById("all")?.addEventListener("click", ()=>{
    if(user.login === false) alert("You arent log in")
    else{
    techNow = TECH
    createElements(techNow)
    }
})

document.getElementById("mobiles")?.addEventListener("click", ()=>{
    if(user.login === false) alert("You arent log in")
    else{
    techNow = MOBILES
    console.log("object");
    createElements(techNow)
    }
})

document.getElementById("tvs")?.addEventListener("click", ()=>{
    if(user.login === false) alert("You arent log in")
    else{techNow = TV
    console.log("object");
    createElements(techNow)
    }
})

document.getElementById("main_page__reg")?.addEventListener("click", ()=>{
    fromTo("regin__page","main__page")
})


document.getElementById("main_page__log")?.addEventListener("click", ()=>{
    fromTo("login__page","main__page")
})

document.getElementById("login")?.addEventListener("click", ()=>{
    fromTo("main__page", "login__page")
})

document.getElementById("signin")?.addEventListener("click", ()=>{
    fromTo("main__page", "regin__page")
})

function loginCheck(form){
    if (user.login == true){
        alert("Sorry, you already log in")
    }
    else{
        let email = document.forms[form]["email"].value;
        let password = document.forms[form]["password"].value;
        USERS.forEach((member)=>{
            if (member.email === email){
                if (member.password === password){
                    user = member
                    alert("You loged in!")
                    fromTo("login__page", "main__page")
                    replaceAutorise(user)
                    return false
                }
                else{
                    alert("sorry, but password incorect")
                    return false
                }
            }
            else{
                alert("sorry, we cant find this user")
                return false
            }
        })
        if (user.login == true)return false
        else {alert("We havent users now(")
        return false}
    }
}

function validateForm(form) {
    let fname = document.forms[form]["fname"].value;
    let sname = document.forms[form]["sname"].value;
    let age = document.forms[form]["age"].value;
    let email = document.forms[form]["email"].value;
    let password = document.forms[form]["password"].value;
    let avatar = document.forms[form]["avatar"].value;
    
    console.log(fname.length );
    if (fname.length < 3) {
      alert("Name must be more than 2");
      return false;
    }
    if (sname.length < 3) {
        alert("Second name must be more than 2");
        return false;
    }
    if (age < 3 || age > 100) {
        alert("Please write your age normal");
        return false;
    }
    if (!email.includes("@")) {
        alert("Email is wrong");
        return false;
    }
    if (password.length < 8 || password.length > 18) {
        alert("password invalid langth");
        return false;
    }
    alert("you autorisated");
    user.login = true
    user.fname = fname
    user.sname = sname
    user.age = age
    user.email = email
    user.password = password
    user.avatar = avatar
    user.money = 1000
    USERS.push(user)
    console.log('%capp.js line:99 user', 'color: #007acc;', user);
    fromTo("regin__page", "main__page")
    replaceAutorise(user)
    return false;
  }

function fromTo(from, to){
    document.getElementsByClassName(from)[0].style.visibility = "hidden"
    document.getElementsByClassName(to)[0].style.visibility = "visible"
}

function checkImage(url) {
    let request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.send();
    request.onload = function() {
        let status = request.status;
        if (request.status == 200) //if(statusText == OK)
      { 
        console.log("image exists");
        return true
      } else {
        console.log("image doesn't exist");
        return false
      }
    }
  }

function replaceAutorise(user){
    let autoris = document.getElementsByClassName("autorisated")[0]
    let notAutoris = document.getElementsByClassName("not-autorisated")[0]
    if (!checkImage(user.avatar)){
        document.getElementsByClassName("user-avatar")[0].src = user.avatar
    }
    else{
        document.getElementsByClassName("user-avatar")[0].src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZlr0nV3MSR5rc0souSDovrbJ1NIj--YEqwQ&usqp=CAU"
    }
    document.getElementsByClassName("money")[0].innerHTML = "£"+user.money
    document.getElementsByClassName("user-name")[0].innerHTML = user.fname
    autoris.style.visibility = "visible"
    notAutoris.style.visibility = "hidden"
    autoris.style.position = "relative"
}
function createElements(TECH){
    document.getElementsByClassName("products")[0].textContent = "" 
    for (let item in TECH){
        let itemDOM = document.createElement("div")
        itemDOM.className = "cart"
    
        let itemWrapImg =  document.createElement("div")
        itemWrapImg.className = "product-img-wrapper"
    
        let itemImage = document.createElement("img")
        itemImage.className = "product-img"
        itemImage.src = TECH[item].imgURL
        itemWrapImg.appendChild(itemImage)
    
        let itemName = document.createElement("div")
        itemName.className = "product-name"
        itemName.innerHTML = TECH[item].title
    
        let itemDescription = document.createElement("div")
        itemDescription.className = "description"
        itemDescription.innerHTML = "Description:"
        for (let option in TECH[item].description){
            itemDescription.appendChild(document.createElement("br"))
            itemDescription.innerHTML += `- ${option}: ${TECH[item].description[option]}`
        }
        itemDescription.appendChild(document.createElement("br"))
        itemDescription.innerHTML += `- rating: ${TECH[item].rating}`
    
        let itemPrice = document.createElement("div")
        itemPrice.className = "product-price"
        itemPrice.innerHTML = "£"+TECH[item].price
    
        let itemButton = document.createElement("button")
        itemButton.className = "product-btn"
        itemButton.innerHTML = "Buy"
    
        
    
        itemDOM.appendChild(itemWrapImg)
        itemDOM.appendChild(itemName)
        itemDOM.appendChild(itemDescription)
        itemDOM.appendChild(itemPrice)
        itemDOM.appendChild(itemButton)
    
        document.getElementsByClassName("products")[0].appendChild(itemDOM)
    }
}