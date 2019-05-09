<?php

wc_get_template( '/templates/hooks.php' );

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


//Регистрация меню
add_action('after_setup_theme', function(){
	register_nav_menus( array(
		'main' => 'Главное меню',
		'catalog_product' => 'Каталог продуктов'
	) );
});

//Настройки меню
function catalog_product_menu()
{
	wp_nav_menu( [
		'theme_location'  => 'catalog_product',
		'container_class' => 'menu row',
		'menu_class'      => 'menu__list col-lg-12',
		'walker'          => new wp_catalog_product_menu,
	] );
}


class wp_catalog_product_menu extends Walker_Nav_Menu  {

	public function start_el( &$output, $item, $depth = 0, $args = array(), $id = 0 ) {
		
		$indent = ( $depth ) ? str_repeat( $t, $depth ) : '';

		$classes   = empty( $item->classes ) ? array() : (array) $item->classes;
		$classes[] = 'menu-item-' . $item->ID;

		/**
		 * Filters the arguments for a single nav menu item.
		 *
		 * @since 4.4.0
		 *
		 * @param stdClass $args  An object of wp_nav_menu() arguments.
		 * @param WP_Post  $item  Menu item data object.
		 * @param int      $depth Depth of menu item. Used for padding.
		 */
		$args = apply_filters( 'nav_menu_item_args', $args, $item, $depth );

		$class_names = ' class="menu__item"';

		/**
		 * Filters the ID applied to a menu item's list item element.
		 *
		 * @since 3.0.1
		 * @since 4.1.0 The `$depth` parameter was added.
		 *
		 * @param string   $menu_id The ID that is applied to the menu item's `<li>` element.
		 * @param WP_Post  $item    The current menu item.
		 * @param stdClass $args    An object of wp_nav_menu() arguments.
		 * @param int      $depth   Depth of menu item. Used for padding.
		 */
		$id = apply_filters( 'nav_menu_item_id', 'menu-item-' . $item->ID, $item, $args, $depth );
		$id = $id ? ' id="' . esc_attr( $id ) . '"' : '';

		$output .= $indent . '<li' . $id . $class_names . '>';

		$atts           = array();
		$atts['title']  = ! empty( $item->attr_title ) ? $item->attr_title : '';
		$atts['target'] = ! empty( $item->target ) ? $item->target : '';
		if ( '_blank' === $item->target && empty( $item->xfn ) ) {
			$atts['rel'] = 'noopener noreferrer';
		} else {
			$atts['rel'] = $item->xfn;
		}
		$atts['href']         = ! empty( $item->url ) ? $item->url : '';
		$atts['aria-current'] = $item->current ? 'page' : '';

		/**
		 * Filters the HTML attributes applied to a menu item's anchor element.
		 *
		 * @since 3.6.0
		 * @since 4.1.0 The `$depth` parameter was added.
		 *
		 * @param array $atts {
		 *     The HTML attributes applied to the menu item's `<a>` element, empty strings are ignored.
		 *
		 *     @type string $title        Title attribute.
		 *     @type string $target       Target attribute.
		 *     @type string $rel          The rel attribute.
		 *     @type string $href         The href attribute.
		 *     @type string $aria_current The aria-current attribute.
		 * }
		 * @param WP_Post  $item  The current menu item.
		 * @param stdClass $args  An object of wp_nav_menu() arguments.
		 * @param int      $depth Depth of menu item. Used for padding.
		 */
		$atts = apply_filters( 'nav_menu_link_attributes', $atts, $item, $args, $depth );

		$attributes = '';
		foreach ( $atts as $attr => $value ) {
			if ( ! empty( $value ) ) {
				$value       = ( 'href' === $attr ) ? esc_url( $value ) : esc_attr( $value );
				$attributes .= ' ' . $attr . '="' . $value . '"';
			}
		}

		/** This filter is documented in wp-includes/post-template.php */
		$title = apply_filters( 'the_title', $item->title, $item->ID );

		/**
		 * Filters a menu item's title.
		 *
		 * @since 4.4.0
		 *
		 * @param string   $title The menu item's title.
		 * @param WP_Post  $item  The current menu item.
		 * @param stdClass $args  An object of wp_nav_menu() arguments.
		 * @param int      $depth Depth of menu item. Used for padding.
		 */
		$title = apply_filters( 'nav_menu_item_title', $title, $item, $args, $depth );

		$item_output  = $args->before;
		$item_output .= '<a class="menu__link"' . $attributes . '>';
		$item_output .= $args->link_before . $title . $args->link_after;
		$item_output .= '</a>';
		$item_output .= $args->after;

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}

} // Walker_Nav_Menu






