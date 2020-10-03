document.addEventListener("DOMContentLoaded", () => {
    // Aktivasi sidebar
    const elements = document.querySelectorAll(".sidenav");

    M.Sidenav.init(elements);
    loadNav();

    function loadNav() {
        // init XML HTTP REQUEST (XHR)
        const xmlHttp = new XMLHttpRequest();
        const elementNavigation = document.querySelectorAll(".topnav, .sidenav");
        xmlHttp.onreadystatechange = () => {
            // cek kondisi XHR
            if (xmlHttp.readyState == 4) {
                if (xmlHttp.status != 200) return;

                // Muat daftar tautan menu
                elementNavigation.forEach((elements) => {
                    elements.innerHTML = xmlHttp.responseText;
                });

                // Daftarkan Event Listener untuk setiap tautan
                elementNavigation.forEach((elements)=>{
                    elements.addEventListener("click",(event)=>{
                        // tutup sidenav
                        const sidenav = document.querySelector(".sidenav");
                        M.Sidenav.getInstance(sidenav).close();

                        // Muat konten halaman yang dipanggil
                        page = event.target.getAttribute("href").substr(1);
                        loadPage(page);
                    });
                });
            }
        };

        xmlHttp.open("GET", "nav.html", true);
        xmlHttp.send();
    }

    // Load page content
    let page = location.hash.substr(1);

    if(page=="") page = "home";
    loadPage(page);

    function loadPage(page){
        const xmlHttp = new XMLHttpRequest();

        xmlHttp.onreadystatechange=()=>{
            if(xmlHttp.readyState==4){
                const content = document.querySelector("#body-content");
                if(xmlHttp.status==200){
                    content.innerHTML= xmlHttp.responseText;
                }else if(xmlHttp.status==404){
                    content.innerHTML = `<p>Halaman tidak ada</p>`;
                }else{
                    content.innerHTML = `<p>Ups.. halaman tidak dapat diakses</p>`;
                }
            }
        };

        xmlHttp.open("GET",`pages/${page}.html`,true);
        xmlHttp.send();
    }
});