(function() {
  //FIXED HEADER
  const navEl = document.getElementsByClassName('main-nav')[0];
  const navTop = navEl.offsetTop;
  window.addEventListener('scroll', function() {
    var windowS = window.pageYOffset;
    if(window.pageYOffset > (navTop + 80)){
      navEl.classList.add('floating');
    }else{
      navEl.classList.remove('floating');
    }
  });
  
  // VIEW SWITCHER
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

  var savedState = localStorage.getItem('view'),
    current;

  if (savedState !== null) {
    current = document.querySelector('[data-body-class="' + savedState + '"]');
    current.click();
  }

  // EMAIL BUTTONS
  var toggles = document.querySelectorAll('[aria-controls]');

  toggles.forEach(el => {
    el.addEventListener('click', function(e) {
      let target = this.getAttribute('aria-controls'),
        targetEl = document.querySelector('#' + target),
        newState = this.getAttribute('aria-expanded') === 'true' ? false : true;

      let parent = this.closest('.card');
      let bothButtons = parent.querySelectorAll('[aria-controls]');
      bothButtons.forEach(el => {
        el.setAttribute('aria-expanded', newState);
      });

      targetEl.setAttribute('aria-hidden', !newState);
      targetEl.querySelector('input[type=email]').focus();
    });
  });

  var forms = document.querySelectorAll('form');

  forms.forEach(el => {
    el.addEventListener('submit', function(e) {
      let form = this,
        action = form.getAttribute('action'),
        method = form.getAttribute('method'),
        data = new FormData(form),
        sendData = "";

      for (var [key, value] of data.entries()) { 
        sendData += key + "=" + value + "&";
      }

      fetch(action, {
        method: method,
        body: sendData
      })
        .then(response => {
          if (response.ok === true) {
            let submit = form.querySelector('.send-email');

            submit.setAttribute('aria-label', 'Sent!');
            submit
              .querySelector('use')
              .setAttribute('xlink:href', '#icon-check');
          } else {
            console.error('error: no response');
          }
        })
        .catch(error => console.error('error:', error));
      e.preventDefault();
    });
  });
})();
