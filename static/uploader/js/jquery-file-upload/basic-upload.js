$(function () {

  var dataamount;
  $(".js-upload-photos").click(function () {
    $("#fileupload").click();
  });

  $("#fileupload").fileupload({
    dataType: 'json',
    sequentialUploads: true,
    /* 1. SEND THE FILES ONE BY ONE */
    start: function (e) {
      /* 2. WHEN THE UPLOADING PROCESS STARTS, SHOW THE MODAL */
      $('#card-progress').removeClass('d-none');
      $("#upload-title").text("Uploading...");
    },
    add: function (e, data) {
      var goUpload = true;
      var uploadFile = data.files[0];
      if (!(/\.(doc|docx|html|htm|odt|pdf|xls|xlsx|ods|ppt|pptx|txt)$/i).test(uploadFile.name)) {
          $("#errorTitle").text("Error: File type not allowed");
          $("#errorFile").text("File: " + uploadFile.name);
          $("#errorMessage").text("You can only upload document files (doc, docx, html, htm, odt, pdf, xls, xlsx, ods, ppt, pptx, txt).");
          $("#errorDiv").removeClass('d-none');
          goUpload = false;
      }
      if (uploadFile.size > 25000000) { // 25mb
        $("#errorFile").text("File: " + uploadFile.name);
        $("#errorMessage").text("Please upload a smaller document, the max size is 25MB");
        $("#errorDiv").removeClass('d-none');
          goUpload = false;
      }

      if (uploadFile.size === 0) { // 10mb
        $("#errorTitle").text("Error: File empty");
        $("#errorFile").text("File: " + uploadFile.name);
        $("#errorMessage").text("File name: It looks like you uploaded a file with nothing in it. Is it a shortcu and not the file?");
        $("#errorDiv").removeClass('d-none');
        goUpload = false;
    }
      if (goUpload == true) {
          data.submit();
      }
    },
    stop: function (e) {
      /* 3. WHEN THE UPLOADING PROCESS FINALIZE, HIDE THE MODAL */
      $('#card-progress').removeClass('d-none');
      $("#upload-title").text("Finished uploading! 🎉");
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
          "<tr><td><a href='" + data.result.url + "'>" + data.result.name + "</a></td> <td>Processing...<td></tr>"
        )
      }
    }

  });

});
