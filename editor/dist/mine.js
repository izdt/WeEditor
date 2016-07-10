'use strict';
(function($,window) {
    var edit = function() {
        $('.summernote').removeClass('preview');
        $('.summernote').summernote({focus: true});
        //initSummernote();
    };

    var save = function() {
        $('.summernote').addClass('preview');
        var makrup = $('.summernote').summernote('code');
        $('.summernote').summernote('destroy');
    };

    var addLinsteners = function() {
      $('#edit').on('click',edit);
      $('#save').on('click',save);
    };

    var RestButton = function (context) {
        var ui = $.summernote.ui;
        // create button
        var button = ui.button({
            contents: '<i class="fa fa-refresh"/>',
            //tooltip: 'Reset',
            click: function () {
              //TODO: save to localstorage :
              $('.summernote').summernote('reset');
            }
        });
        return button.render();   // return button as jquery object 
    };
    var UndoRestButton = function (context) {
        var ui = $.summernote.ui;
        // create button
        var button = ui.button({
            contents: '<i class="fa fa-undo"/>',
            tooltip: 'Undo Reset',
            click: function () {
            }
        });
        return button.render();   // return button as jquery object 
    };
    var CopyAllButton = function (context) {
        var ui = $.summernote.ui;
        // create button
        var button = ui.button({
            contents: '<i class="fa fa-clipboard"/>',
            tooltip: 'CopyAll',
            click: function () {
            var element = document.getElementsByClassName('panel-body')[0];
            // Change selected area
            var r = document.createRange();
            r.selectNode(element);
            var s = window.getSelection();
            s.removeAllRanges();
            s.addRange(r);
            // Copy - requires clipboardWrite permission + crbug.com/395376 must be fixed
            document.execCommand('copy');
            }
        });
        return button.render();   // return button as jquery object 
    };
    var initSummernote = function() {
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
            ['view', ['fullscreen', 'codeview']],
            ['custom', ['copyAll','reset','undoRest']]
  		  ],
        fontNames: [
            'Microsoft Yahei','Arial', 'Arial Black', 'Comic Sans MS', 'Courier New',
            'Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
            'Tahoma', 'Times New Roman', 'Verdana'
          ],
        buttons: {
           reset: RestButton,
           undoRest: UndoRestButton,
           copyAll: CopyAllButton
        },
        codemirror: {
          mode: 'text/html',
          htmlMode: true,
          lineNumbers: true,
          theme: 'monokai'
        }

      });
    }
    
    $(document).ready(function() {
      
      initSummernote();
      addLinsteners();

    });
}(jQuery,window));