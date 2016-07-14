'use strict';
(function($,window) {
    var format = function() {
        var cmEditor = $('.CodeMirror')[0].CodeMirror;
        var totalLines = cmEditor.lineCount();
        var totalChars = cmEditor.getTextArea().value.length;
        cmEditor.autoFormatRange({line:0, ch:0}, {line:totalLines, ch:totalChars});
    };

    var edit = function() {
        $('.editor').removeClass('iphone');
        $('.summernote').removeClass('preview');
        //$('.summernote').summernote({focus: true});
        initSummernote();
    };

    var preview = function() {
        $('.editor').addClass('iphone');
        $('.summernote').addClass('preview');
        var markup = $('.summernote').summernote('code');
        $('.summernote').summernote('destroy');
    };

    var backHistory = function() {
      var markup = localStorage.getItem("editorHistory");
      if(!$('.editor').hasClass('iphone'))
      $('.summernote').summernote('code',markup);
    };

    var addLinsteners = function() {
      $('#edit').on('click',edit);
      $('#preview').on('click',preview);
      $('#history').on('click',backHistory);
    };

    var SaveButton = function(context) {
        var ui = $.summernote.ui;
        // create button
        var button = ui.button({
            contents: '<i class="fa fa-save"/>',
            tooltip: 'Save',
            click: function () {
              var markup = $('.summernote').summernote('code');
              localStorage.setItem('editorHistory',markup);
            }
        });
        return button.render();   // return button as jquery object 
    };

    var RestButton = function (context) {
        var ui = $.summernote.ui;
        // create button
        var button = ui.button({
            contents: '<i class="fa fa-trash-o"/>',
            tooltip: 'Reset',
            click: function () {
              var markup = $('.summernote').summernote('code');
              localStorage.setItem("resetMark",markup);
              //$('.summernote').summernote('reset');
              $('.summernote').summernote('code','');
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
                var markup = localStorage.getItem("resetMark");
                $('.summernote').summernote('code',markup);
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
                var container = document.getElementsByClassName('panel-body')[0];
                // Change selected area
                var range = document.createRange();
                range.selectNodeContents(container);
                var selection = window.getSelection();
                selection.removeAllRanges();
                selection.addRange(range);
                // Copy - requires clipboardWrite permission + crbug.com/395376 must be fixed
                document.execCommand('copy');
            }
        });
        return button.render();   // return button as jquery object 
    };
    var initSummernote = function() {
        $('.summernote').summernote({
        height: 710,
        tabsize: 2,
        toolbar: [
  		    ['style', ['style']],
            ['font', ['bold', 'underline', 'clear']],
            ['fontname', ['fontname']],
            ['color', ['color']],
            ['para', [ 'paragraph']],
            ['insert', ['link', 'picture']],
            ['view', ['fullscreen', 'codeview']],
            ['custom', ['copyAll','save','reset','undoRest']]
  		  ],
        fontNames: [
            'Heiti SC','Microsoft Yahei','Arial','Helvetica Neue', 'Helvetica', 'Impact', 'Lucida Grande',
            'Tahoma', 'Times New Roman', 'Verdana'
          ],
        buttons: {
           reset: RestButton,
           undoRest: UndoRestButton,
           copyAll: CopyAllButton,
           save: SaveButton
        },
        codemirror: {
          mode: 'text/html',
          htmlMode: true,
          lineWrapping: true,
          lineNumbers: true,
          theme: 'monokai'
        },
        enterHtml:'<p><br></p>',
        callbacks: {
            onPaste: function(e) {
                 var markup = $('.summernote').summernote('code');
                 if(!markup.trim().endsWith('<p><br></p>')){
                     $('.summernote').summernote('code',markup+'<p><br></p>');
                 }
            }
        }

      });
    };

    var summerCallback = function () {
               
        $('.summernote').summernote({
        callbacks: {
            onPaste: function(e) {
            console.log('Called event paste');
            }
        }
        });

     
        $('.summernote').on('summernote.codeview', function(e) {
        console.log('Called event paste');
        });
    }
    
    $(document).ready(function() {
      
      initSummernote();



      addLinsteners();

    });
}(jQuery,window));