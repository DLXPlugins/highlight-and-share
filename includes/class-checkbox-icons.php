<?php
class HAS_Template_Checkbox extends WP_Customize_Control {
	public $type = 'checkbox';
	public function render_content(){

		$options = Highlight_And_Share::get_instance()->get_plugin_options();
		?>
		<div class="customize-control-notifications-container" style="display: none;"><ul></ul></div>
			<span class="customize-inside-control-row">
			<label for="_customize-input-<?php echo esc_attr( $this->id ); ?>">
				<input type="checkbox" id="_customize-input-<?php echo esc_attr($this->id); ?>" name="<?php echo esc_attr($this->id); ?>" value="<?php echo esc_attr( $this->value ); ?>" value="off" <?php checked( false, $options['icons'], true); ?> data-customize-setting-link="<?php echo esc_attr( $this->id ); ?>" />
			<?php echo esc_html( $this->label ); ?></label>

			</span>
		<?php
	}
}