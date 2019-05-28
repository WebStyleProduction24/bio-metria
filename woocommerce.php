<?php


global $post;


get_header();

if ( is_singular( 'product' ) ) {
	woocommerce_content();
}else{
	wc_get_template( 'archive-product.php' );
}

get_footer();

