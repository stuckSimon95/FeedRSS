let request = new Request("https://ats-gruppidicammino.e-lios.eu/api/Blogs");

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
        <p>Connessione non riuscita</p>
        </div>
        `;  
    }

    fetch(request)
    .then(function(response) {
        if(!response.ok)
        {
            throw Error(response.statusText);
        }
        //console.log(response);
        return response.json();
    })
    .then((data) => {
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
        
        });
        document.getElementById('output').innerHTML = output;
    });
}

function getSingleBlog(idBlog)
{
    fetch(request)
    .then((res) => res.json())
    .then((data) => {
        let output = '';
        data.forEach(function(blog){
        if(blog.ID == idBlog){

            var startPoint = 'T';
            var indexOfFirst = blog.InsertionDate.indexOf(startPoint);
            var date = blog.InsertionDate.substring(0, indexOfFirst);
            var time = blog.InsertionDate.substring(indexOfFirst + 1);
            var indexMsPoint = time.indexOf('.');
            time = time.substring(0, indexMsPoint);

            output += `
                <button class="btn btn-light" type="submit" href=".">
                    <a href=".">
                        <i class="fas fa-backward">
                            <p>Indietro</p>
                        </i>
                    </a>
                </button>`;
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
        
        });
        document.getElementById('output').innerHTML = output;
    })
}

function showBlog(div)
{
    var idBlog = div.find('input').attr('id');
    //window.location.href = window.location.href + '?idBlog=' + idBlog;
    getSingleBlog(idBlog);
}