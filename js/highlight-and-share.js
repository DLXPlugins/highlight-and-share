jQuery( document ).ready( function( $ ) {
	var has_remove = function() {
		$( '.highlight-and-share-wrapper:visible' ).remove();
		$('.has_sharing_email').css( 'display', 'none' );
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
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i>&nbsp;' + highlight_and_share.tweet_text + '</a></div>';
			} else {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i></a></div>';

			}
			
		} else if( highlight_and_share.show_twitter && '' == highlight_and_share.twitter_username ) {
			if ( highlight_and_share.icons == true ) {
				   html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i>&nbsp;' + highlight_and_share.tweet_text + '</a></div>';
			 } else {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i></a></div>'; 
			 }
		}
		if ( highlight_and_share.show_facebook ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				if ( '0' === highlight_and_share.facebook_app_id ) {
		 			html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><i class="' + highlight_and_share.facebook_fa_class + '"></i>&nbsp;' + highlight_and_share.facebook_text + '</a></div>';
				} else {
		 			html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' + highlight_and_share.facebook_app_id + '&display=popup&amp;quote=%text%&href=%url%" target="_blank"><i class="' + highlight_and_share.facebook_fa_class + '"></i>&nbsp;' + highlight_and_share.facebook_text + '</a></div>';
				}
				
			} else {
				 if ( '0' === highlight_and_share.facebook_app_id ) {
					html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/sharer/sharer.php?u=%url%&t=%title%" target="_blank"><i class="' + highlight_and_share.facebook_fa_class + '"></i></a></div>';
				  } else {
				  	html += '<div class="has_facebook" style="display: none;" data-type="facebook"><a href="https://www.facebook.com/dialog/share?app_id=' + highlight_and_share.facebook_app_id + '&display=popup&amp;quote=%text%&href=%url%" target="_blank"><i class="' + highlight_and_share.facebook_fa_class + '"></i></a></div>';
				  }
				
			}
		}
		if ( highlight_and_share.show_linkedin ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><i class="' + highlight_and_share.linkedin_fa_class + '"></i>&nbsp;' + highlight_and_share.linkedin_text + '</a></div>';
			} else {
				html += '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><i class="' + highlight_and_share.linkedin_fa_class + '"></i></a></div>';
			}
		}
		
		//={URI-encoded URL of the page to pin}&media={URI-encoded URL of the image to pin}&description={optional URI-encoded description}"
		if ( highlight_and_share.show_pinterest ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_pinterest" style="display: none;" data-type="pinterest"><a href="http://pinterest.com/pin/create/button/?url=%url%&description=%title%" target="_blank"><i class="' + highlight_and_share.pinterest_fa_class + '"></i>&nbsp;' + highlight_and_share.pinterest_text + '</a></div>';
			} else {
				html += '<div class="has_pinterest" style="display: none;" data-type="pinterest"><a href="http://pinterest.com/pin/create/button/?url=%url%&description=%title%" target="_blank"><i class="' + highlight_and_share.pinterest_fa_class + '"></i></a></div>';
			}
		}
		
		if ( highlight_and_share.show_xing ) {
			if ( highlight_and_share.icons == true ) {
				html += '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><i class="' + highlight_and_share.xing_fa_class + '"></i>&nbsp;' + highlight_and_share.xing_text + '</a></div>';
			} else {
				html += '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><i class="' + highlight_and_share.xing_fa_class + '"></i></a></div>';
			}
		}

		if ( highlight_and_share.show_whatsapp ) {
			if ( highlight_and_share.icons == true ) {
				html += '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="https://wa.me/?text=%text%' + ' - ' + highlight_and_share.from + ': ' + '%url%" target="_blank"><i class="' + highlight_and_share.whatsapp_fa_class + '"></i>&nbsp;' + highlight_and_share.whatsapp_text + '</a></div>';
			} else {
				html += '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="https://wa.me/?text=%text%' + ' - ' + highlight_and_share.from + ': ' + '%url%" target="_blank"><i class="' + highlight_and_share.whatsapp_fa_class + '"></i></a></div>';
			}
		}
		
		if ( highlight_and_share.show_email ) {
			if ( highlight_and_share.icons == true ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_email" style="display: none;" data-type="email"><a href="' + highlight_and_share.email_url + '" target="_blank"><i class="' + highlight_and_share.email_fa_class + '"></i>&nbsp;' + highlight_and_share.email_text + '</a></div>';
			} else {
				html += '<div class="has_email" style="display: none;" data-type="email"><a href="' + highlight_and_share.email_url + '" target="_blank"><i class="' + highlight_and_share.email_fa_class + '"></i></a></div>';
			}
			html += '<div class="has_sharing_email" style="display: none;">';
			html += '<div class="has_sharing_email_form_wrapper">';
			html += '<form action="" method="post" id="has_email_form" class="has_email_form">'; 
			html += '<input type="hidden" name="has_email_nonce" value="' + highlight_and_share.nonce + '" />';
			html += '<label for="has_target_email">' + highlight_and_share.email_send_email + '</label>';
			html += '<input type="email" name="has_target_email" id="has_target_email" />';
			html += '<label for="has_source_name">' + highlight_and_share.email_your_name + '</label>';
			html += '<input type="text" name="has_source_name" id="has_source_name" value="' + highlight_and_share.email_your_name_value + '" />';
			html += '<label for="has_email_subject">' + highlight_and_share.email_subject  + '</label>';
			html += '<input type="text" class="has_email_subject" name="has_email_subject" id="has_email_subject" value="' + highlight_and_share.email_subject_text + '" />';
			html += '<label for="has_source_email">' + highlight_and_share.email_from + '</label>';
			html += '<input type="email" name="has_source_email" id="has_source_email" value="' + highlight_and_share.email_from_value + '" />';
			html += '<input type="hidden" name="has_source_title" class="has_source_title" value="%title%" />';
			html += '<input type="hidden" name="has_source_url" class="has_source_url" value="%url%" />';
			html += '<input type="hidden" name="has_ajax_action" value="has_form_submission" />';
			html += '<input type="submit" value="' + highlight_and_share.email_send + '" class="has_sharing_send" id="has_sharing_send" />';
			html += '<a rel="nofollow" href="#cancel" class="has_sharing_cancel" id="has_sharing_cancel" style="display: inline;">' + highlight_and_share.email_cancel + '</a>';
			html += '<img style="float:right; display: none;" class="has_sharing_loading" src="' +  highlight_and_share.email_loading + '" />';
			html += '<div class="has_errors" style="display: none"></div>';
			html += '</form>';
			html += '</div><!-- .has_sharing_email_form_wrapper -->';
			html += '<div class="has_success_response" style="display: none;">';
			html += '<div class="has_success_resposne_title">';
			html +=	'</div><!-- .has_success_resposne_title -->';
			html += '<div class="has_success_response_body">';
			html += '</div><!-- .has_success_response_body -->';
			html += '<div class="has_success_response_close">'
			html += '<a rel="nofollow" href="#cancel" class="has_sharing_cancel" id="has_sharing_cancel" style="display: inline;">' + highlight_and_share.email_close + '</a>';
			html += '</div><!-- .has_success_response_close -->';
			html += '</div><!-- .has_success_response -->'

			html += '</div><!-- #has_sharing_email -->';
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
	$( 'body' ).on( 'click', '.has_xing a', function( e ) {
		e.preventDefault();
		window.open( this.href,"xing","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_whatsapp a', function( e ) {
		e.preventDefault();
		this.href = this.href.replace( '%text%', encodeURIComponent( has_selected_text ) );
		window.open( this.href,"whatsapp","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_email a', function( e ) {
		e.preventDefault();
		var $emails = $('.has_sharing_email');
		var $top = $(this).parent();
		$emails.css( 'left', $top.position().left + 'px' );
		$emails.css( 'top', $top.position().top + $top.height() + 3 + 'px' );
		$emails.slideToggle( 200 );
	} );

	// Email Cancel
	$( 'body' ).on( 'click', 'a.has_sharing_cancel', function( e ) {
		var $emails = $('.has_sharing_email:last');
		var $errors = $emails.find('.has_errors');
		$emails.find('.has_sharing_loading').css( 'display', 'none' );
		$emails.find('.has_sharing_send').val( highlight_and_share.email_send ).prop( 'disabled', false );
		$errors.css( 'display', 'none' );
		$emails.slideToggle( 200, function() {
				$emails.find('.has_success_response').css( 'display', 'none' );
				$emails.find( '.has_sharing_email_form_wrapper' ).css( 'display', 'block' );
		} );
	} );

	// Email Send
	$( 'body' ).on( 'click', 'input.has_sharing_send', function( e ) {
		
		e.preventDefault();
		
		var $emails = $('.has_sharing_email:last');
		var $errors = $emails.find('.has_errors');
		$emails.find('.has_sharing_loading').css( 'display', 'none' );
		$errors.css( 'display', 'none' );

		// Check subject
		var subject = $emails.find('#has_email_subject').val().trim();
		if ( '' == subject ) {
			$errors.html( highlight_and_share.email_subject_error );
			$errors.slideDown();
			return;
		}

		// Check Send to Email Address
		var emails_to = $emails.find('#has_target_email').val().trim();
		if( '' == emails_to ) {
			$errors.html( highlight_and_share.email_email_to );
			$errors.slideDown();
			return;
		}

		// Check From Email Address
		var emails_from = $emails.find('#has_source_email').val().trim();
		if( '' == emails_from ) {
			$errors.html( highlight_and_share.email_email_from );
			$errors.slideDown();
			return;
		}

		// Check Name
		var emails_name = $emails.find('#has_source_name').val().trim();
		if( '' == emails_name ) {
			$errors.html( highlight_and_share.email_email_name );
			$errors.slideDown();
			return;
		}

		// Everything is fine, show loading icon
		$emails.find('.has_sharing_loading').css( 'display', 'block' );

		// Show sending icon and disable it
		$sending_button = $emails.find('.has_sharing_send');
		$sending_button.val( highlight_and_share.email_sending );
		$sending_button.prop( 'disabled', true );

		// Serialize data
		var form_data = $emails.find('#has_email_form').serialize();

		// Send Ajax data
		$.post( highlight_and_share.ajax_url, { data: form_data, action: 'has_form_submission' }, function( response ) {
			if( response.errors ) {
				$errors.html( response.message );
				$errors.slideDown();
				$sending_button.val( highlight_and_share.email_send );
				$sending_button.prop( 'disabled', false );
				$emails.find('.has_sharing_loading').css( 'display', 'none' );
			} else {
				$emails.find( '.has_sharing_email_form_wrapper' ).css( 'display', 'none' );
				$emails.find( '#has_target_email' ).val('');
				$emails.find( '#has_source_name' ).val( response.message_source_name );
				$emails.find( '#has_email_subject' ).val( response.message_subject );
				$emails.find( '#has_source_email' ).val( response.message_source_email );
				$emails.find( '.has_success_resposne_title' ).html( response.message_title );
				$emails.find( '.has_success_response_body' ).html( response.message_body );
				$emails.find( '.has_success_response' ).css( 'display', 'block' );
			}			
		}, 'json' );

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
		
		wrapper_clone = $( '.highlight-and-share-wrapper:last' ).clone();
		var wrapper_x = e.pageX - 30;
		var wrapper_y = e.pageY - 70;
		if ( highlight_and_share.mobile ) {
			wrapper_x = e.pageX;	
			wrapper_y = e.pageY + 20;
		}
		
		wrapper_clone.css( { position: 'absolute', display: 'block', left: wrapper_x, top: wrapper_y, width: 'auto', height: 'auto', 'z-index': 10000 } );
		
		$children = wrapper_clone.find( '.has_whatsapp, .has_xing, .has_pinterest, .has_linkedin, .has_facebook, .has_twitter, .has_email' );
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

		// For hidden elements in the Email Send
		$has_email_children = wrapper_clone.find( '.has_source_title, .has_source_url' );
		$.each( $has_email_children, function( index, item ) {
			var $input = $( this );
			var input_val = $input.val();
			input_val = input_val.replace( '%url%', encodeURIComponent( link ) );
			input_val = input_val.replace( '%title%', encodeURIComponent( title ) );
			$input.val( input_val );
		} );
		// For the subject
		$has_subject = wrapper_clone.find( '.has_email_subject' );
		$.each( $has_subject, function( index, item ) {
			var $input = $( this );
			var input_val = $input.val();
			input_val = input_val.replace( '%title%', title );
			$input.val( input_val );
		} );
				
		//Add to document
		$( 'body' ).append( wrapper_clone );	
	};
	if ( highlight_and_share.show_twitter == true || highlight_and_share.show_facebook == true || highlight_and_share.show_linkedin == true || highlight_and_share.show_pinterest == true || highlight_and_share.show_email == true) {
		has_load_html();
	}
} );
