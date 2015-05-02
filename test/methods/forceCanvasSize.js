$(function () {

  'use strict';

  var $image = $(window.createCropperImage()),
      isNumber = function (n) {
        return typeof n === 'number' && !isNaN(n);
      };

  var forceCanvasSize = {
    width:1980,
    height:1080
  };

  $image.cropper({
    forceCanvasSize: forceCanvasSize,
    built: function ()
    {
      QUnit.test('forceCanvasSize: methods.setCropBoxData', function (assert)
      {
        var adjustWithRatio = true;
        var data = $image.cropper('setCropBoxData',
        {
          left: 50,
          top: 50,
          width: 100,
          height: 100
        }).cropper('getCropBoxData', adjustWithRatio);

        assert.ok($.isPlainObject(data));
        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));

        assert.equal(data.left, 50);
        assert.equal(data.top, 50);
        assert.equal(data.width, 100);
        assert.equal(data.height, 100);
      });

    }
  });

});
