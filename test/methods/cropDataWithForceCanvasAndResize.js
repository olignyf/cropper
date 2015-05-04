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
      QUnit.test('forceCanvasSize: cropData + resize should have no effect on data', function (assert)
      {
        var adjustWithRatio = true;

        $container.height(446);
        $container.width(338 * 2);

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

    }
  });

});
