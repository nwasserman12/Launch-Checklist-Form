// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/
window.addEventListener("load", function() {

   const launchForm = document.getElementById("launchForm"); 

   launchForm.addEventListener("submit", function(event) {
      event.preventDefault();
      const pilot = launchForm.querySelector("input[name='pilotName']").value; 
      const copilot = launchForm.querySelector("input[name='copilotName']").value;
      const fuel = launchForm.querySelector("input[name='fuelLevel']").value;
      const cargo = launchForm.querySelector("input[name='cargoMass']").value; 

      if (!pilot || !copilot || !fuel || !cargo) {
         alert("invalid input"); 
      }

      document.getElementById("pilotStatus").textContent = `Pilot ${pilot} is ready`; 
      document.getElementById("copilotStatus").textContent = `Copilot ${copilot} is ready`; 

      if (Number(fuel) < 10000){
         document.getElementById("faultyItems").style.visibility = "visible"; 
         document.getElementById("launchStatus").textContent = "Shuttle not ready for launch"; 
         document.getElementById("launchStatus").style.color = "red"; 
         document.getElementById("fuelStatus").textContent = "Not enough fuel for the Journey"; 
      } else if (Number(cargo) > 10000){
         document.getElementById("faultyItems").style.visibility = "visible";  
         document.getElementById("launchStatus").textContent = "Shuttle not ready for launch"; 
         document.getElementById("launchStatus").style.color = "red"; 
         document.getElementById("cargoStatus").textContent = "Too much mass for the shuttle to take off"; 
      } else {
         document.getElementById("faultyItems").style.visibility = "visible"; 
         document.getElementById("launchStatus").textContent = "Shuttle is ready for launch";
         document.getElementById("launchStatus").style.color = "green"; 
      }

      let planetChoice; 

      fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
         response.json().then(function(json) {
            console.log(json);

            let randomPlanet = Math.floor(Math.random()*6); 
            planetChoice = json[randomPlanet]; 
            missionTarget.innerHTML =` 
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${planetChoice.name}</li>
               <li>Diameter: ${planetChoice.diameter}</li>
               <li>Star: ${planetChoice.star}</li>
               <li>Distance from Earth: ${planetChoice.distance}</li>
               <li>Number of Moons: ${planetChoice.moons}</li>
            </ol>
            <img src="${planetChoice.image}"></img>
         `});
      });
   });
});

