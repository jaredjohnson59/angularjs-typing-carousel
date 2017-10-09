angular.module('typingCarousel', [])

		.directive('typingCarousel', function () {
			   return {
					restrict: 'E',
					link: function (scope, elm, attrs, ctrl) {
						var words = scope.$eval(attrs.words);
						var period = scope.$eval(attrs.period);
						
						var TxtRotate = function(el, toRotate, period) {
						  this.toRotate = toRotate;
						  this.el = el;
						  this.loopNum = 0;
						  this.period = parseInt(period, 10) || 2000;
						  this.txt = '';
						  this.tick();
						  this.isDeleting = false;
						};

							TxtRotate.prototype.tick = function() {
							  var i = this.loopNum % this.toRotate.length;
							  var fullTxt = this.toRotate[i];

							  if (this.isDeleting) {
								this.txt = fullTxt.substring(0, this.txt.length - 1);
							  } else {
								this.txt = fullTxt.substring(0, this.txt.length + 1);
							  }

								
							if(this.el){
								this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';
							}

							  var that = this;
							  var delta = 300 - Math.random() * 100;

							  if (this.isDeleting) { delta /= 2; }

							  if (!this.isDeleting && this.txt === fullTxt) {
								delta = this.period;
								this.isDeleting = true;
							  } else if (this.isDeleting && this.txt === '') {
								this.isDeleting = false;
								this.loopNum++;
								delta = 500;
							  }

							  setTimeout(function() {
								that.tick();
							  }, delta);
							};

								var elements = document.getElementsByClassName('txt-rotate');
							  for (var i=0; i< words.length; i++) {
								if (words) {
								  new TxtRotate(elements[i], JSON.parse(attrs.words), period);
								}
							  }
							  // INJECT CSS
							  var css = document.createElement("style");
							  css.type = "text/css";
							  css.innerHTML = ".txt-rotate > .wrap { border-right: 0.08em solid #666 }";
							  document.body.appendChild(css);
							
						
					},
						template:
						'<h1>This pen is <span class="txt-rotate"></span></h1>',
				}
		})