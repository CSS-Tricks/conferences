const viewButtons = document.querySelectorAll('.style-switcher button');

viewButtons.forEach(button => {
  button.addEventListener('click', el => {
    var bodyClass = el.target.dataset.bodyClass;
    document.body.classList.remove('grid', 'list');
    viewButtons.forEach(button => {
      button.classList.remove('active');
    });
    el.target.classList.add('active');
    document.body.classList.add(el.target.dataset.bodyClass);
    localStorage.setItem('view', bodyClass);
  });
});


(function() {
  var savedState = localStorage.getItem('view'),
    current;

   if( savedState !== null && viewButtons.length > 0 ) {
     current = document.querySelector('[data-body-class="' +  savedState + '"]');
     current.click();
   }
}());