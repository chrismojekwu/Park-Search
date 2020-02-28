'use strict';

let list = 0;

function findParks(){
 $('.button').on('click', e => {
    
   let state = $('.search').val();
   let limit = $('.limit').val();
   if(state === ""){
     alert('Please enter a state code, or abbreviation.')
       return false;
   }
   createStates(state,limit);
   
   $('.parkinfo').empty();
   list = 0;
   
  })
};

function createStates(state,limit){
    let stateString = state.split(",").map(x => `${x}%2C`);
     let state2 = stateString.join("").slice(0,-3);
     console.log(state2)
   
    let target =`https://developer.nps.gov/api/v1/parks?&stateCode=${state2}&limit=${limit}&api_key=QlUtkpERocdZbPNgEN4PG9igQgsqdyiyySfcbtIJ`;
    
    console.log(target)
    fetch(target)
   .then(response => {
    return response.json();
   })
   .then(data => {
    if(data.total === "0"){
        alert('Invalid Search Term')
        console.log(data.total)
    }
    let parkData = data.data;
     parkInfo(parkData)
   })
   .catch(error => {
    alert('Invalid State Abbreviation')
    })
       
};

function parkInfo(parkData){
    
    

    let name = ""
    let info = ""
    let web = ""
    let states = ""
    for(let i = 0; i < parkData.length; i++){
        

        name = parkData[i].fullName;
        info = parkData[i].description;
        web = parkData[i].url;
        states = parkData[i].states;
        
        displayInfo(name,info,web,states);
    }
};

function displayInfo(name,info,web,states){
    
    list++;
    let corrected = states.split(",").join(" - ")
    let string =`<h1>${list}. ${name}, ${corrected} </h1> <p>${info} <p><h2>Website: <a href="${web}">${web}</a></h2>`
    
    $('.parkinfo').append(string);
}

findParks();