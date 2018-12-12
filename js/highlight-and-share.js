jQuery( document ).ready( function( $ ) {
	var has_remove = function() {
		$( '.highlight-and-share-wrapper:visible' ).remove();
		$('.has_sharing_email').css( 'display', 'none' );
	};

	var title = '';
	var link = '';
	var href = '';

	var has_selected_text = '';

	var has_load_html = function() {
		if ( highlight_and_share.icons == false ) {
			var html = '<div class="highlight-and-share-wrapper" style="display: none">';
		} else {
			var html = '<div class="highlight-and-share-wrapper has-icons" style="display: none">';
		}
		var html = '<div class="highlight-and-share-wrapper">';
		if ( highlight_and_share.show_twitter && '' != highlight_and_share.twitter_username ) {
			if ( highlight_and_share.icons == false ) {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i>&nbsp;' + highlight_and_share.tweet_text + '</a></div>';
			} else {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?via=%username%&url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i></a></div>';

			}

		} else if( highlight_and_share.show_twitter && '' == highlight_and_share.twitter_username ) {
			if ( highlight_and_share.icons == false ) {
				   html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i>&nbsp;' + highlight_and_share.tweet_text + '</a></div>';
			 } else {
				html += '<div class="has_twitter" style="display: none;" data-type="twitter"><a href="https://twitter.com/intent/tweet?url=%url%&text=%text%" target="_blank"><i class="' + highlight_and_share.twitter_fa_class + '"></i></a></div>';
			 }
		}
		if ( highlight_and_share.show_facebook ) {
			if ( highlight_and_share.icons == false ) {
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
			if ( highlight_and_share.icons == false ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><i class="' + highlight_and_share.linkedin_fa_class + '"></i>&nbsp;' + highlight_and_share.linkedin_text + '</a></div>';
			} else {
				html += '<div class="has_linkedin" style="display: none;" data-type="linkedin"><a href="https://www.linkedin.com/shareArticle?mini=true&url=%url%&title=%title%" target="_blank"><i class="' + highlight_and_share.linkedin_fa_class + '"></i></a></div>';
			}
		}

		//={URI-encoded URL of the page to pin}&media={URI-encoded URL of the image to pin}&description={optional URI-encoded description}"
		if ( highlight_and_share.show_pinterest ) {
			if ( highlight_and_share.icons == false ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_pinterest" style="display: none;" data-type="pinterest"><a href="http://pinterest.com/pin/create/button/?url=%url%&description=%title%" target="_blank"><i class="' + highlight_and_share.pinterest_fa_class + '"></i>&nbsp;' + highlight_and_share.pinterest_text + '</a></div>';
			} else {
				html += '<div class="has_pinterest" style="display: none;" data-type="pinterest"><a href="http://pinterest.com/pin/create/button/?url=%url%&description=%title%" target="_blank"><i class="' + highlight_and_share.pinterest_fa_class + '"></i></a></div>';
			}
		}

		if ( highlight_and_share.show_xing ) {
			if ( highlight_and_share.icons == false ) {
				html += '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><i class="' + highlight_and_share.xing_fa_class + '"></i>&nbsp;' + highlight_and_share.xing_text + '</a></div>';
			} else {
				html += '<div class="has_xing" style="display: none;" data-type="xing"><a href="https://www.xing.com/spi/shares/new?url=%url%" target="_blank"><i class="' + highlight_and_share.xing_fa_class + '"></i></a></div>';
			}
		}

		if ( highlight_and_share.show_whatsapp ) {
			if ( highlight_and_share.icons == false ) {
				html += '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="https://wa.me/?text=%text%' + ' - ' + highlight_and_share.from + ': ' + '%url%" target="_blank"><i class="' + highlight_and_share.whatsapp_fa_class + '"></i>&nbsp;' + highlight_and_share.whatsapp_text + '</a></div>';
			} else {
				html += '<div class="has_whatsapp" style="display: none;" data-type="whatsapp"><a href="https://wa.me/?text=%text%' + ' - ' + highlight_and_share.from + ': ' + '%url%" target="_blank"><i class="' + highlight_and_share.whatsapp_fa_class + '"></i></a></div>';
			}
		}

		if ( highlight_and_share.show_email ) {
			if ( highlight_and_share.icons == false ) {
				//Note, you must be on a publicly accesible URL to use this button
				html += '<div class="has_email" style="display: none;" data-type="email" data-title="%title%" data-url="%url%"><a href="' + highlight_and_share.ajax_url + '" target="_blank"><i class="' + highlight_and_share.email_fa_class + '"></i>&nbsp;' + highlight_and_share.email_text + '</a></div>';
			} else {
				html += '<div class="has_email" style="display: none;" data-type="email" data-title="%title%" data-url="%url%"><a href="' + highlight_and_share.ajax_url + '" target="_blank"><i class="' + highlight_and_share.email_fa_class + '"></i></a></div>';
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
		this.title = '';

		if ( '' == text ) {
			return;
		}

		//Get URL
		this.href = $( this ).attr( 'data-url' );
		if (typeof href == typeof undefined || href == false) {
			this.href = $( location ).attr( 'href' );
		}

		//Get Title
		this.title = $( this ).attr( 'data-title' );
		if (typeof this.title == typeof undefined || this.title == false) {
			this.title = $( document ).attr( 'title' );
		}

		has_display( text, this.title, this.href, e );
	} );

	$( 'body' ).on( 'mousedown vmousedown', function( e ) {
		has_get_selection();
	} );
	document.addEventListener("selectionchange", function() {
		has_get_selection();
	}, false);

	$( 'body' ).on( 'click', '.has_twitter a', function( e ) {
		e.preventDefault();
		if( highlight_and_share.customizer_preview ) {
			return;
		}
		this.href = this.href.replace( '%text%', encodeURIComponent( has_selected_text ) );
		window.open( this.href,"tweethighlight","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
		return false;
	} );
	$( 'body' ).on( 'click', '.has_facebook a', function( e ) {
		e.preventDefault();
		if( highlight_and_share.customizer_preview ) {
			return;
		}
		this.href = this.href.replace( '%text%', encodeURIComponent( has_selected_text ) );
		window.open( this.href,"sharer","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_linkedin a', function( e ) {
		e.preventDefault();
		if( highlight_and_share.customizer_preview ) {
			return;
		}
		window.open( this.href,"linkedin","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_pinterest a', function( e ) {
		e.preventDefault();
		if( highlight_and_share.customizer_preview ) {
			return;
		}
		window.open( this.href,"pinterest","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_xing a', function( e ) {
		e.preventDefault();
		if( highlight_and_share.customizer_preview ) {
			return;
		}
		window.open( this.href,"xing","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_whatsapp a', function( e ) {
		e.preventDefault();
		if( highlight_and_share.customizer_preview ) {
			return;
		}
		this.href = this.href.replace( '%text%', encodeURIComponent( has_selected_text ) );
		window.open( this.href,"whatsapp","width=575,height=430,toolbar=false,menubar=false,location=false,status=false");
		has_remove();
	} );
	$( 'body' ).on( 'click', '.has_email a', function( e ) {
		e.preventDefault();
		if( highlight_and_share.customizer_preview ) {
			return;
		}
		//Get URL
		var data_href = decodeURIComponent( $( this ).parent().attr( 'data-url' ) );

		//Get Title
		var data_title = decodeURIComponent( $( this ).parent().attr( 'data-title' ) );
		if( typeof data_title == "undefined" ) {
			data_title = '';
		}
		if( typeof data_href == "undefined" ) {
			data_href = window.location.title;
		}
		var subject = highlight_and_share.email_subject_text;
		subject = subject.replace( '%title%', data_title );
		var html = '';
		html += '<div class="has_sharing_email">';
		html += '<div class="has_sharing_email_form_wrapper">';
		html += '<form action="" method="post" id="has_email_form" class="has_email_form">';
		html += '<input type="hidden" name="has_email_nonce" value="' + highlight_and_share.nonce + '" />';
		html += '<label for="has_target_email">' + highlight_and_share.email_send_email + '</label>';
		html += '<input type="email" name="has_target_email" id="has_target_email" />';
		html += '<label for="has_source_name">' + highlight_and_share.email_your_name + '</label>';
		html += '<input type="text" name="has_source_name" id="has_source_name" value="' + highlight_and_share.email_your_name_value + '" />';
		html += '<textarea style="display: none" name="has_selected_text" id="has_selected_text">' + has_get_selection() + '</textarea>';
		html += '<label for="has_email_subject">' + highlight_and_share.email_subject  + '</label>';
		html += '<input type="text" class="has_email_subject" name="has_email_subject" id="has_email_subject" value="' + subject + '" />';
		html += '<label for="has_source_email">' + highlight_and_share.email_from + '</label>';
		html += '<input type="email" name="has_source_email" id="has_source_email" value="' + highlight_and_share.email_from_value + '" />';
		html += '<input type="hidden" name="has_source_title" class="has_source_title" value="' + data_title + '" />';
		html += '<input type="hidden" name="has_source_url" class="has_source_url" value="' + data_href + '" />';
		html += '<input type="hidden" name="has_ajax_action" value="has_form_submission" />';
		html += '<input type="submit" value="' + highlight_and_share.email_send + '" class="has_sharing_send" id="has_sharing_send" />';
		html += '<a rel="nofollow" href="#cancel" class="has_sharing_cancel" id="has_sharing_cancel" style="display: inline;">' + highlight_and_share.email_cancel + '</a>';
		html += '<img style="float:right; display: none;" class="has_sharing_loading" src="' +  highlight_and_share.email_loading + '" />';
		html += '<div class="has_errors" style="display: none"></div>';
		html += '</form>';
		html += '</div><!-- .has_sharing_email_form_wrapper -->';
		html += '<div class="has_success_response" style="display: none;">';
		html += '<div class="has_response_title">';
		html +=	'</div><!-- .has_response_title -->';
		html += '<div class="has_success_response_body">';
		html += '</div><!-- .has_success_response_body -->';
		html += '<div class="has_success_response_close">'
		html += '<a rel="nofollow" href="#cancel" class="has_sharing_cancel" id="has_sharing_cancel" style="display: inline;">' + highlight_and_share.email_close + '</a>';
		html += '</div><!-- .has_success_response_close -->';
		html += '</div><!-- .has_success_response -->'

		html += '</div><!-- #has_sharing_email -->';

		var html_jquery = jQuery(html);
		swal(
			{
				title: highlight_and_share.email_share,
				html: html_jquery.html(),
				customClass: 'has-email-mobie',
				showCloseButton: false,
				showCancelButton: false,
				showConfirmButton: false,
				width: '320px',
			}
		);
		jQuery('#has_target_email').focus();
	} );

	// Email Cancel
	$( 'body' ).on( 'click', 'a.has_sharing_cancel', function( e ) {
		swal.close();
	} );

	// Email Send
	$( 'body' ).on( 'click', 'input.has_sharing_send', function( e ) {

		e.preventDefault();

		var $emails = $('.has_sharing_email_form_wrapper:first');
		var $errors = $emails.find('.has_errors:first');
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

		console.log(form_data);

		// Send Ajax data
		$.post( highlight_and_share.ajax_url, { data: form_data, action: 'has_form_submission' }, function( response ) {
			if( response.errors ) {
				$errors.html( response.message );
				$errors.slideDown();
				$sending_button.val( highlight_and_share.email_send );
				$sending_button.prop( 'disabled', false );
				$emails.find('.has_sharing_loading').css( 'display', 'none' );
			} else {
				$emails.css( 'display', 'none' );
				$emails.find( '#has_target_email' ).val('');
				$emails.find( '#has_source_name' ).val( response.message_source_name );
				$emails.find( '#has_email_subject' ).val( response.message_subject );
				$emails.find( '#has_source_email' ).val( response.message_source_email );
				$emails.parent().find( '.has_response_title' ).html( response.message_title );
				$emails.parent().find( '.has_success_response_body' ).html( response.message_body );
				$emails.parent().find( '.has_success_response' ).css( 'display', 'block' );
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
			return has_selected_text;
		}
		return '';
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
			var title_attr = div.attr('data-title');
			if (typeof title_attr !== typeof undefined && title_attr !== false) {
				title_attr = title_attr.replace( '%title%', encodeURIComponent( title ) );
				div.attr('data-title', title_attr);
			}
			var url_attr = div.attr('data-url');
			if (typeof url_attr !== typeof undefined && url_attr !== false) {
				url_attr = url_attr.replace( '%url%', encodeURIComponent( link ) );
				div.attr('data-url', url_attr);
			}
			div.find( 'a' ).attr( 'href', url );
			var css_class = div.attr( 'class' );
			wrapper_clone.find( '.' + css_class ).attr( 'style', 'display: inline-block' ).html( div.html() );
		} );

		//Add to document
		$( 'body' ).append( wrapper_clone );
	};
	if ( highlight_and_share.show_twitter == true || highlight_and_share.show_facebook == true || highlight_and_share.show_linkedin == true || highlight_and_share.show_pinterest == true || highlight_and_share.show_email == true) {
		has_load_html();
	}
} );
