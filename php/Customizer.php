<?php
/**
 * Set up the the customizer.
 *
 * @package HAS
 */

namespace DLXPlugins\HAS;

/**
 * Helper class for customizer options.
 */
class Customizer {
	/**
	 * Main class runner.
	 *
	 * @return Customizer.
	 */
	public function run() {
		$self = new self();
		// Customizer.
		add_action( 'customize_register', array( $this, 'customizer' ) );
		$self->instance = $self;
		return $self;
	}

	/**
	 * Adds HAS to the customizer
	 *
	 * Adds HAS to the customizer
	 *
	 * @since 2.4.0
	 * @access public
	 *
	 * @param  WP_Customize_Manager $customizer Customizer object.
	 */
	public function customizer( $customizer ) {
		$options = Options::get_plugin_options();
		$customizer->add_section(
			'highlight-and-share',
			array(
				'title'      => __( 'Highlight and Share', 'highlight-and-share' ),
				'priority'   => 120,
				'capability' => 'edit_theme_options',
			)
		);
		// Icons.
		$customizer->add_setting(
			'highlight-and-share[icons]',
			array(
				'capability'        => 'edit_theme_options',
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			'highlight-and-share[icons]',
			array(
				'type'        => 'checkbox',
				'label'       => __( 'Icons Only', 'highlight-and-share' ),
				'section'     => 'highlight-and-share',
				'settings'    => 'highlight-and-share[icons]',
				'priority'    => 10,
				'description' => 'Requires <a href="https://wordpress.org/plugins/better-font-awesome/">Better Font Awesome plugin</a> or equivalent',
			)
		);

		// Themes.
		$customizer->add_setting(
			'highlight-and-share[theme]',
			array(
				'default'           => 'default',
				'sanitize_callback' => array( $this, 'customizer_sanitize_theme_select' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			'highlight-and-share[theme]',
			array(
				'label'   => esc_html__( 'Choose a Theme', 'highlight-and-share' ),
				'section' => 'highlight-and-share',
				'type'    => 'select',
				'choices' => Themes::get_main_themes(),
			)
		);

		// Show Twitter.
		$customizer->add_setting(
			'highlight-and-share[show_twitter]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_twitter'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_twitter]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Twitter Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_twitter]',
					'priority' => 10,
				)
			)
		);

		// Show Facebook.
		$customizer->add_setting(
			'highlight-and-share[show_facebook]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_facebook'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_facebook]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Facebook Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_facebook]',
					'priority' => 10,
				)
			)
		);

		// Show LinkedIn.
		$customizer->add_setting(
			'highlight-and-share[show_linkedin]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_linkedin'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_linkedin]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable LinkedIn Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_linkedin]',
					'priority' => 10,
				)
			)
		);

		// Show OK.
		$customizer->add_setting(
			'highlight-and-share[show_ok]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_ok'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_ok]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Odnoklassniki (Однокла́ссники) Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_ok]',
					'priority' => 10,
				)
			)
		);

		// Show VKontakte.
		$customizer->add_setting(
			'highlight-and-share[show_vk]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_vk'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_vk]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable VKontakte Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_vk]',
					'priority' => 10,
				)
			)
		);

		// Show Xing.
		$customizer->add_setting(
			'highlight-and-share[show_xing]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_xing'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_xing]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Xing Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_xing]',
					'priority' => 10,
				)
			)
		);

		// Show Whatsapp.
		$customizer->add_setting(
			'highlight-and-share[show_whatsapp]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_whatsapp'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_whatsapp]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable WhatsApp Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_whatsapp]',
					'priority' => 10,
				)
			)
		);

		// Show Email.
		$customizer->add_setting(
			'highlight-and-share[show_email]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_email'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_email]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Email Sharing', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_email]',
					'priority' => 10,
				)
			)
		);

		// Show Copy.
		$customizer->add_setting(
			'highlight-and-share[show_copy]',
			array(
				'capability'        => 'edit_theme_options',
				'default'           => $options['show_copy'],
				'sanitize_callback' => array( $this, 'customizer_sanitize_checkbox' ),
				'type'              => 'option',
			)
		);
		$customizer->add_control(
			new \WP_Customize_Control(
				$customizer,
				'highlight-and-share[show_copy]',
				array(
					'type'     => 'checkbox',
					'label'    => __( 'Enable Copy', 'highlight-and-share' ),
					'section'  => 'highlight-and-share',
					'settings' => 'highlight-and-share[show_copy]',
					'priority' => 10,
				)
			)
		);
	}

	/**
	 * Sanitizes an input variable
	 *
	 * Sanitizes an input variable
	 *
	 * @since 2.4.0
	 * @access public
	 *
	 * @param bool $input Whether the input is checked or not.
	 *
	 * @return bool Whether the input is checked or not
	 */
	public function customizer_sanitize_checkbox( $input ) {

		// returns true if checkbox is checked.
		return ( $input ) ? true : false;
	}

	/**
	 * Sanitizes a select variable
	 *
	 * Sanitizes a select variable
	 *
	 * @since 2.4.0
	 * @access public
	 *
	 * @param string               $input Value of the settings.
	 * @param WP_Customize_Setting $setting Customizer setting object.
	 *
	 * @return bool Whether the input is checked or not
	 */
	public function customizer_sanitize_theme_select( $input, $setting ) {

		// input must be a slug: lowercase alphanumeric characters, dashes and underscores are allowed only.
		$input = sanitize_key( $input );

		// get the list of possible select options.
		$choices = $setting->manager->get_control( $setting->id )->choices;

		// return input if valid or return default option.
		return ( array_key_exists( $input, $choices ) ? $input : $setting->default );

	}
}
