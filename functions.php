<?php

wc_get_template( '/functions/menu.php' );
wc_get_template( '/functions/hooks.php' );
wc_get_template( '/functions/woo-functions.php' );


// Регистрируем CSS
function enqueue_styles() {
	wp_enqueue_style( 'whitesquare-style', get_stylesheet_uri());
	wp_enqueue_style('font-style', 'http://fonts.googleapis.com/css?family=Oswald:400,300');
	wp_enqueue_style('fontawesome-style', 'https://use.fontawesome.com/releases/v5.6.3/css/all.css');
	wp_enqueue_style('widgets-style', get_template_directory_uri() . '/css/widgets.css');
	wp_enqueue_style('main-style', get_template_directory_uri() . '/css/main.css');
}

add_action('wp_enqueue_scripts', 'enqueue_styles');

// Интегрируем целостность подгружаемого fontawesome-style
function fontawesome_style_loader_tag( $html, $handle ) {
	$scripts_to_load = array(
		array(
			( 'name' )      => 'fontawesome-style',
			( 'integrity' ) => 'sha384-UHRtZLI+pbxtHCWp1t77Bi1L4ZtiqrqD80Kn4Z8NTSRyMA2Fd33n5dQ8lWUE00s/',
		)
	);
	$key = array_search( $handle, array_column( $scripts_to_load, 'name' ) );
	if ( $key !== false ) {
		$html = str_replace( '/>', ' integrity=\'' . $scripts_to_load[$key]['integrity'] . '\' crossorigin=\'anonymous\' />', $html );
	}
	return $html;
}

add_filter( 'style_loader_tag', 'fontawesome_style_loader_tag', 10, 2 );

// Регистрируем JS
function enqueue_scripts () {
	wp_enqueue_script('widgets-js', get_template_directory_uri() . '/js/widgets.js');
	wp_enqueue_script('functions-js', get_template_directory_uri() . '/js/functions.js');
	// wp_enqueue_script('jquery-1.11.3-min-js', get_template_directory_uri() . '/js/jquery-1.11.3.min.js');
	// wp_enqueue_script('jquery-ui-min-js', get_template_directory_uri() . '/js/jquery-ui.min.js');
	// iScroll
	wp_enqueue_script('iscroll-min-js', 'https://cdnjs.cloudflare.com/ajax/libs/iScroll/5.2.0/iscroll.min.js');
	// drawer.js
	wp_enqueue_script('drawer-min-js', 'https://cdnjs.cloudflare.com/ajax/libs/drawer/3.2.2/js/drawer.min.js');
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');



//Отображение кнопки "Консультация"
function button_consultation (){
	echo "<a class='btn btn_consultation' href='#'>Консультация</a>";

}

function socials_float() {
	wc_get_template('/socials_float.php');
}