
function findCaliforniaCafes(searchtext) {
    // You can store the given arrays in 2 internal variables
    const cafes = `https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/cafes.json`
    const places = `https://raw.githubusercontent.com/debojyoti/places-fake-rest-api/master/places.json`
    //  Your code goes here

    function Object(name,street_no,locality,postal_code,lat,long){
        this.name = name,
        this.street_no = street_no,
        this.locality = locality,
        this.postal_code = postal_code,
        this.lat = lat,
        this.long = long;
    }
    
    async function myFetch() {
        let response1 = await fetch(cafes);
        let response2 = await fetch(places);
      
        if (!response1.ok || !response2.ok) {
            throw new Error(`HTTP error! status: ${response1.status || response2.status}`);
        }
        else{
            
            response1.json().then(e=>{
                
                let res= e.cafes.filter(e => new RegExp(searchtext,'i').test(e.name)) 
                // console.log(res)
                response2.json().then(e=>{
                        // console.log(e.places)
                        let output=[];
                        let listNo= 1;
                        for(x of res){
                        let res1= e.places.filter(e => e.id.includes(x.location_id));
                        const last = new Object(x.name,res1[0].street_no,res1[0].locality,res1[0].postal_code,res1[0].lat,res1[0].long);
                        output+=`
                            <tr>
                                 <td class="column1">${listNo}</td>
                                 <td class="column2">${last.name}</td>
                                 <td class="column3">${last.street_no}, ${last.locality}</td>
                                 <td class="column4">${last.postal_code}</td>
                                 <td class="column5">${last.lat}</td>
                                 <td class="column6">${last.long}</td>
                             </tr>
                             `;
                        listNo ++;
                        }document.getElementById("table-data").innerHTML= output;
                    }).catch(err => { console.log(err.message)})  
            }).catch(err => { console.log(err.message)})
        }
    }
    myFetch().catch(e => {
        console.log('There has been a problem with your fetch operation: ' + e.message);
    });
}

// Search using User-Input
let search = document.querySelector("#searchText");
search.addEventListener("keyup", (e)=>{
    let searchText = e.target.value;
    findCaliforniaCafes(searchText);
})