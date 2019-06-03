<?php

/*
 *
 *Функции страницы категории товаров
 *
*/

//Меню
function category_list_menu() {
	echo catalog_product_menu();
}

//Заголовок страницы
function category_before_list() { ?>
	<div class="category row">
		<div class="title-line col-lg-12">
			<h1 class="title"><?php woocommerce_page_title(); ?></h1>
		</div>
	</div>

<?php }


//Описание категории

function category_after_list() { ?>
	<div class="category-description row">
		<?php if ( is_product_taxonomy() && 0 === absint( get_query_var( 'paged' ) ) ) {
			$term = get_queried_object();

			if ( $term && ! empty( $term->description ) ) {
				echo '<div class="category-desc col-lg-12">' . wc_format_content( $term->description ) . '</div>'; // WPCS: XSS ok.
			}
		} ?>

	</div>

<?php }

//Изображения продукта
function woocommerce_template_loop_product_image( $size = 'woocommerce_thumbnail' ) {
	if (is_product()) { 
		$css = 'equipment-slider__'; 
	}	else { 
		$css = 'category-list__'; 
	}
	remove_action( 'begin_fetch_post_thumbnail_html', '_wp_post_thumbnail_class_filter_add' );
	global $product;
	if (has_post_thumbnail()) {
		$id = $product->ID;
		$size = array(247, 216);
		$attr = array('class' => $css . 'img');
		$img = get_the_post_thumbnail($id, $size, $attr);
		echo $img;
	} else {
		$size = array(220, 220);
		echo woocommerce_get_product_thumbnail($size);
	}
	
}

//Заголовок продукта
function woocommerce_template_loop_product_title_bio() {
	if (is_product()) {
		$css = 'equipment-slider__';
		$css_product_name = 'equipment-slider__type';
		$tag = 'span';
	}	else {
		$css = 'category-list__';
		$css_product_name = 'category-list__cat';
		$tag = 'p';
	}
	global $post;
	$product_custom = get_post_meta( $post->ID, '_product_custom_woo', true );
	$model_custom = get_post_meta( $post->ID, '_model_custom_woo', true );
	if ( $product_custom && $model_custom) {
		$print_text = '<' . $tag . ' class="' . $css_product_name . '">' . $product_custom . '</' . $tag . '>';
		$print_text .= '<' . $tag . ' class="' . $css . 'name">' . $model_custom . '</' . $tag .'>';
		echo $print_text;
	} else if ($product_custom) {
		$print_text = '<' . $tag . ' class="' . $css . 'name">' . $product_custom . '</' . $tag . '>';
		echo $print_text;
		the_title( '<' . $tag . ' class="' . $css . 'name">', '</' . $tag . '>' );
	} else {
		the_title( '<' . $tag . ' class="' . $css . 'name">', '</' . $tag . '>' );
	}
}

//Краткое описание продукта 
function woocommerce_template_loop_excerpt() {
	global $post;
	$short_description = $post->post_excerpt;
	$short_description = mb_substr( $short_description, 0, 150 );
	$content_excerpt = '<p class="category-list__desc">' . $short_description . '<a href="' . get_permalink() . '">[...]</a></p>';
	echo $content_excerpt;
}

//Кнопка описание товара
function woocommerce_description_product() {
	echo '<a href="' . get_permalink() . '" class="btn category-list__btn">Описание товара</a>';
}

//Кнопrа бесплатная консультация
function free_consultation() {
	button_consultation();
}

//Цикл вывода продуктов из archive-product.php
function content_product() {

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
			category_after_list();
		}