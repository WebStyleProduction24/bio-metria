<!doctype html>
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<meta name ="viewport" content="width=device-width, initial-scale=1">
	<meta name="format-detection" content="telephone=no">
	<meta name="MobileOptimized" content="320">
	<title><?php echo wp_get_document_title(); ?></title>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<?php wp_head(); ?>
</head>
<body class="drawer drawer--right" <?php body_class(); ?>>
	<?php
	if ( is_product() ) {

		get_header('shop');
	} else if ( is_front_page() ) {} else { ?>
		<div class="wrapper">
			<div class="container">
				<h1>Извините! Страница находится в разработке</h1>
				<h3><a href="/catalog">Перейти в каталог продукции</a></h3>
			</div>
		</div>
		<?php } ?>