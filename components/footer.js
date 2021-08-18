class Footer extends HTMLElement {
    constructor() {
        super();
        this.innerHTML = `
        <footer class="container-fluid">
        <div class="container">
          <div class="row">
            <div class="col-sm-12 col-lg-6">
              <div class="red-block wide-block"></div>
              <h1>More on Sexual Harassment in the Media</h1>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="red-block"></div>
              <h3>More research links</h3>
              <a href="full-data.html">View The Full Data</a>
              <a href="reports.html">Get The PDF Reports</a>
              <a href="articles.html">Read The Article Summaries</a>
            </div>
            <div class="col-sm-12 col-lg-3">
              <div class="red-block"></div>
              <h3>Links on toolkit</h3>
              <a href="https://sexualharassment.womeninnews.org/en/facts/what-is-sexual-harassment">What is Sexual Harassment</a>
              <a href="https://sexualharassment.womeninnews.org/en/scenes">How To Deal With Sexual Harassment</a>
              <a href="https://sexualharassment.womeninnews.org/en/resources">Our Sexual Harassment Resources</a>
            </div>
          </div>
        </div>
  
        <div class="d-flex flex-row powered-by justify-content-center align-items-center">
          
          <div>
            © 2021 WAN-IFRA
          </div>
          <div>
            <a class="">
              <img src="assets/images/lasLogoWhite.svg" alt="LAS">
              Powered by LAS
            </a>
          </div>
        </div>
      </footer>
      <div class="coloured-strip"></div>
        `
    }
}

window.customElements.define('my-footer', Footer);