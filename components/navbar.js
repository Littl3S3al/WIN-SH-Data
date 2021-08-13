class NavBar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <nav class="navbar fixed-top navbar-dark bg-darkBlue-80" id="my-nav">
        <div class="container-fluid">
          <a class="navbar-brand" href="/">
            <img src="assets/logo-white.svg" alt="Women In News"/>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <svg
                  data-target="slide-out"
                  class="sidenav-trigger"
                  viewBox="0 0 100 80"
                  width="40"
                  height="40"
                  style="fill: white"
                >
                <rect y="20" width="100" height="10"></rect>
                <rect y="50" width="100" height="10"></rect>
          </button>

          <!-- !nav bar open -->
          <div class="collapse navbar-collapse text-end" id="navbarSupportedContent">
            <div class="container-fluid">
              <button class="navbar-toggler type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="material-icons" id="close-btn">
                  close
                  </i>
              </button>
            </div>

              <ul class="navbar-nav me-auto text-start p-4">
                <li class="red-block"><div class="block"></div></li>
                <li class="nav-item nav-title">
                  <a class="nav-link" aria-current="page" href="/">Sexual Harassment Data</a>
                </li>
                <li class="nav-item">
                  <a href="/full-data.html" class="nav-link">Full Data Section</a>
                </li>
                <li class="nav-item">
                  <a href="/articles.html" class="nav-link">Articles</a>
                </li>
                <li class="nav-item">
                  <a href="/reports.html" class="nav-link">PDF Reports</a>
                </li>
                <li class="red-block"><div class="block"></div></li>
                <li class="nav-item nav-title">
                  <a href="https://sexualharassment.womeninnews.org/en/" class="nav-link">
                    <i class="material-icons">arrow_back</i> Sexual Harassment Toolkit
                  </a>
                </li>
              </ul>

              
                <div class="row nav-end d-flex align-items-end">
                  <!-- *social media icons -->
                  <div class="social-feed col-3 text-start">
                    <a href="https://www.facebook.com/WINatWAN" target="_blank"
                      ><img src="assets/facebook.svg" alt="facebook-share"
                    /></a>
                    <a href="https://twitter.com/WomenInNews" target="_blank"
                      ><img src="assets/twitter.svg" alt="twitter-share"
                    /></a>
                  </div>
                  <!-- *get in touch -->
                  <div class="nav-contact text-end col-9">
                    <a href="https://sexualharassment.womeninnews.org/en/contact" class="nav-item"> GET IN TOUCH</a>
                    <br>
                    <div class="red-block"></div>
                  </div>
                </div>
  
            </div>
  
                
              
          </div>
        </div>
    </nav>
        `
    }
}

window.customElements.define('my-navbar', NavBar)