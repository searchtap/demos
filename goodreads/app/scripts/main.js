$(function () {

  var source = $('#book-template').html();
  var template = Handlebars.compile(source);

  $('#searchTerm').keyup(function () {
    var token = '250c67b79fe336562583cd168f260d2eca67979e899695f39bf9ae881ed3ded8252be8a488f2fe17073dd760adb9dfef6b86433a5f170c58efaa2edf3c5891d9d58f96fab132eb623326192bd267c3d8ad07a6003eb80e829a2133b278b74969e599980d58f976d6ef104f267e352e243c29b86b50ce04c40c70544c91b2aa80';

    var data = {
      query: $(this).val(),
      fields: ['id', 'title', 'rating', 'authors', 'url', 'imgUrl', 'date'],
      searchFields: ['title'],
      offset: 0,
      pageSize: 10
    };


    $.ajax({
      url: 'http://in-1.api.searchtap.io/api/v1/collections/goodreads/query',
      contentType: 'application/json',
      headers: {
        'X-Auth-Token': token
      },
      dataType: 'json',
      type: 'POST',
      data: JSON.stringify(data),
      error: function (err) {
        console.log(err)
      },
      success: function (data) {
        var result = template(data);
        $('#results-container').html(result);

        $.each($('.moment'), function () {
          $(this).text(moment.unix($(this).text()).fromNow())
        })

      }
    });
  });

  $('#searchTerm').trigger('keyup');

});
