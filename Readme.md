# Video Scene Selector

HTML5 video editor for select scenes. It use a range slider to choose the scenes of a video and get the start and end seconds.

# Features

+ HTML5
+ Supports touch devices
+ Adapt to your style

## Dependencies

+ jQuery
+ jQuery UI
+ jQRangeSlider
+ Bootstrap

# Quick Start

``` html
  <link href="../video_scene_selector.css" rel="stylesheet" type="text/css"> 
  <script src="../video_scene_selector.js"></script> 

  <script>
    $(function() {
      $('#my_video').vScene({
        onChange: function (start, end) {
          console.log("Start: " + start + " End: " + end);
        },
        onSelect: function (start, end) {
          console.log("Start: " + start + " End: " + end);
        }
      });
    });
  </script>

  <body>
    <div class="container">
      <video controls="controls" id="my_video">
        <source src="http://devfiles.myopera.com/articles/2642/sintel-trailer.ogv" type='video/ogg; codecs="theora, vorbis"'>
      </video>
     </div>
  </body>
```

##Documentation

*None of the parameters is mandatory.*

###Callbacks

<table>
  <tbody>
    <tr>
      <td>Name</td>
      <td>Values</td>
      <td>Description</td>
    </tr>
    <tr>
      <td>
        <strong>onChange</strong>
      </td>
      <td>
        <em>function (start, end) {}</em>
      </td>
      <td>
        <p>This function is called every time the scene changes its start or end seconds.</p>
      </td>
    </tr>
    <tr>
      <td>
        <strong>onSelect</strong>
      </td>
      <td>
        <em>function (start, end) {}</em>
      </td>
      <td>
        <p>This function is called when the user clicks the select button.</p>
      </td>
    </tr>
  </tbody>
</table>

## License

Copyright : Jesus Sayar Celestino 2013
License : MIT
