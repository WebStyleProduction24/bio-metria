<?php
/**
 * The Template for displaying product archives, including the main shop page which is a post type archive
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/archive-product.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.4.0
 */

defined( 'ABSPATH' ) || exit;

get_header( 'shop' );

/**
 * Hook: woocommerce_before_main_content.
 *
 * @hooked woocommerce_output_content_wrapper - 10 (outputs opening divs for the content)
 * @hooked woocommerce_breadcrumb - 20
 * @hooked WC_Structured_Data::generate_website_data() - 30
 */
// do_action( 'woocommerce_before_main_content' );

?>

<section class="main main_inner">
	<div class="container">
		<?php
		if ( woocommerce_product_loop() ) {

		/**
		 * Hook: woocommerce_before_shop_loop.
		 *
		 * @hooked deleted woocommerce_output_all_notices - 10
		 * @hooked deleted woocommerce_result_count - 20
		 * @hooked deleted woocommerce_catalog_ordering - 30
		 * @hooked added category_list_menu - 40
		 * @hooked added category_before_list - 50
		 */
		do_action( 'woocommerce_before_shop_loop' );
		if ( is_shop()){ ?>
			<?php global $post; the_content($post->ID); ?>
			<ul>
				<?php wp_list_categories( $args = array(
					'taxonomy' => 'product_cat',
					'depth' => 1,
					'exclude' => '15',
					'title_li' => 'Категории:'
				) ); ?>
			</ul>
			<?php		

		} else if (is_product_taxonomy()) {

			category_after_list();
			?>

			<ul>

				<?php	
				wp_list_categories( $args = array(
					'taxonomy' => 'product_cat',
					'child_of' => get_queried_object()->term_id,
					'title_li' => 'Подкатегории:'
				) ); ?>
			</ul>
			<?php

		} else {

			woocommerce_product_loop_start();

			if ( wc_get_loop_prop( 'total' ) ) {
				while ( have_posts() ) {
					the_post();

	/**
	* Hook: woocommerce_shop_loop.
	*
	* @hooked WC_Structured_Data::generate_product_data() - 10
	*/
	do_action( 'woocommerce_shop_loop' );

	wc_get_template_part( 'content', 'product' );
}
}

// woocommerce_product_loop_end();

/**
* Hook: woocommerce_after_shop_loop.
*
* @hooked woocommerce_pagination - 10
*/
do_action( 'woocommerce_after_shop_loop' );
}
} else {
/**
* Hook: woocommerce_no_products_found.
*
* @hooked wc_no_products_found - 10
*/
do_action( 'woocommerce_no_products_found' );
}


/**
* Hook: woocommerce_sidebar.
*
* @hooked woocommerce_get_sidebar - 10
*/
// do_action( 'woocommerce_sidebar' );
?>


</div></section>

<?php

get_footer( 'shop' );
