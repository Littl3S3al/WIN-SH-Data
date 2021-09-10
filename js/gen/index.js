let toTop = document.querySelector('.to-top-button')

if (
    "IntersectionObserver" in window &&
    "IntersectionObserverEntry" in window &&
    "intersectionRatio" in window.IntersectionObserverEntry.prototype
  ) 
  {
  let observer = new IntersectionObserver(entries => {
    if (entries[0].boundingClientRect.y < 0) {
      toTop.style.bottom = '20px';
      toTop.style.opacity = '1';
      
    } else {
        toTop.style.bottom = '-20px';
        toTop.style.opacity = '0';
    }
  });
  observer.observe(document.querySelector("#top-of-site-pixel-anchor"));
  }

  toTop.addEventListener('click', () => {
      window.scrollTo(0, 0)
  })


  window.addEventListener( "pageshow", function ( event ) {
    var historyTraversal = event.persisted || 
                           ( typeof window.performance != "undefined" && 
                                window.performance.navigation.type === 2 );
    if ( historyTraversal ) {
      // Handle page restore.
      window.location.reload();
    }
  });