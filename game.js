if (localStorage.getItem("boss") == null){
    localStorage.setItem("boss", 50000)
}

let health = localStorage.getItem("boss");// Change this one to update based on database health
let startstring = "-------- I will flood the streets with rage! --------"

// Update the life bar of both the boss and the database
function updateLife(life){
    if (life < 0){
        health = 0
        localStorage.removeItem("boss");
        localStorage.setItem("boss", 0)
    } else {
        localStorage.removeItem("boss");
        localStorage.setItem("boss", life)
        health = life; // Update the database health as well.
    }
    document.getElementById('num_health').innerHTML
        = health;
}

// Update the source of the image based on the given health.
function updateCloud(life){
    if (life < 25000){
        document.getElementById("cloud").src="imgs/cloud_mellow.png";
    }
    if (life <= 0){
        document.getElementById("cloud").src="imgs/cloud_happy.png";
    }
}

// Updates the message underneath the cloud.
function updateMessage(sentence){
    let element =  document.getElementById("display_message")
    element.innerHTML = sentence;
}

// Attack the boss
document.getElementById("attack_button").addEventListener("click", function(event){
    let multiplyer = 1;
    let message = "-------- I will flood the streets with rage! --------";

    // Gather the points
    let cans = parseInt(document.getElementById('cans').value);
    let bottles = parseInt(document.getElementById('bottles').value);
    let reuse = parseInt(document.getElementById('reuse').value);
    let paper = parseInt(document.getElementById('paper').value);
    let ewaste = parseInt(document.getElementById('ewaste').value);


    // If the boss is defeated,display happy message
    if (health == 0){
        message = "------- Thank you saving me! ------- ";
    }

    // If any of the levels are > 5, then a 2x multiplyer is added
    else if (cans > 5 || bottles > 5 || reuse > 5 || paper > 5 || ewaste > 5){
        multiplyer += 5;
        message = "----- Wow, what a powerful move that was! -----";
    }

    // If all of the levels are > 5, then a 5x multiplyer is added
    else if (cans > 5 && bottles > 5 && reuse > 5 && paper > 5 && ewaste > 5){
        multiplyer += 50000;
        message = "-------- This can't Be!!!!!!!!!!!!!!!!!!!!! --------";
    }

    // If all of the levels are > 5, then a 5x multiplyer is added
    else if (cans == 0 && bottles == 0 && reuse == 0 && paper == 0 && ewaste == 0){
        multiplyer == 0;
        message = "-------- What a pathetic excuse of a human! --------";
    }

    else {
        message = "------------- You call that an attack! -------------";
    }

    // Add up all the recycling
    let total = cans + bottles + reuse + paper + ewaste;
    let final = total * multiplyer;
    let temp_health = health - final;

    // Update the health and the cloud image
    updateLife(temp_health);
    updateCloud(temp_health);
    updateMessage(message);

    event.preventDefault();
});

document.getElementById("reset_health").addEventListener("click", function(event){
    localStorage.removeItem("boss");
    localStorage.setItem("boss", 50000);
});


function myFunction() {
    var x = document.getElementById("myLinks");
    if (x.style.display === "block") {
      x.style.display = "none";
    } else {
      x.style.display = "block";
    }
}

updateLife(health);
updateCloud(health);