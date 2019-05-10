<!doctype html>
<html>
<head>
	<meta http-equiv="Content-type" content="text/html; charset=<?php bloginfo('charset'); ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=Edge">
	<title><?php wp_title('«', true, 'right'); ?> <?php bloginfo('name'); ?></title>
	<link rel="pingback" href="<?php bloginfo('pingback_url'); ?>" />
	<?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
	<?php
	if ( is_product() ) {

		get_header('shop');
	} else { ?>
		<div class="wrapper">
			<div class="container">
				<h1>Извините! Страница находится в разработке</h1>
				<h3><a href="/catalog">Перейти в каталог продукции</a></h3>
			</div>
		</div>
		<?php } ?>