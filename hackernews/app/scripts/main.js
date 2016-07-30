$(function () {

  var source = $('#news-template').html();
  var template = Handlebars.compile(source);

  $('#searchTerm').keyup(function () {
    var token = '23b888cd3722435f88bc67e861c80e244692988e29680dd2da30bd942cc0445f8be0a4f2f6b0705f6e535c070c01d705968c62e7aafa08cf99a632a9c23c6f9e77eefabe4b89ee398076fd120450f23a64de17bb87e2097098258d521caeb1137450017ee350ceba086caf5d05004804bff36a9ab71a67d3e29d6d2b49ffd1bf';

    var data = {
      query: $(this).val(),
      fields: ['id', 'title', 'time', 'by', 'url'],
      searchFields: ['title'],
      offset: 0,
      pageSize: 10,
      filters: [{
        field: 'newsType',
        query: 'story',
        queryType: 'Text',
        factor: 0,
        start: null,
        end: null
      }]
    };

    $.ajax({
      url: 'http://in-1.api.searchtap.io/api/v1/collections/hackernews/query',
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
