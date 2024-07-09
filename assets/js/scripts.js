function deletePost(value){
    var dataId = document.getElementById(value).getAttribute('data-id')
    console.log(dataId)
    fetch(`https://anonymous-postings-anisur-rahman.onrender.com/api/users/${dataId}`, {method:'DELETE'})
        .then(data=>{
            console.log(data)
            location.reload()
        })
        .catch(err=>{
            console.log(err)
        })
}

$("#update").submit(function(event){
    event.preventDefault();
    var ele = document.getElementById('post');
    if(ele.value === ele.getAttribute('post-info')){
        alert('You need to change the values')
        return;
    }

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n,i){
        data[n['name']] = n['value']
    })
    
    var request = {
        "url": `https://anonymous-postings-anisur-rahman.onrender.com/api/users/${document.getElementById('post').getAttribute('data-id')}`,
        "method": "PUT",
        "data":data
    }

    $.ajax(request).done(function(response){
        window.location.href = '/'
    })

})