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
		add_action( 'wp_ajax_has_form_submission', array( $this, 'ajax_send_has_email' ) );
		add_action( 'wp_ajax_nopriv_has_form_submission', array( $this, 'ajax_send_has_email' ) );
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
		parse_str( filter_input( INPUT_POST, 'data' ), $ajax_data );

		// Set up initial return array.
		$return = array(
			'errors' => false,
		);

		// Check the nonce.
		if ( ! wp_verify_nonce( $ajax_data['has_email_nonce'], 'has_email_nonce' ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'Nonce could not be verified.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Set Email Variables.
		$email_to            = trim( sanitize_text_field( $ajax_data['has_target_email'] ) );
		$email_from          = trim( sanitize_text_field( $ajax_data['has_source_email'] ) );
		$email_name          = trim( urldecode( $ajax_data['has_source_name'] ) );
		$email_subject       = trim( urldecode( $ajax_data['has_email_subject'] ) );
		$email_selected_text = trim( urldecode( $ajax_data['has_selected_text'] ) );

		// Set title and url variables.
		$title = trim( urldecode( $ajax_data['has_source_title'] ) );
		$url   = trim( urldecode( $ajax_data['has_source_url'] ) );

		// Check emails to destination.
		if ( ! is_email( $email_to ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'The Send email address is not a valid email address.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check emails from destination.
		if ( ! is_email( $email_from ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'Your email address is not a valid email address.', 'highlight-and-share' );
			wp_send_json( $return );
		}

		// Check emails from destination.
		if ( empty( $email_name ) ) {
			$return['errors']  = true;
			$return['message'] = __( 'Your name cannot be empty.', 'highlight-and-share' );
			wp_send_json( $return );
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
		wp_send_json( $return );
	}
}
