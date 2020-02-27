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
   const url =`https://developer.nps.gov/api/v1/parks?stateCode=${state}&stateCode=&limit=${limit}&api_key=QlUtkpERocdZbPNgEN4PG9igQgsqdyiyySfcbtIJ`;
   
   $('.parkinfo').empty();
   list = 0;
   
   fetch(url)
   .then(response => {
    return response.json();
   })
   .then(data => {
    console.log(data.data.addresses);
    let parkData = data.data;
    parkInfo(parkData)
   })
   .catch(error => {
    alert('Invalid State Abbreviation')
    })
  })
};


function parkInfo(parkData){
    
    let name = ""
    let info = ""
    let url = ""

    for(let i = 0; i < parkData.length; i++){
        //console.log(data[i])

        name = parkData[i].fullName;
        info = parkData[i].description;
        url = parkData[i].url;
        //$('.parkinfo').empty();
        //console.log(name,info,url);
        displayInfo(name,info,url);
    }
};

function displayInfo(name,info,url){
    //$('.parkinfo').empty();
    list++;
    let string =`<h1>${list}. ${name}</h1> <p>${info} <p><h2>Website: <a href="${url}">${url}</a></h2>`
    $('.parkinfo').append(string);
}

findParks();