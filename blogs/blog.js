(function() 
{
    //document.getElementById('getBlogAPI').addEventListener('click', getBlogAPI);
    //document.getElementById('btnAd2hs').addEventListener('click', addToHomeScreen);

    function getBlogAPI()
    {
      fetch('https://ats-gruppidicammino.e-lios.eu/api/Blogs')
      .then((res) => res.json())
      .then((data) => {
        let output = '';
        data.forEach(function(user){
          if(user.CoverImage == null)
          {
            output += `
            <div class="card card-body mb-3 text-center list-group-item-action">
              <h4 class="display-4">${user.Title}</h4>
              <p class="">
                <img src=""
                class="img-fluid">
              </p>
              <p class="">${user.InsertionDate}</p>
              <p class="">${user.Content}</p>
            </div>
          `;
          }
          else
          {
            output += `
            <div class="card card-body mb-3 text-center list-group-item-action">
              <h4 class="display-4">${user.Title}</h4>
              <p class="">
                <img src="https://ats-gruppidicammino.e-lios.eu/Blog/GetBlogFile/${user.CoverImage}?dimension=MEDIUM"
                class="img-fluid">
              </p>
              <p class="">${user.InsertionDate}</p>
              <p class="">${user.Content}</p>
            </div>
          `;
          }
          
        });
        document.getElementById('output').innerHTML = output;
      })
    }
})();