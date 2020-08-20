<?php
/*
Plugin Name: TA Phone Activity
Version: 1.0
Description: Displays STM Phone demonstration in WP post using shortcodes
Author: Jorie Sieck
Author URI: http://joriesieck.com
Plugin URI: https://thinkeracademy.com
License: GPL2
*/

/*
 * functionality for current version of course
*/
add_action('genesis_entry_content','current_setup_ta_phone_activity');
function current_setup_ta_phone_activity() {
	if(is_single('short-term-memory-040')) {
		// hook in html
		ta_phone_activity_html(0,0,0);
	}
}
/* above can be removed after full ld implementation */

add_shortcode('stm-phone-activity','ta_phone_activity');
function ta_phone_activity() {
	// enqueue scripts
	wp_enqueue_script(
      'tapa-main-js',
      plugins_url('/assets/js/main.js', __FILE__),
      ['wp-element', 'wp-components', 'jquery'],
      time(),
      true
  );

	// hook in html
	add_action('learndash-content-tabs-after','ta_phone_activity_html',10,3);

	// send url to main.js
	wp_localize_script('tapa-main-js', 'urlObj', array('url' => plugin_dir_url(__FILE__)));
}

// generate html base
function ta_phone_activity_html($post_id, $course_id, $user_id) {
	echo '<p id="msg">Click "Show Number" and try to remember the phone number that appears.</p>';
	echo '<button id="show-number">Show Number</button>';
	echo '<p id="phone-numpad"></p>';
	echo '<p id="phone-msg"></p>';
}

// enqueue styles
add_action( 'wp_enqueue_scripts', 'ta_phone_activity_enqueue_styles' );
function ta_phone_activity_enqueue_styles() {
  wp_enqueue_style(
    'tapa-numpad-css',
    plugins_url( '/assets/css/numpad.css', __FILE__ ),
    [],
    time(),
    'all'
  );
}
