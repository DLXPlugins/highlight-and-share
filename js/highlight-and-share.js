jQuery( document ).ready( function( $ ) {
	var has_remove = function() {
		$( '.highlight-and-share-wrapper:visible' ).remove();
	};
	
	var has_selected_text = '';
	
	var has_load_html = function() {
		if ( highlight_and_share.icons == true ) {
			var html = '<div class="highlight-and-share-wrapper" style="display: none">d';
		} else {
			var html = '<div class="highlight-and-share-wrapper has-icons" style="display: none">d';
		}
		var html = '<div class="highlight-and-share-wrapper">';
		if ( highlight_and_share.show_twitter && '' != highlight_and_share.twitter_username ) {
			if ( highlight_and_share.icons == true ) {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><i class="fa fa-twitter"></i>&nbsp;' + highlight_and_share.tweet_text + '</a></div>';
			} else {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><i class="fa fa-twitter"></i></a></div>';

			}
			
		} else if( highlight_and_share.show_twitter && '' == highlight_and_share.twitter_username ) {
			if ( highlight_and_share.icons == true ) {
				   html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><i class="fa fa-twitter"></i>&nbsp;' + highlight_and_share.tweet_text + '</a></div>';
			 } else {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><i class="fa fa-twitter"></i></a></div>'; 
			 }
		}
		if ( highlight_and_share.show_facebook ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				if ( '0' === highlight_and_share.facebook_app_id ) {
		 			html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><i class="fa fa-facebook"></i>&nbsp;' + highlight_and_share.facebook_text + '</a></div>';
				} else {
		 			html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' + highlight_and_share.facebook_app_id + '&display=popup&amp;quote=%text%&href=%url%" target="_blank"><i class="fa fa-facebook"></i>&nbsp;' + highlight_and_share.facebook_text + '</a></div>';
				}
				
			} else {
				 if ( '0' === highlight_and_share.facebook_app_id ) {
					html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><i class="fa fa-facebook"></i></a></div>';
				  } else {
				  	html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' + highlight_and_share.facebook_app_id + '&display=popup&amp;quote=%text%&href=%url%" target="_blank"><i class="fa fa-facebook"></i></a></div>';
				  }
				
			}
		}
		if ( highlight_and_share.show_linkedin ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><i class="fa fa-linkedin"></i>&nbsp;' + highlight_and_share.linkedin_text + '</a></div>';
			} else {
				html += '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><i class="fa fa-linkedin"></i></a></div>';
			}
		}
		
		//={URI-encoded URL of the page to pin}&media={URI-encoded URL of the image to pin}&description={optional URI-encoded description}"
		if ( highlight_and_share.show_pinterest ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_pinterest" style="display: none;" data-type="pinterest"><a href="http://pinterest.com/pin/create/button/?url=%url%&description=%title%" target="_blank"><i class="fa fa-pinterest"></i>&nbsp;' + highlight_and_share.pinterest_text + '</a></div>';
			} else {
				html += '<div class="has_pinterest" style="display: none;" data-type="pinterest"><a href="http://pinterest.com/pin/create/button/?url=%url%&description=%title%" target="_blank"><i class="fa fa-pinterest"></i></a></div>';
			}
		}
		
		if ( highlight_and_share.show_email ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_email" style="display: none;" data-type="email"><a href="' + highlight_and_share.email_url + '" target="_blank"><i class="fa fa-envelope"></i>&nbsp;' + highlight_and_share.email_text + '</a></div>';
			} else {
				html += '<div class="has_email" style="display: none;" data-type="email"><a href="' + highlight_and_share.email_url + '" target="_blank"><i class="fa fa-envelope"></i></a></div>';
			}
		}
		
		html += '</div><!-- #highlight-and-share-wrapper -->';
		$( 'body' ).append( html );
	};
	
	//Initialize events
	var js_content = highlight_and_share.content;
	if ( '' == js_content ) return;
	$( 'body' ).on( 'mouseup vmouseup', js_content, function( e ) {
		e.stopPropagation();
		has_remove();
		var selection = window.getSelection();
		var text = selection.toString();
		var title = '';

		if ( '' == text ) {
			return;
		}
		
		//Get URL
		var href = $( this ).attr( 'data-url' );
		if (typeof href == typeof undefined || href == false) {
			href = $( location ).attr( 'href' );
		}
		
		//Get Title
		var title = $( this ).attr( 'data-title' );
		if (typeof title == typeof undefined || title == false) {
			title = $( document ).attr( 'title' );
		}
		
		has_display( text, title, href, e );
	} );
	
	$( 'body' ).on( 'mousedown vmousedown', function( e ) {
		has_get_selection();
	} );
	document.addEventListener("selectionchange", function() {
		has_get_selection();
	}, false);

	$( 'body' ).on( 'click', '.has_twitter a', function( e ) {
		e.preventDefault();
		this.href = this.href.replace( '%text%', encodeURIComponent( has_selected_text ) );
		window.open( this.href,"tweethighlight","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
		return false;
	} );
	$( 'body' ).on( 'click', '.has_facebook a', function( e ) {
		e.preventDefault();
		this.href = this.href.replace( '%text%', encodeURIComponent( has_selected_text ) );
		window.open( this.href,"sharer","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_linkedin a', function( e ) {
		e.preventDefault();
	window.open( this.href,"linkedin","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_pinterest a', function( e ) {
		e.preventDefault();
	window.open( this.href,"pinterest","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_email a', function( e ) {
		e.preventDefault();
	window.open( this.href,"email","width=350,height=300,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	
	var has_get_selection = function() {
		var selection = window.getSelection();
		var text = selection.toString();
		if ( '' == text ) {
			return;
		} else {
			has_selected_text = text;
		}
	};
	
	var has_display = function( text, title, link, e ) {
		if ( false == highlight_and_share.show_twitter && false == highlight_and_share.show_facebook && false == highlight_and_share.show_linkedin && false == highlight_and_share.show_pinterest && false == highlight_and_share.show_email ) {
			return;
		}
		
		wrapper_clone = $( '.highlight-and-share-wrapper' ).clone();
		var wrapper_x = e.pageX - 30;
		var wrapper_y = e.pageY - 70;
		if ( highlight_and_share.mobile ) {
			wrapper_x = e.pageX;	
			wrapper_y = e.pageY + 20;
		}
		
		wrapper_clone.css( { position: 'absolute', display: 'block', left: wrapper_x, top: wrapper_y, width: 'auto', height: 'auto', 'z-index': 1000 } );
		
		$children = wrapper_clone.find( 'div' );
		$.each( $children, function( index, item ) {
			var div = $( this );
			var url = div.find( 'a' ).attr( 'href' );
			url = url.replace( '%url%', encodeURIComponent( link ) );
			url = url.replace( '%username%', encodeURIComponent( highlight_and_share.twitter_username ) );
			url = url.replace( '%title%', encodeURIComponent( title ) );
			div.find( 'a' ).attr( 'href', url );
			var css_class = div.attr( 'class' );
			wrapper_clone.find( '.' + css_class ).attr( 'style', 'display: inline-block' ).html( div.html() );
			
		} );
				
		//Add to document
        setTimeout(function(){ $( 'body' ).append( wrapper_clone ); }, 100);
	};
	if ( highlight_and_share.show_twitter == true || highlight_and_share.show_facebook == true || highlight_and_share.show_linkedin == true || highlight_and_share.show_pinterest == true || highlight_and_share.show_email == true) {
		has_load_html();
	}
} );
