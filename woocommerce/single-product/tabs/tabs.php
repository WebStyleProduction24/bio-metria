<?php
/**
 * Single Product tabs
 *
 * This template can be overridden by copying it to yourtheme/woocommerce/single-product/tabs/tabs.php.
 *
 * HOWEVER, on occasion WooCommerce will need to update template files and you
 * (the theme developer) will need to copy the new files to your theme to
 * maintain compatibility. We try to do this as little as possible, but it does
 * happen. When this occurs the version of the template file will be bumped and
 * the readme will list any important changes.
 *
 * @see     https://docs.woocommerce.com/document/template-structure/
 * @package WooCommerce/Templates
 * @version 3.8.0
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Filter tabs and allow third parties to add their own.
 *
 * Each tab is an array containing title, callback and priority.
 * @see woocommerce_default_product_tabs()
 */

$product_tabs = apply_filters( 'woocommerce_product_tabs', array() );

if ( ! empty( $product_tabs ) ) : ?>

	<div class="product-info col-lg-12">
		<ul class="product-tab">
			<?php foreach ( $product_tabs as $key => $product_tab ) : ?>
				<?php 
				if (esc_attr( $key ) == 'description') {$data_id = '1'; $active = ' product-tab__item-active';}
				else if (esc_attr( $key ) == 'video') {$data_id = '2'; $active = '';}
				else if (esc_attr( $key ) == 'programm') {$data_id = '3'; $active = '';}
				?>
				<li data-id="<?php echo $data_id; ?>" class="product-tab__item<?php echo $active; ?>">
						<?php echo wp_kses_post( apply_filters( 'woocommerce_product_' . $key . '_tab_title', $product_tab['title'], $key ) ); ?>
				</li>
			<?php endforeach; ?>
		</ul>
		<?php foreach ( $product_tabs as $key => $product_tab ) : ?>
			<?php 
			if (esc_attr( $key ) == 'description') {$data_id = '1'; $style = 'style="display:block"';}
			else if (esc_attr( $key ) == 'video') {$data_id = '2'; $style = 'style="display:none"';}
			else if (esc_attr( $key ) == 'programm') {$data_id = '3'; $style = 'style="display:none"';}
			?>
			<div data-id="<?php echo $data_id; ?>" class="product-tab__content" <?php echo $style; ?>>
				<?php
				if ( isset( $product_tab['callback'] ) ) {
					call_user_func( $product_tab['callback'], $key, $product_tab );
				}
				?>
			</div>
		<?php endforeach; ?>
		<?php do_action( 'woocommerce_product_after_tabs' ); ?>

	</div>

<?php endif; ?>
