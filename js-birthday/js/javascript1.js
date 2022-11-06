function welcome(){
    var name = prompt("Enter your name");
    var age = prompt("Enter your age");
    var month = prompt("What month were you born?");
    if(age < 50){
        alert("Hello " + name +". Your are " + age + " years old and you were born in " + month+".");
        document.getElementById("id01").textContent = "Welcome young man!";
    }else{
        alert("Hello " + name +". Your are " + age + " years old and you were born in " + month+".");
        document.getElementById("id01").textContent = "Hello Gramps!";
    }

    
}
