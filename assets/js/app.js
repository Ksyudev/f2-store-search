
const URL = 'https://fakestoreapi.com/products';

let Model = {
    cards: [],
    searchText: '',
    sortDirection: null,

async load(){

let data = await fetch(URL);
    data = await data.json();

    this.cards = data;
    this.render();
        }, // load()
  
    render(){
      let info = document.querySelector('main');
      let output = [...this.cards];
          if(this.searchText){
               output = output.filter(i => i.title
                                             .toLowerCase()
                                             .includes(this.searchText));
          }
        // console.log(output);
          if(this.sortDirection == 'up'){
              output.sort( (a, b) => a.price - b.price );
          }

          if(this.sortDirection == 'down'){
            output.sort((a, b) => b.price - a.price);
  
          }
          
          info.innerHTML = output.map(card => `
          <div class='p-2'>
          <div class="card shadow">
            <img src="${card.image}" class="card-img-top" alt="...">
            <div class="card-body">
         <h5 class="card-title">
              ${card.title}        
         </h5>
             <p class="card-text">
               ${card.description}
              </p>
              <div class="d-flex justify-content-between align-items-center">
              <div class="btn-group">
        
              </div>
              <p class="text-bolder">$ ${card.price}</p>
            </div>
            </div>
          </div>
        </div>
          `).join('');
  }, //render()
        
      search(stext){
            this.searchText = stext.toLowerCase().trim();
            this.render();
      }, //search()
        
        
      sort(dir){
        this.sortDirection = dir;
        this.render();

    } //sort()

} 
let searchInput = document.getElementById('search');

    searchInput.addEventListener('input', function(){
        Model.search(searchInput.value);
    })
let sortUp   = document.getElementById('sort-up');
    let sortDown = document.getElementById('sort-down');

    sortUp.addEventListener('click', function(){
        Model.sort('up');
    });

    sortDown.addEventListener('click', function(){
        Model.sort('down');
    });



    Model.load();

