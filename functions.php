<?php

wc_get_template( '/templates/hooks.php' );
wc_get_template( '/templates/woo-functions.php' );


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




