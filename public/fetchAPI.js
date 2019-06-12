var request = new Request(
    "https://ats-gruppidicammino.e-lios.eu/api/Blogs"
);

getBlogAPI();

function getBlogAPI()
{
    let output = '';
    // messaggio offline
    if(!navigator.onLine)
    {
        output += `
        <div class="card card-body mb-3 text-center list-group-item-action animated css" data-aos="fade-up"
        data-aos-duration="600">
        <i class="far fa-times-circle fa-6x" style="font-weight: 800"></i>
        <h3> Nessuna connessione a Internet </h3>
        <br>
        <p style="font-size: 15px !important;">Controllare che la connessione sia presente e ricaricare la pagina</p>
        </div>
        `;  
    }

    fetch(request)
    .then(function(response) {
        if(response.status !== 200)
        {
            console.log('PROBLEM: ' + response.status);
            return;
        }
        return response.json();
    })
    .then(function(data) {
        data.forEach(function(blog){
            var startPoint = ';">';
            var indexOfFirst = blog.Content.indexOf(startPoint);
            var substrContent = blog.Content.substring(indexOfFirst + 3, indexOfFirst + 183) + "...";

            startPoint = 'T';
            indexOfFirst = blog.InsertionDate.indexOf(startPoint);
            var date = blog.InsertionDate.substring(0, indexOfFirst);
            var time = blog.InsertionDate.substring(indexOfFirst + 1);

            var indexMsPoint = time.indexOf('.');
            time = time.substring(0, indexMsPoint);
            if(blog.CoverImage == null)
            {
                output += `
                <div class="card card-body mb-3 text-center list-group-item-action animated css" data-aos="fade-up"
                data-aos-duration="600" onclick="showBlog($(this));">
                <input id="${blog.ID}" type="hidden">
                <h4 class="display-4">${blog.Title}</h4>
                <p>
                    <img src=""
                    class="img-fluid img-responsive">
                </p>
                <p> Data: ${date} </p>
                <p> Ora: ${time} </p>
                <p>${substrContent}</p>
                </div>
            `;
            }
            else
            {
                output += `
                <div class="card card-body mb-3 text-center list-group-item-action animated css" data-aos="fade-up"
                data-aos-duration="600" onclick="showBlog($(this));">
                <input id="${blog.ID}" type="hidden">
                <h4 class="display-4">${blog.Title}</h4>
                <p>
                    <img src="https://ats-gruppidicammino.e-lios.eu/Blog/GetBlogFile/${blog.CoverImage}?dimension=MEDIUM"
                    class="img-fluid img-responsive">
                </p>
                <p> Data: ${date} </p>
                <p> Ora: ${time} </p>
                <p>${substrContent}</p>
                </div>
            `;
            }
            document.getElementById('output').innerHTML = output;
        });
    })
    .catch(function(error) 
    {
        console.log(error);
        document.getElementById('output').innerHTML = output;
    }) 
}

function getSingleBlog(idBlog)
{
    fetch(request)
    .then((res) => res.json())
    .then((data) => {
        let output = '';
        data.forEach(function(blog){
        if(blog.ID == idBlog) {

            var startPoint = 'T';
            var indexOfFirst = blog.InsertionDate.indexOf(startPoint);
            var date = blog.InsertionDate.substring(0, indexOfFirst);
            var time = blog.InsertionDate.substring(indexOfFirst + 1);
            var indexMsPoint = time.indexOf('.');
            time = time.substring(0, indexMsPoint);
            
            var backButton = `
            <a class="nav-link btn btn-light" href="." style="">
                <i class="fas fa-backward"></i>
                <h4>Indietro</h4>
            </a>`;

            $('.navbar').after(backButton);

            if(blog.CoverImage == null)
            {
                output += `
                <div class="card card-body mb-3 text-center">
                <input id="${blog.ID}" type="hidden">
                <h4 class="display-4">${blog.Title}</h4>
                <p>
                    <img src=""
                    class="img-fluid img-responsive">
                </p>
                <p> Data: ${date} </p>
                <p> Ora: ${time} </p>
                <p>${blog.Content}</p>
                </div>
            `;
            }
            else
            {
                output += `
                <div class="card card-body mb-3 text-center">
                <input id="${blog.ID}" type="hidden">
                <h4 class="display-4">${blog.Title}</h4>
                <p>
                    <img src="https://ats-gruppidicammino.e-lios.eu/Blog/GetBlogFile/${blog.CoverImage}?dimension=MEDIUM"
                    class="img-fluid img-responsive">
                </p>
                <p> Data: ${date} </p>
                <p> Ora: ${time} </p>
                <p>${blog.Content}</p>
                </div>
            `;
            }
        }
        
        })
        document.getElementById('output').innerHTML = output;
    });
 
    /* $('html, body').animate({
        scrollTop: $(".scrollTop").offset().top
    }); */
    $(document).scrollTop(0);
}

function showBlog(div)
{
    var idBlog = div.find('input').attr('id');
    //window.location.href = window.location.href + '?idBlog=' + idBlog;
    getSingleBlog(idBlog);
}