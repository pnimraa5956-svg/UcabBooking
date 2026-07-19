let selectedCab = "Economy";
let selectedFare = 120;


// Switch pages

function showSection(sectionName) {

    document.querySelectorAll(".section")
    .forEach(section => {
        section.classList.remove("active");
    });


    document.getElementById(sectionName)
    .classList.add("active");


    if(sectionName === "rides"){
        loadRides();
    }

}



// Select cab

function selectCab(name, fare, element){

    selectedCab = name;
    selectedFare = fare;


    document.querySelectorAll(".car")
    .forEach(car=>{
        car.classList.remove("selected");
    });


    element.classList.add("selected");

}




// Book ride

async function bookRide(){


    const pickup =
    document.getElementById("pickup").value.trim();


    const drop =
    document.getElementById("drop").value.trim();



    const message =
    document.getElementById("message");



    if(!pickup || !drop){

        message.innerHTML =
        "Please enter pickup and drop location";

        message.style.color="red";

        return;
    }



    const drivers=[

        {
            name:"Raju Kumar",
            car:"Swift Dzire",
            rating:"4.8"
        },

        {
            name:"Mohammed Ali",
            car:"Honda City",
            rating:"4.9"
        },

        {
            name:"Priya Sharma",
            car:"Hyundai Creta",
            rating:"4.7"
        }

    ];



    const driver =
    drivers[Math.floor(Math.random()*drivers.length)];



    const ride={

        pickup:pickup,

        dropoff:drop,

        cab_type:selectedCab,

        fare:"₹"+selectedFare,

        status:"Confirmed",

        driver_name:driver.name,

        driver_car:driver.car,

        driver_rating:driver.rating,

        booked_at:new Date()

    };



    const response =
    await fetch("/book",{

        method:"POST",

        headers:{
            "Content-Type":"application/json"
        },

        body:JSON.stringify(ride)

    });



    const result =
    await response.json();



    if(result.success){

        message.innerHTML =
        "✓ Ride booked successfully";

        message.style.color="green";


        document.getElementById("pickup").value="";
        document.getElementById("drop").value="";


    }

}




// Load rides

async function loadRides(){


    const response =
    await fetch("/rides");


    const rides =
    await response.json();



    const box =
    document.getElementById("ridesList");



    if(rides.length===0){

        box.innerHTML =
        "<p>No rides booked yet.</p>";

        return;

    }



    box.innerHTML="";



    rides.reverse().forEach(ride=>{


        box.innerHTML += `

        <div class="account-card">

        <h3>
        ${ride.pickup} → ${ride.dropoff}
        </h3>


        <p>
        ${ride.cab_type}
        |
        ${ride.fare}
        </p>


        <p>
        Driver:
        ${ride.driver_name}
        </p>


        <p>
        Status:
        ${ride.status}
        </p>


        </div>

        `;


    });


}



// Account


async function registerUser(){


const name =
document.getElementById("regName").value;


const phone =
document.getElementById("regPhone").value;


const password =
document.getElementById("regPassword").value;



const response =
await fetch("/register",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
phone,
password

})

});


const result =
await response.json();



document.getElementById("accountMessage")
.innerHTML =
result.message;


}





async function loginUser(){


const phone =
document.getElementById("loginPhone").value;


const password =
document.getElementById("loginPassword").value;



const response =
await fetch("/login",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

phone,
password

})

});



const result =
await response.json();



if(result.success){


localStorage.setItem(
"token",
result.token
);


localStorage.setItem(
"user",
JSON.stringify(result.user)
);



document.getElementById("profile")
.innerHTML =
"Welcome "+result.user.name;


}
else{


document.getElementById("accountMessage")
.innerHTML =
result.message;


}


}