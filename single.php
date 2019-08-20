<?php get_header(); ?>

<section class="main main_inner mt-5">

	<div class="container">
		
		<?php if( have_posts() ){ while( have_posts() ){ the_post(); ?>

					<img src="<?php echo get_the_post_thumbnail_url(); ?>" alt="" style="float: left;">
					<h1 class="product-desc__title title-our-blog single"><?php the_title(); ?></h1>
					<?php the_content(); ?>



		<?php } /* конец while */ 

	}?>
</div>
</section>



<?php get_footer(); ?>