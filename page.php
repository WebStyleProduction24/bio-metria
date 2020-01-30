<?php get_header(); ?>


<section class="main main_inner">

	<div class="container">

		<div class="post">
			<?php echo get_the_post_thumbnail( null, 'full', array('class' => 'img_post_thumbnail') ); ?>
			<h1 class="product-desc__title"><?php the_title(); ?></h1>
			<?php the_content(); ?>
		</div>
	</div>

</section>

<?php get_footer(); ?>