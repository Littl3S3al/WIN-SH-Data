class NavBar extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <nav class="navbar fixed-top navbar-dark shadow" id="my-nav">
        <div class="container-fluid">
          <a class="navbar-brand" href="index.html">
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
    
            <div class="navbar-nav text-white text-start">
                  <div class="row">
                    <div class="col-sm-12 col-md-6">
                      <div class="red-block"></div>
                      <a href="https://sexualharassment.womeninnews.org/en/facts/what-is-sexual-harassment"><h1>What Is Sexual Harassment</h1></a>
                      <a href="https://sexualharassment.womeninnews.org/en/facts/chapter/chapter_1/0">Data</a>
                      <a href="https://sexualharassment.womeninnews.org/en/facts/chapter/chapter_2/0">What Counts As Sexual Harassment?</a>
                      <a href="https://sexualharassment.womeninnews.org/en/facts/chapter/chapter_3/0">Costs</a>
                      <div class="red-block"></div>
                      <a href="https://sexualharassment.womeninnews.org/en/scenes"><h1>How To Deal With Sexual Harassment</h1></a>
                    </div>
                    <div class="col-sm-12 col-md-6">
                      <div class="red-block"></div>
                      <a href="https://sexualharassment.womeninnews.org/en/facts/what-is-sexual-harassment"><h1>Sexual Harassment Research 2021</h1></a>
                      <a href="full-data.html">Full Data</a>
                      <a href="articles.html">Articles</a>
                      <a href="reports.html">PDF Reports</a>
                    </div>
                    <div class="col-sm-12 lasties">
                        <a href="https://sexualharassment.womeninnews.org/en/resources">Resources</a>
                        <a href="https://sexualharassment.womeninnews.org/en/testimonies">Testimonials</a>
                        <a href="https://sexualharassment.womeninnews.org/en/support-directory">Support Directory</a>
                        <a href="https://sexualharassment.womeninnews.org/en/glossary">Glossary</a>
                        <a href="https://sexualharassment.womeninnews.org/en/about-us">About</a>
                    </div>
                  </div>
            </div>
              
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