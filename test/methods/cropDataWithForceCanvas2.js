$(function () {

  'use strict';

  var $image = $(window.createCropperImage()),
      isNumber = function (n) {
        return typeof n === 'number' && !isNaN(n);
      };

  var $container = $image.parent();
  $container.height(446);
  $container.width(338);

  var forceCanvasSize = {
    width:446,
    height:338
  };
  var cropData = {
    left: 337,
    top: 0,
    width: 11,
    height: 100
  };

  $image.cropper({
    forceCanvasSize: forceCanvasSize,
    cropData: cropData,
    dblClickEnabled: false,
    minCropBoxWidth: 16,
    minCropBoxHeight: 16,
    zoomable: false,
    built: function ()
    {
      QUnit.test('forceCanvasSize2: cropData + getCropBoxData', function (assert)
      {
        var adjustWithRatio = true;
        var data = $image.cropper('getCropBoxData', adjustWithRatio);

        assert.ok($.isPlainObject(data));
        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));

        assert.equal(data.left, cropData.left);
        assert.equal(data.top, cropData.top);
        assert.equal(data.width, 16); // because minimum is 16
        assert.equal(data.height, cropData.height);
      });

      QUnit.test('forceCanvasSize2: cropData + setCropBoxData + getCropBoxData', function (assert)
      {
        var adjustWithRatio = true;
        var requestedPosition = {
          left: 51,
          top: 52,
          width: 101,
          height: 102
        };
        var data = $image.cropper('setCropBoxData', requestedPosition).cropper('getCropBoxData', adjustWithRatio);

        assert.ok($.isPlainObject(data));
        assert.ok(isNumber(data.left));
        assert.ok(isNumber(data.top));
        assert.ok(isNumber(data.width));
        assert.ok(isNumber(data.height));

        assert.equal(data.left, requestedPosition.left);
        assert.equal(data.top, requestedPosition.top);
        assert.equal(data.width, requestedPosition.width);
        assert.equal(data.height, requestedPosition.height);
      });

    }
  });

});
