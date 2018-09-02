(function( $, api ) {
	api.bind( 'ready', function() {
		api( 'highlight-and-share[icons]', function( setting ) {
			setting.bind( function onChange( value ) {
				console.log(api);
			} );
		} );
	});
}( jQuery, wp.customize ));