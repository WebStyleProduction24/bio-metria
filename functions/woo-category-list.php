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
	remove_action( 'begin_fetch_post_thumbnail_html', '_wp_post_thumbnail_class_filter_add' );
	global $product;
	if (has_post_thumbnail()) {
		$id = $product->ID;
		$size = array(247, 216);
		$attr = array('class' => 'category-list__img');
		$img = get_the_post_thumbnail($id, $size, $attr);
		echo $img;
	} else {
		$size = array(220, 220);
		echo woocommerce_get_product_thumbnail($size);
	}
}

//Заголовок продукта
function woocommerce_template_loop_product_title_bio() {
	global $post;
	$product_custom = get_post_meta( $post->ID, '_product_custom_woo', true );
	$model_custom = get_post_meta( $post->ID, '_model_custom_woo', true );
	if ( $product_custom && $model_custom) {
		$print_text = '<p class="category-list__cat">' . $product_custom . '</p>';
		$print_text .= '<p class="category-list__name">' . $model_custom . '</p>';
		echo $print_text;
	} else if ($product_custom) {
		$print_text = '<p class="category-list__name">' . $product_custom . '</p>';
		echo $print_text;
		the_title( '<p class="category-list__name">', '</p>' );
	} else {
		the_title( '<p class="category-list__name category-list__mt">', '</p>' );
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

//Кнопа бесплатная консультация


function free_consultation() {
	button_consultation();
}