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

   if( savedState !== null ) {
     current = document.querySelector('[data-body-class="' +  savedState + '"]');
     current.click();
   }
}());

(function() {
  var toggles = document.querySelectorAll('[aria-controls]');

  toggles.forEach(el => {
    el.addEventListener( "click", function( e ){
      let target = this.getAttribute( "aria-controls" ),
        targetEl = document.querySelector( '#' + target ),
        newState = this.getAttribute( 'aria-expanded' ) === "true" ? false : true;

      this.setAttribute( "aria-expanded", newState );
      targetEl.setAttribute( "aria-hidden", !newState );
    });
  });
}());

(function() {
  var forms = document.querySelectorAll('form');

  forms.forEach(el => {
    el.addEventListener( "submit", function( e ){
      let form = this,
        action = form.getAttribute( "action" ),
        method = form.getAttribute( "method" ),
        data   = new FormData( form );

      fetch(
        action,
        {
          method: method,
          body: data
        }
      )
      .then( response => {
        if( response.ok === true ) {
          form.querySelector( ".send-email" ).setAttribute( "aria-label", "Sent!" );
        }
      })
      .catch( error => console.error('error:', error) );
      e.preventDefault();
    });
  });
}());

