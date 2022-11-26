<?php
/**
 * Helper functions for the plugin.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Class Emails
 */
class Emails {

	/**
	 * Class runner.
	 */
	public function run() {
		// Ajax for form submissions.
		add_action( 'wp_ajax_has_email_form_submission', array( $this, 'ajax_send_has_email' ) );
		add_action( 'wp_ajax_nopriv_has_email_form_submission', array( $this, 'ajax_send_has_email' ) );

		// Ajax modal endpoint for email submissions.
		add_action( 'wp_ajax_has_email_social_modal', array( $this, 'ajax_display_has_email_social_modal' ) );
		add_action( 'wp_ajax_nopriv_has_email_social_modal', array( $this, 'ajax_display_has_email_social_modal' ) );
	}

	/**
	 * Display the HTML for the email modal.
	 */
	public function ajax_display_has_email_social_modal() {
		$permalink = urldecode( filter_input( INPUT_GET, 'permalink', FILTER_DEFAULT ) );
		if ( ! wp_verify_nonce( filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT ), 'has_share_' . $permalink ) ) {
			wp_die( 'Invalid request.' );
		}

		$options            = Options::get_email_options();
		$recaptcha_site_key = $options['recaptcha_site_key'];
		$recaptcha_enabled  = (bool) $options['recaptcha_enabled'];

