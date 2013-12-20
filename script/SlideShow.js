/*!
 By Author: Samuel Bamgboye |  Senior Front-End Developer
 This Library depends on no other library as specified by the question



        Create a div with an id of 'ntstest' containing five images,
        the first of which is shown and the others are hidden using a display
        style of none. Using Javascript, create a simple slideshow that cycles
        through the images, displaying each image for four seconds at a time,
        looping back to the first image when the end is reached. You cannot use
        jQuery or any other library.



 */

/**********
The ImageSlider Library
***********/
(function(win) {
/**********
core object representing the image slider
***********/

    var slideShow = function(imageIdList, duration, onNextImage) {
        slideShow.prototype.imageIdList = imageIdList || [];
        slideShow.prototype.lib.duration = duration;
        slideShow.prototype.lib.onNextImage = onNextImage;
    };

    var pSlideShow = slideShow.prototype;

    pSlideShow.lib = {
        duration: 1000,
        onNextImage: function() {
        },
        visible: "visibleImage",
        invisible: "hiddenImage",
        /**********
simplistic dom manipulation object
***********/
        dom: function(id) {
            this.dom.mamoir = this.dom.mamoir || [];
/**********
just a little optimization to prevent dom access query every time
***********/
            var element = this.dom.mamoir[id] || document.getElementById(id);
            return {
                Class: function(className) {
                    element.className = className || " ";
                    return this;
                },
                hasClass: function(className) {
                    return element.className === className;
                }
            };
        },

        startSlider: function() {
            var context = this;
/**********
invoking the start process
***********/
            setInterval(function() {
                context.move();
            }, this.duration);
        },
        move: function() {
            var imageIds = pSlideShow.imageIdList;
            var imageIdsLength = imageIds.length;
            var nextImage = "";
            for (var i = 0; i < imageIdsLength; i++) {
                if (this.dom(imageIds[i]).hasClass(this.visible)) {
/**********
save next image reference until after loop is complete
***********/
                    nextImage = imageIds[i + 1 === imageIdsLength ? 0 : i + 1];
                    this.dom(imageIds[i]).Class(this.invisible);
                }
            }
            nextImage && this.dom(nextImage).Class(this.visible);
            //call the callback
            this.onNextImage(nextImage || 0);
        },
        show: function(id) {
/**********
look into css class for visibility
***********/
            this.dom(id).Class(this.visible);
        },
        hide: function() {
/**********
look into css class for invisibility
***********/
            this.dom(id).Class(this.invisible);
        }
    };

/**********
set a global power constructor. this is where we name our library 'ImageSlider'
***********/
    win.ImageSlider = function(imageIdList, duration, onNextImage) {
        if (imageIdList instanceof Array) {
            return new slideShow(imageIdList, duration || 1000, onNextImage || function() {
            });
        } else {
/**********
   just a little check to prevent wrong user imput to api
***********/
            throw "Error Defining Images: You must supply an array of image list";
        }
    };
})(window);
