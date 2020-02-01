<!doctype html>

<html>

<head>

	<meta http-equiv="Content-type" content="text/html; charset=<?php bloginfo('charset'); ?>">

	<meta http-equiv="X-UA-Compatible" content="IE=Edge">

	<meta name ="viewport" content="width=device-width, initial-scale=1">

	<meta name="format-detection" content="telephone=no">

	<meta name="MobileOptimized" content="320">

	<link rel="shortcut icon" href="<?php echo get_template_directory_uri(); ?>/img/favicon.png" type="image/x-icon">

	<title><?php echo wp_get_document_title(); ?></title>

	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />

	<?php wp_head(); ?>

</head>

<body class="drawer drawer--right" <?php body_class(); ?>>

	<?php

	if ( is_front_page() ) {

		get_header('main');

	} else {

		get_header('shop');

	} 