/**
 * Video Scene Selector v0.1
 * Video Scene Selector - released under MIT License 
 * Author: Jesus Sayar <xuxoceleste@gmail.com>
 * Web: www.jesussayar.com
 * https://github.com/jesus-sayar/video_scene_selector
 * Copyright (c) 2013 Jesus Sayar Celestino {{{
 *
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 *
 * }}}
 */

(function($) {
  // Plugin definition
  $.fn.vScene = function(options) {   

    // Build main options before element iteration    
    var defaults = {
      onSelect: function() {},
      onChange: function() {}
    };

    var options = $.extend(defaults, options);
    // Iterate and reformat each matched element
    return this.each(function() {
      var $vScene = $(this);

      //Create html structure
      //main wrapper
      var $video_wrap = $('<section id="video_screen"><div class="row"><div class="span12"></div></div></section>');
      $vScene.wrap($video_wrap);
      //controls wraper
      var $video_screen = $('#video_screen');
      var $video_controls = $('<section id="video_controls"><div class="row"><div class="span2"><button id="preview" class="btn btn-success">Preview</button><button id="select" class="btn btn-success">Select</button></div><div class="span10"><div id="scene"></div></div></div></section>');            
      
      $video_screen.after($video_controls);

      var inpoint = 0;
      var outpoint = $vScene.duration;
      var video = $vScene[0];

      if (video) {
        video.addEventListener("loadedmetadata", videoMetadataUpdated, false);
      }

      function videoMetadataUpdated() {
        $("#scene").rangeSlider({
          bounds: {min: 0, max: video.duration},
          defaultValues: {min: 0, max: video.duration},
          step: 1,
          arrows: true
        });

        $("#scene").on("valuesChanging", function(e, data){
          seekSliderSlide(e, data);
        });

        $("#scene").on("valuesChanged", function(e, data){
          seekSliderStop(e, data);
        });

        var basicSliderBounds = $("#scene").rangeSlider("bounds");
        $( "#inpoint_outpoint" ).val(basicSliderBounds.min + " - " + basicSliderBounds.max);
        $( "#duration" ).val(basicSliderBounds.max - basicSliderBounds.min);
      }

      function seekSliderSlide(e, data) {
          if (video) {
            if(inpoint != data.values.min){
              video.currentTime = data.values.min;
            } else if (outpoint != data.values.max){
              video.currentTime = data.values.max;   
            }
            
          }
        $( "#inpoint_outpoint" ).val(data.values.min + " - " + data.values.max);
        $( "#duration" ).val(data.values.max - data.values.min);
      }

      function seekSliderStop(e, data) {
          seekSliderSlide(event, data);
          inpoint = data.values.min;
          outpoint = data.values.max;
          defaults.onChange.call(null, inpoint, outpoint);
          if (!video.paused && !video.ended){
            playInOut(inpoint, outpoint);
          }
      }

      // Controls
      $('#preview').click(function(){
        playInOut(inpoint, outpoint);
      });
      $('#select').click(function(){
        defaults.onSelect.call(null, inpoint, outpoint);
      });

      var pauseTargetTime = null;
      var pauseTimeoutId = null;
      function playInOut(inpoint, outpoint) {
          if (video.paused || video.ended) {
              video.currentTime = inpoint;
              video.play();
              pauseTargetTime = outpoint;
              console.log("inpoint: " + inpoint);
              console.log("outpoint: " + outpoint);
              pauseTimeoutId = setTimeout(checkOutpointReached, 200);
          } else {
             video.pause();
          }
          updatePlayPause();
      }

      function checkOutpointReached() {
          if (pauseTargetTime != null) {
              if (video) {
                  if (video.currentTime >= pauseTargetTime) {
                      video.pause();
                      pauseTimeoutId = null;
                  } else {
                      pauseTimeoutId = setTimeout(checkOutpointReached, 200);
                  }
              }
          }
      }
      
      function updatePlayPause(){
        if (video.paused || video.ended){
          $('#preview').html("Preview");
        } else {
          $('#preview').html("Pause");
        }
      }
      
      //$vScene.removeAttr('controls');
      
    });
  };

  //
  // plugin defaults
  //
  $.fn.vScene.defaults = {    
  };

})(jQuery);