/*Декларируем поддержку WooCommerce v.3.6.2*/
add_action( 'after_setup_theme', 'woocommerce_support' );
function woocommerce_support() {
	add_theme_support( 'woocommerce' );
}


// Регистрируем хуки дополнительных вкладок в админке страницы товара
add_action( 'woocommerce_product_options_general_product_data', 'art_woo_add_video_fields' );
add_action( 'woocommerce_product_options_general_product_data', 'art_woo_add_program_fields' );


add_action( 'woocommerce_process_product_meta', 'art_woo_custom_video_save', 10 );
add_action( 'woocommerce_process_product_meta', 'art_woo_custom_program_save', 15 );

add_filter( 'woocommerce_product_tabs', 'woo_custom_product_tabs' );


//Функции вывода функционала в админке для заполнения вкладок страницы товара
function art_woo_add_video_fields() {
	global $product, $post;
	?>
	<div class="options_group">
		<h2><strong>Контент вкладки "Видео"</strong></h2>
		<?php
		wp_editor(get_post_meta( $post->ID, '_video_desc', true ), 'video_desc', array(
			'wpautop'       => 1,
			'media_buttons' => 1,
			'textarea_name' => 'video_desc',
			'textarea_rows' => 5,
			'tabindex'      => null,
			'editor_css'    => '<style>.quicktags-toolbar, .wp-editor-tools, .wp-editor-wrap, .wp-switch-editor {padding: 5px 10px;}</style>',
			'editor_class'  => 'form-field',
			'teeny'         => 0,
			'dfw'           => 0,
			'tinymce'       => 1,
			'quicktags'     => 1,
			'drag_drop_upload' => false
		) );		
		?>
	</div>
	<?php
}

function art_woo_add_program_fields() {
	global $product, $post;
	?>
	<div class="options_group">
		<h2><strong>Контент вкладки "ПО"</strong></h2>
		<?php
		wp_editor(get_post_meta( $post->ID, '_program_desc', true ), 'program_desc', array(
			'wpautop'       => 1,
			'media_buttons' => 1,
			'textarea_name' => 'program_desc',
			'textarea_rows' => 5,
			'tabindex'      => null,
			'editor_css'    => '<style>.quicktags-toolbar, .wp-editor-tools, .wp-editor-wrap, .wp-switch-editor {padding: 5px 10px;}</style>',
			'editor_class'  => 'form-field',
			'teeny'         => 0,
			'dfw'           => 0,
			'tinymce'       => 1,
			'quicktags'     => 1,
			'drag_drop_upload' => false
		) );		
		?>
	</div>
	<?php
}


//Сохранение дополнительных полей вкладок в админке страницы товара
function art_woo_custom_video_save( $post_id ) {
	$woocommerce_textarea = $_POST['video_desc'];
	if ( ! empty( $woocommerce_textarea ) ) {
		update_post_meta( $post_id, '_video_desc', $woocommerce_textarea );
	}
}

function art_woo_custom_program_save( $post_id ) {
	$woocommerce_textarea = $_POST['program_desc'];
	if ( ! empty( $woocommerce_textarea ) ) {
		update_post_meta( $post_id, '_program_desc', $woocommerce_textarea );
	}
}


// Добавляем новые вкладки на странице товара

function woo_custom_product_tabs( $tabs ) {
	$tabs['video'] = array(
		'title'     => 'Видео',
		'priority'  => 10,
		'callback'  => 'woo_video_tab_content'
	);

	$tabs['programm'] = array(
		'title'     => 'ПО',
		'priority'  => 11,
		'callback'  => 'woo_program_tab_content'
	);
	unset($tabs['reviews']);
	unset($tabs['description']['title']);
	$tabs['description']['title'] = 'Полное описание';
	return $tabs;
}

// Контент новых вкладок

function woo_video_tab_content() {
	global $post;
	$video_desc= get_post_meta( $post->ID, '_video_desc', true );
	?>
	<p><?php echo $video_desc; ?></p>
	<?php
}

function woo_program_tab_content() {
	global $post;
	$program_desc= get_post_meta( $post->ID, '_program_desc', true );
	?>
	<p><?php echo $program_desc; ?></p>
	<?php
}

