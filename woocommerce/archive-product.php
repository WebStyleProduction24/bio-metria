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

		$category_list_st = '<div class="category-list row">';
		$category_list_en = '</div>';

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

		if ( is_shop()){
			
			echo $category_list_st;

			wp_list_categories( $args = array(
				'taxonomy' => 'product_cat',
				'depth' => 1,
				'exclude' => '15',
				'title_li' => false,
				'walker' => new WC_Product_Cat_List_Walker_Bio(),
			) );

			echo $category_list_en;

			do_action( 'woocommerce_archive_description' );

		} else if (is_product_taxonomy()) {
			$id = get_queried_object()->term_id;

			if (empty(get_term_children($id, 'product_cat'))) {

				content_product();

			} else {

				echo $category_list_st;
				wp_list_categories( $args = array(
					'taxonomy' => 'product_cat',
					'child_of' => $id,
					'title_li' => false,
					'walker'	=> new WC_Product_Cat_List_Walker_Bio(),
				) );

				echo $category_list_en;

				category_after_list();
			}

		} else {

			content_product();
			
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
