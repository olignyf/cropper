  prototype.load = function (url) {
    var options = this.options,
        $this = this.$element,
        crossOrigin,
        bustCacheUrl,
        buildEvent,
        $clone;

    if (!url) {
      if ($this.is('img')) {
        if (!$this.attr('src')) {
          return;
        }

        url = $this.prop('src');
      } else if ($this.is('canvas') && SUPPORT_CANVAS) {
        url = $this[0].toDataURL();
      }
    }

    if (!url) {
      return;
    }

    buildEvent = $.Event(EVENT_BUILD);
    $this.one(EVENT_BUILD, options.build).trigger(buildEvent); // Only trigger once

    if (buildEvent.isDefaultPrevented()) {
      return;
    }

    if (options.checkImageOrigin && isCrossOriginURL(url)) {
      crossOrigin = 'anonymous';

      if (!$this.prop('crossOrigin')) { // Only when there was not a "crossOrigin" property
        bustCacheUrl = addTimestamp(url); // Bust cache (#148)
      }
    }

    if (this.options.forceCanvasSize !== null)
    {
      this.$clone = $clone = $('<div>');
      this.$clone.width(this.options.forceCanvasSize.width);
      this.$clone.height(this.options.forceCanvasSize.height);
      this.$clone.addClass(CLASS_IMG_REPLACEMENT);

      this.image = {
        naturalWidth: this.options.forceCanvasSize.width,
        naturalHeight: this.options.forceCanvasSize.height,
        aspectRatio: this.options.forceCanvasSize.width / this.options.forceCanvasSize.height,
        rotate: 0
      };

      this.ready = true;
      this.build();
    }
    else
    {
      this.$clone = $clone = $('<img>');

      $clone.one('load', $.proxy(function () {
        var naturalWidth = $clone.prop('naturalWidth') || $clone.width(),
            naturalHeight = $clone.prop('naturalHeight') || $clone.height();

        this.image = {
          naturalWidth: naturalWidth,
          naturalHeight: naturalHeight,
          aspectRatio: naturalWidth / naturalHeight,
          rotate: 0
        };

        this.url = url;
        this.ready = true;
        this.build();
      }, this)).one('error', function () {
        $clone.remove();
      }).attr({
        crossOrigin: crossOrigin, // "crossOrigin" must before "src" (#271)
        src: bustCacheUrl || url
      });
    }
    // Hide and insert into the document
    $clone.addClass(CLASS_HIDE).insertAfter($this);
  };
