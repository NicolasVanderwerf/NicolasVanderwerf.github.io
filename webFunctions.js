counter = 0;

function increment() {
    console.log("Clicked: " + counter + " times");
    counter++;
    document.getElementById("id01").innerHTML = counter;
}