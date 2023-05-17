document.getElementById("submit").addEventListener("click", function () {
    let options = {
        method: 'GET',      
        headers: {}
      };
      
      fetch('/api', options)
      .then(response => response.json())
      .then(body => {
            console.log(response);
      });
  });