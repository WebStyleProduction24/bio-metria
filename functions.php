<?php

wc_get_template( '/functions/menu.php' );
wc_get_template( '/functions/hooks.php' );
wc_get_template( '/functions/woo-functions.php' );
wc_get_template( '/functions/woo-category-list.php' );
wc_get_template( '/functions/woo-product.php' );
wc_get_template( '/functions/post-type.php' );


// Регистрируем CSS
function enqueue_styles() {
	wp_enqueue_style( 'whitesquare-style', get_stylesheet_uri());
	wp_enqueue_style('font-google-style', 'http://fonts.googleapis.com/css?family=Oswald:400,300');
	wp_enqueue_style('fontawesome-style', 'https://use.fontawesome.com/releases/v5.6.3/css/all.css');
	wp_enqueue_style('cloudflare-style', 'https://cdnjs.cloudflare.com/ajax/libs/drawer/3.2.2/css/drawer.min.css');
	wp_enqueue_style('font-main-style', get_template_directory_uri() . '/css/fonts.css');
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


function my_scripts_method(){
	wp_enqueue_script( 'jquery' );
}
// Регистрируем JS
function enqueue_scripts () {	

	wp_deregister_script('jquery');
	// wp_enqueue_script('jquery', ("https://ajax.googleapis.com/ajax/libs/jquery/1.12.2/jquery.min.js"), false, '1.12.2');
	// wp_enqueue_script('jquery');
	wp_enqueue_script('jquery-1.11.3-min-js', get_template_directory_uri() . '/js/jquery-1.11.3.min.js');
	wp_enqueue_script('jquery-ui-min-js', get_template_directory_uri() . '/js/jquery-ui.min.js');
	wp_enqueue_script('custom_script',	get_template_directory_uri() . '/js/widgets.js', array(),	null, true);
	// iScroll
	wp_enqueue_script('iscroll-min-js', 'https://cdnjs.cloudflare.com/ajax/libs/iScroll/5.2.0/iscroll.min.js');
	// drawer.js
	wp_enqueue_script('drawer-min-js', 'https://cdnjs.cloudflare.com/ajax/libs/drawer/3.2.2/js/drawer.min.js');
	wp_enqueue_script('functions-js', get_template_directory_uri() . '/js/functions.js');
}
add_action('wp_enqueue_scripts', 'enqueue_scripts');

//Отображение кнопки "Консультация"
function button_consultation(){
	if ( is_archive() ) {
		echo '<a href="#" class="btn category-list__btn">Бесплатная консультация</a>';
	} else {
		echo "<a class='btn btn_consultation' href='#'>Консультация</a>";
	}

}

function socials_float() {
	wc_get_template('/socials_float.php');
}

//Добавляем класс к цитате слайдера предложений
function get_excerpt_slider_of_offers() {
	add_filter( "the_excerpt", "add_class_excerpt" );
	function add_class_excerpt( $excerpt ) {
		return str_replace( '<p>', '<p class="slider__text">', $excerpt );
	}
}

//Добавляем класс к описанию категории в блоке "Программы и оборудование"
add_filter( "term_description", "add_class_term_description" );
function add_class_term_description( $term_description ) {
	return str_replace( '<p>', '<p class="equipment-list__text">', $term_description );
}

//Устраняем конфликт в постоянных ссылках с одинаковыми базами
function devvn_product_category_base_same_shop_base( $flash = false ){
	$terms = get_terms(array(
		'taxonomy' => 'product_cat',
		'post_type' => 'product',
		'hide_empty' => false,
	));
	if ($terms && !is_wp_error($terms)) {
		$siteurl = esc_url(home_url('/'));
		foreach ($terms as $term) {
			$term_slug = $term->slug;
			$baseterm = str_replace($siteurl, '', get_term_link($term->term_id, 'product_cat'));
			add_rewrite_rule($baseterm . '?$','index.php?product_cat=' . $term_slug,'top');
			add_rewrite_rule($baseterm . 'page/([0-9]{1,})/?$', 'index.php?product_cat=' . $term_slug . '&paged=$matches[1]','top');
			add_rewrite_rule($baseterm . '(?:feed/)?(feed|rdf|rss|rss2|atom)/?$', 'index.php?product_cat=' . $term_slug . '&feed=$matches[1]','top');
		}
	}
	if ($flash == true)
		flush_rewrite_rules(false);
}
add_filter( 'init', 'devvn_product_category_base_same_shop_base');

add_action( 'create_term', 'devvn_product_cat_same_shop_edit_success', 10, 2 );
function devvn_product_cat_same_shop_edit_success( $term_id, $taxonomy ) {
	devvn_product_category_base_same_shop_base(true);
}