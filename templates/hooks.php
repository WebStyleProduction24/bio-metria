<?php

remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_title', 5 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_price', 10 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart', 30 );
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_meta', 40 );
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart', 10 );

add_action( 'woocommerce_before_single_product_summary', 'woocommerce_template_single_price', 30 );



// Регистрируем хуки дополнительных вкладок в админке страницы товара
add_action( 'woocommerce_product_options_general_product_data', 'art_woo_add_video_fields' );
add_action( 'woocommerce_product_options_general_product_data', 'art_woo_add_program_fields' );


add_action( 'woocommerce_process_product_meta', 'art_woo_custom_video_save', 10 );
add_action( 'woocommerce_process_product_meta', 'art_woo_custom_program_save', 15 );

add_filter( 'woocommerce_product_tabs', 'woo_custom_product_tabs' );


//Формируем доп поля наименования продукта
add_action( 'woocommerce_product_options_general_product_data', 'product_woo_add_custom_fields' );



add_action( 'woocommerce_process_product_meta', 'product_woo_custom_fields_save', 10 );



add_action('woocommerce_single_product_summary', 'get_product_model', 16);