		wp_register_script(
			'has_email_view',
			Functions::get_plugin_url( 'dist/has-email-modal.js' ),
			array( 'wp-i18n' ),
			Functions::get_plugin_version(),
			false
		);
		if ( $recaptcha_enabled && ! empty( $recaptcha_site_key ) ) {
			wp_localize_script(
				'has_email_view',
				'hasEmailModal',
				array(
					'recaptcha_enabled'  => true,
					'recaptcha_site_key' => $recaptcha_site_key,
					'nonce'              => sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT ) ),
					'ajaxurl'            => admin_url( 'admin-ajax.php' ),
					'permalink'          => urlencode( $permalink ),
					'share_text'         => urlencode( filter_input( INPUT_GET, 'text', FILTER_DEFAULT ) ),
					'post_id'            => absint( filter_input( INPUT_GET, 'post_id', FILTER_DEFAULT ) ),

				)
			);
			wp_register_script(
				'has-recaptcha',
				esc_url_raw( 'https://www.google.com/recaptcha/api.js?render=' . sanitize_text_field( $recaptcha_site_key ) ),
				array(),
				Functions::get_plugin_version(),
				true
			);
		} else {
			wp_localize_script(
				'has_email_view',
				'hasEmailModal',
				array(
					'recaptcha_enabled'  => false,
					'recaptcha_site_key' => '',
					'nonce'              => sanitize_text_field( filter_input( INPUT_GET, 'nonce', FILTER_DEFAULT ) ),
					'ajaxurl'            => admin_url( 'admin-ajax.php' ),
					'permalink'          => urlencode( $permalink ),
					'share_text'         => urlencode( filter_input( INPUT_GET, 'text', FILTER_DEFAULT ) ),
					'post_id'            => absint( filter_input( INPUT_GET, 'post_id', FILTER_DEFAULT ) ),
				)
			);
		}
		wp_register_style(
			'has_email_view',
			Functions::get_plugin_url( 'dist/has-email-modal.css' ),
			array(),
			Functions::get_plugin_version(),
			false
		);
		?>
		<!DOCTYPE html>
		<html lang="en">
			<head>
				<?php
				wp_print_styles(
					array( 'has_email_view' ),
				);
				?>
			</head>
			<body class="<?php echo ( $recaptcha_enabled && ! empty( $recaptcha_site_key ) ) ? 'showing-recaptcha' : ''; ?>">
				<div id="has-email-interface"></div>
				<?php
				wp_print_scripts(
					array(
						'has_email_view',
						'has-recaptcha',
					),
				);
				?>
			</body>
		</html>
		<?php
		exit;

	}

	/**
	 * Processes an Ajax Request for emails
	 *
	 * Processes an Ajax Request for emails
	 *
	 * @since 2.3.5
	 * @access public
	 */
	public function ajax_send_has_email() {

		// Get Ajax data.
		$ajax_data = filter_input( INPUT_POST, 'formData', FILTER_DEFAULT, FILTER_REQUIRE_ARRAY );

		// Set up initial return array.
		$return = array(
			'errors' => false,
		);

		$permalink = urldecode( $ajax_data['permalink'] );

		// Check the nonce.
		if ( ! wp_verify_nonce( $ajax_data['nonce'], 'has_share_' . $permalink ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'Nonce could not be verified.', 'highlight-and-share' );
			wp_send_json( $return );
		}
		// Get email options.
		$options = Options::get_email_options();

		// Get recaptcha keys.
		$recaptcha_site_key   = $options['recaptcha_site_key'] ?? '';
		$recaptcha_secret_key = $options['recaptcha_secret_key'] ?? '';
		$recaptcha_enabled    = (bool) ( $options['recaptcha_enabled'] ?? false );
		$score_threshold      = (float) ( $options['recaptcha_score_threshold'] ?? 0 );

		if ( $recaptcha_enabled ) {
			if ( empty( $recaptcha_site_key ) || empty( $recaptcha_secret_key ) ) {
				wp_send_json_error(
					array(
						'message' => __( 'The site owner has not set reCAPTCHA 3 site keys.', 'highlight-and-share' ),
					)
				);
			}
			$token = $ajax_data['recaptchaToken'];
			if ( ! $token ) {
				wp_send_json_error(
					array(
						'message' => __( 'Invalid reCAPTCHA 3 token.', 'highlight-and-share' ),
					)
				);
			}

			// Now get token back from reCAPTCHA.
			$url      = 'https://www.google.com/recaptcha/api/siteverify';
			$data     = array(
				'secret'   => $recaptcha_secret_key,
				'response' => $token,
			);
			$args     = array(
				'body'      => $data,
				'method'    => 'POST',
				'sslverify' => true,
			);
			$response = wp_remote_post( esc_url( $url ), $args );
			if ( is_wp_error( $response ) ) {
				wp_send_json_error(
					array(
						'message' => __( 'Error validating reCAPTCHA 3 token.', 'highlight-and-share' ),
					)
				);
			}
			$body = json_decode( wp_remote_retrieve_body( $response ), true );
			if ( ! $body['success'] ) {
				wp_send_json_error(
					array(
						'message' => __( 'reCAPTCHA 3 security challenge has failed.', 'highlight-and-share' ),
					)
				);
			}

			// Now check the score with threshold.
			$recaptcha_score = (float) $body['score'];
			if ( $recaptcha_score < $score_threshold ) {
				wp_send_json_error(
					array(
						'message' => __( 'reCAPTCHA 3 security challenge has failed.', 'highlight-and-share' ),
					)
				);
			}
		}

		// Set Email Variables.
		$email_to            = trim( sanitize_text_field( $ajax_data['toEmail'] ) );
		$email_from          = trim( sanitize_text_field( $ajax_data['fromEmail'] ) );
		$email_name          = trim( urldecode( $ajax_data['fromName'] ) );
		$email_subject       = trim( urldecode( $ajax_data['subject'] ) );
		$email_selected_text = trim( urldecode( $ajax_data['shareText'] ) );

		// Now check Akismet.
		if ( class_exists( 'Akismet' ) && (bool) $options['akismet_enabled'] ) {
			$akismet_fields                         = array();
			$akismet_fields['comment_type']         = 'highlight-and-share';
			$akismet_fields['comment_author']       = $email_name;
			$akismet_fields['comment_author_email'] = $email_from;
			$akismet_fields['comment_author_url']   = '';
			$akismet_fields['comment_content']      = '';
			$akismet_fields['contact_form_subject'] = $email_subject;
			$akismet_fields['comment_author_IP']    = Functions::get_user_ip();
			$akismet_fields['permalink']            = esc_url( urldecode( $permalink ) );
			$akismet_fields['user_ip']              = preg_replace( '/[^0-9., ]/', '', Functions::get_user_ip() );
			$akismet_fields['user_agent']           = '';
			$akismet_fields['referrer']             = sanitize_text_field( $_SERVER['HTTP_REFERER'] );
			$akismet_fields['blog']                 = get_option( 'home' );

			// Get all the fields and consolidate.
			$akismet_fields = http_build_query( $akismet_fields );

			// Submit spam check.
			$response = \Akismet::http_post( $akismet_fields, 'comment-check' );

			// Get spam response.
			$maybe_spam = (bool) filter_var( $response[1] ?? false, FILTER_VALIDATE_BOOLEAN );
			if ( $maybe_spam ) {
				wp_send_json_error(
					array(
						'message' => _x( 'The email coult not be sent.', 'The email was flagged for spam.', 'highlight-and-share' ),
					)
				);
			}
		}

		// Set title and url variables.
		$title = get_the_title( $ajax_data['postId'] );
		$url   = $permalink;

		// Check emails to destination.
		if ( ! is_email( $email_to ) ) {
			wp_send_json_error( array( 'message' => __( 'The Send email address is not a valid email address.', 'highlight-and-share' ) ) );
			wp_send_json( $return );
		}

		// Check emails from destination.
		if ( ! is_email( $email_from ) ) {
			wp_send_json_error( array( 'message' => __( 'Your email address is not a valid email address.', 'highlight-and-share' ) ) );
		}

		// Check emails from destination.
		if ( empty( $email_name ) ) {
			wp_send_json_error( array( 'message' => __( 'Your name cannot be empty.', 'highlight-and-share' ) ) );
		}

		// Check Subject.
		if ( empty( $email_subject ) ) {
			$email_subject = __( '[Shared Post]', 'highlight-and-share' ) . ' ' . $title;
		}

		// Translators %s is the name, and %s is the email address.
		$message  = sprintf( __( '%s (%s) wants to share a link with you.', 'highlight-and-share' ), esc_html( $email_name ), esc_html( $email_from ) ) . "\r\n\n"; // phpcs:ignore
		$message .= sprintf( '"%s"', esc_html( $email_selected_text ) ) . "\r\n\r\n";
		$message .= sprintf( '%s', esc_html( $title ) ) . "\r\n";
		$message .= sprintf( '%s', esc_url( $url ) ) . "\r\n\r\n";

		$headers   = array();
		$headers[] = sprintf( 'From: %s <%s>', $email_name, $email_from );

		wp_mail( $email_to, $email_subject, $message, $headers );

		$return['message_title']        = __( 'This post has been shared!', 'highlight-and-share' );
		$return['message_body']         = sprintf( __( 'You have shared this post with %s', 'highlight-and-share' ), $email_to ); // phpcs:ignore
		$return['message_subject']      = __( '[Shared Post]', 'highlight-and-share' ) . ' ' . $title;
		$return['message_source_name']  = $email_name;
		$return['message_source_email'] = $email_from;

		wp_send_json_success( $return );
	}
}
