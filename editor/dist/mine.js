'use strict';
(function($,window) {
    var createButtons = function() {
        
    };

    var HelloButton = function (context) {
        var ui = $.summernote.ui;
        // create button
        var button = ui.button({
            contents: '<i class="fa fa-refresh"/> Hello',
            tooltip: 'hello',
            click: function () {
            // invoke insertText method with 'hello' on editor module.
            context.invoke('editor.insertText', 'hello');
            }
        });
        return button.render();   // return button as jquery object 
    };


    $(document).ready(function() {
      

      $('.summernote').summernote({
        height: 600,
        tabsize: 2,
        toolbar: [
  		    ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', [ 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']],
            ['view', ['fullscreen', 'codeview', 'help']],
            ['mybutton', ['hello']]
  		  ],
        fontNames: [
            'Microsoft Yahei','Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
            'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
            'Tahoma', 'Times New Roman', 'Verdana'
          ],
        buttons: {
           hello: HelloButton
        },
        codemirror: {
          mode: 'text/html',
          htmlMode: true,
          lineNumbers: true,
          theme: 'monokai'
        }

      });
      
    });
}(jQuery,window));