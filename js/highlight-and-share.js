jQuery( document ).ready( function( $ ) {
	var has_remove = function() {
		$( '.has-tweet,.has-facebook' ).remove();
	};
	
	var has_load_html = function() {
		var html = '';
		if ( highlight_and_share.show_twitter ) {
			html += '<div class="has_tweet_template" style="display: none;"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><i class="fa fa-twitter"></i>&nbsp;' + highlight_and_share.tweet_text + '</a></div>';
		}
		if ( highlight_and_share.show_facebook ) {
			//Note, you must be on a publicly accesible URL to use this button
			html += '<div class="has_facebook_template" style="display: none;"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><i class="fa fa-facebook"></i>&nbsp;' + highlight_and_share.facebook_text + '</a></div>';
		}
		$( 'body' ).append( html );
	};
	
	//Initialize events
	var js_content = highlight_and_share.content;
	if ( '' == js_content ) return;
	$( 'body' ).on( 'mouseup', js_content, function( e ) {
		e.stopPropagation();
		has_remove();
		var selection = window.getSelection();
		var text = selection.toString();

		if ( '' == text ) {
			return;
		}
		var href = $( location ).attr( 'href' );
		var title = $( document ).attr( 'title' );
		if( highlight_and_share.show_twitter == true ) {
			has_tweet( text, href, e );
		}
		if( highlight_and_share.show_facebook == true ) {
			has_facebook( title, href, e );
		}
	} );
	$( 'body' ).on( 'click', '.has-tweet a', function( e ) {
		e.preventDefault();
		window.open( this.href,"tweetWindow","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has-facebook a', function( e ) {
		e.preventDefault();
	    window.open( this.href,"sharer","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	
	var has_tweet = function( text, link, e ) {
		if ( highlight_and_share.show_twitter == false ) return;
		
		//Get Twitter template and clone it
		var tweet_template = $( '.has_tweet_template' );
		var tweet_clone = tweet_template.clone();
		
		//Get template URL and replace with content - Format is https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%
		var tweet_url = tweet_clone.find( 'a' ).attr( 'href' );
		tweet_url = tweet_url.replace( '%url%', encodeURIComponent( link ) );
		tweet_url = tweet_url.replace( '%text%', '"' + encodeURIComponent( text ) + '"' );
		tweet_url = tweet_url.replace( '%username%', encodeURIComponent( highlight_and_share.twitter_username ) );
		
		//Override URL in clone
		tweet_clone.find( 'a' ).attr( 'href', tweet_url );
		
		//Adjust CSS
		tweet_clone.addClass( 'has-tweet' );
		tweet_clone.css( { position: 'absolute', display: 'block', left: e.pageX-30, top: e.pageY-70 } );
		
		//Add to document
		$( 'body' ).append( tweet_clone );		
	}; 
	var has_facebook = function( title, link, e ) {
		if ( highlight_and_share.show_facebook == false ) return;
		
		//Get Twitter template and clone it
		var facebook_template = $( '.has_facebook_template' );
		var facebook_clone = facebook_template.clone();
		
		//Get template URL and replace with content - Format is https://www.facebook.com/sharer/sharer.php?u=%url%
		var facebook_url = facebook_clone.find( 'a' ).attr( 'href' );
		facebook_url = facebook_url.replace( '%url%', encodeURIComponent( link ) );
		facebook_url = facebook_url.replace( '%title%', encodeURIComponent( title ) );
				
		//Override URL in clone
		facebook_clone.find( 'a' ).attr( 'href', facebook_url );
		
		//Get x coordinate of Facebook button
		var facebook_x = e.pageX - 30;
		if ( highlight_and_share.show_twitter ) {
			var twitter_width = $( '.has-tweet:visible' ).width() + 10;
			facebook_x = facebook_x + twitter_width;
		}
		
		//Adjust CSS
		facebook_clone.addClass( 'has-facebook' );
		if ( highlight_and_share.show_twitter == false ) {
			facebook_clone.addClass( 'has-no-twitter' );
		}
		facebook_clone.css( { position: 'absolute', display: 'block', left: facebook_x, top: e.pageY-70 } );
		
		//Add to document
		$( 'body' ).append( facebook_clone );
	}
	if ( highlight_and_share.show_twitter == true || highlight_and_share.show_facebook == true ) {
		has_load_html();
	}
} );