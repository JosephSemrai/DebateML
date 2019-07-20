$(function () {

  var dataamount;
  $('#card-progress').hide();

  $(".js-upload-photos").click(function () {
    $("#fileupload").click();
  });

  $("#fileupload").fileupload({
    dataType: 'json',
    sequentialUploads: true,
    /* 1. SEND THE FILES ONE BY ONE */
    start: function (e) {
      /* 2. WHEN THE UPLOADING PROCESS STARTS, SHOW THE MODAL */
      $('#card-progress').show();
      $("#upload-title").text("Uploading...");
    },
    stop: function (e) {
      /* 3. WHEN THE UPLOADING PROCESS FINALIZE, HIDE THE MODAL */
      $('#card-progress').show();
      $("#upload-title").text("Finished uploading your file(s)! 🎉");
    },
    progressall: function (e, data) {
      /* 4. UPDATE THE PROGRESS BAR */
      var progress = parseInt(data.loaded / data.total * 100, 10);
      var strProgress = progress + "%";
      $(".progress-bar").css({
        "width": strProgress
      });
      $(".progress-bar").text(strProgress);
    },
    done: function (e, data) {
      if (data.result.is_valid) {
        $("#gallery tbody").prepend(
          "<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a></td></tr>"
        )
      }
    }

  });

});